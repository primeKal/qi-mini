create extension if not exists pg_net;

create or replace function send_email_on_new_message()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer RESEND_API',
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'onboarding@resend.dev',  -- Resend verified sender
      'to', 'kalebteshale72@gmail.com',
      'subject', '📩 New Contact Message Received',
      'html', format(
        '<p><strong>Name:</strong> %s</p>
         <p><strong>Email:</strong> %s</p>
         <p><strong>Message:</strong></p>
         <blockquote>%s</blockquote>',
        NEW.name, NEW.email, NEW.message
      )
    )
  );

  return NEW;
end;
$$ language plpgsql;
