-- Nexivra Voice tenant and identity foundation. Apply through the Supabase CLI.
create extension if not exists pgcrypto;

create type public.business_role as enum ('owner', 'admin', 'editor', 'viewer');

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  website_url text,
  email text,
  phone text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.business_memberships (
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.business_role not null default 'viewer',
  created_at timestamptz not null default now(),
  primary key (business_id, user_id)
);

create table public.business_settings (
  business_id uuid primary key references public.businesses(id) on delete cascade,
  timezone text not null default 'UTC',
  locale text not null default 'en-US',
  booking_url text,
  working_hours jsonb not null default '{}'::jsonb,
  social_links jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null check (char_length(action) between 3 and 120),
  entity_type text not null check (char_length(entity_type) between 3 and 120),
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index business_memberships_user_id_idx on public.business_memberships(user_id);
create index audit_logs_business_created_idx on public.audit_logs(business_id, created_at desc);

create or replace function public.is_business_member(target_business_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.business_memberships
    where business_id = target_business_id and user_id = auth.uid()
  );
$$;

create or replace function public.has_business_role(target_business_id uuid, allowed_roles public.business_role[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.business_memberships
    where business_id = target_business_id and user_id = auth.uid() and role = any(allowed_roles)
  );
$$;

alter table public.businesses enable row level security;
alter table public.business_memberships enable row level security;
alter table public.business_settings enable row level security;
alter table public.audit_logs enable row level security;

create policy "Members can read their businesses" on public.businesses for select using (public.is_business_member(id));
create policy "Owners can update businesses" on public.businesses for update using (public.has_business_role(id, array['owner', 'admin']::public.business_role[]));
create policy "Members can read memberships" on public.business_memberships for select using (public.is_business_member(business_id));
create policy "Members can read settings" on public.business_settings for select using (public.is_business_member(business_id));
create policy "Owners and admins can update settings" on public.business_settings for update using (public.has_business_role(business_id, array['owner', 'admin']::public.business_role[]));
create policy "Members can read audit logs" on public.audit_logs for select using (public.has_business_role(business_id, array['owner', 'admin']::public.business_role[]));

-- Creating tenants is intentionally service-controlled; do not expose a client insert policy.
-- Application services use the service role only in trusted server environments.
