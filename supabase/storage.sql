insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view project images"
on storage.objects for select
using (bucket_id = 'project-images');

create policy "Admins can upload project images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'project-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
);

create policy "Admins can update project images"
on storage.objects for update to authenticated
using (
  bucket_id = 'project-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
)
with check (
  bucket_id = 'project-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
);

create policy "Admins can delete project images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'project-images'
  and exists (select 1 from public.admins where user_id = auth.uid())
);
