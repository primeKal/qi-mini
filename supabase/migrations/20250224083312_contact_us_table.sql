-- Create the contact_messages table
create table public.contact_messages (
    id uuid default gen_random_uuid() primary key,
    email text not null,
    name text not null,
    message text not null,
    is_addressed boolean default false,
    created_at timestamp with time zone default now()
);





