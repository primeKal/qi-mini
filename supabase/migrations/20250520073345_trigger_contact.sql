drop trigger if exists notify_contact_message on contact_messages;

create trigger notify_contact_message
after insert on contact_messages
for each row
execute function send_email_on_new_message();