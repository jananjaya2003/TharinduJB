-- Keeps the oldest row for each duplicated project title and removes later copies.
-- Review your project list, then run this once in the Supabase SQL editor.
delete from public.projects as duplicate
using public.projects as original
where duplicate.title = original.title
  and duplicate.created_at > original.created_at;
