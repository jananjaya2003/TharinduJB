create extension if not exists "pgcrypto";

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  description text not null default '',
  challenge text not null default '',
  outcome text not null default '',
  tags text[] not null default '{}',
  image text not null default '/phishguard.svg',
  metric text not null default '',
  period text not null default '',
  case_study_url text,
  linkedin_post_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.projects enable row level security;

create policy "Projects are publicly readable" on public.projects for select using (true);
create policy "Admins can add projects" on public.projects for insert to authenticated
with check (exists (select 1 from public.admins where user_id = auth.uid()));
create policy "Admins can update projects" on public.projects for update to authenticated
using (exists (select 1 from public.admins where user_id = auth.uid()))
with check (exists (select 1 from public.admins where user_id = auth.uid()));
create policy "Admins can delete projects" on public.projects for delete to authenticated
using (exists (select 1 from public.admins where user_id = auth.uid()));
create policy "Admins can read their membership" on public.admins for select to authenticated
using (user_id = auth.uid());

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant select on public.admins to authenticated;

-- After creating your Auth user, run this with its UUID:
-- insert into public.admins (user_id) values ('YOUR_AUTH_USER_UUID');
