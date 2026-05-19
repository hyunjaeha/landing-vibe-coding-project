create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  preferred_schedule text not null,
  participant_count integer,
  message text,
  privacy_consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- This MVP writes and reads inquiries through server-side code using a
-- Supabase service role key. Do not grant anon table access for this table.
