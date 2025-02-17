create type subscription_tier as enum ('free', 'paid');


create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  subscription_tier subscription_tier not null default 'free',
  primary key (id)
);

alter table public.profiles enable row level security;
