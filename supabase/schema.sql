create extension if not exists pgcrypto;

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

revoke all on table public.inquiries from anon, authenticated;

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);
