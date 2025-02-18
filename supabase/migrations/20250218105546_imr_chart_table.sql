-- Main table for storing I-MR Charts
create table public.imr_charts (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references auth.users on delete cascade,
  title text not null,
  description text,
  mean float8,
  ucl_i float8,
  lcl_i float8,
  ucl_mr float8,
  lcl_mr float8,
  created_at timestamp default now()
);

-- Table for storing individual measurements
create table public.imr_chart_rows (
  id uuid primary key default gen_random_uuid(),
  chart_id uuid references public.imr_charts on delete cascade,
  timestamp timestamp not null,
  value float8 not null,
  moving_range float8,
  created_at timestamp default now()
);