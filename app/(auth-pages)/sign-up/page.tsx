
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import PasswordInput from "@/components/ui/password-input";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          {/* First Name */}
          <Label htmlFor="first_name">First Name</Label>
          <Input name="first_name" placeholder="John" required />

          {/* Last Name */}
          <Label htmlFor="last_name">Last Name</Label>
          <Input name="last_name" placeholder="Doe" required />

          {/* Email */}
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />

          {/* Password Fields */}
          <PasswordInput name="password" label="Password" placeholder="Your password" />
          <PasswordInput name="confirm_password" label="Confirm Password" placeholder="Re-enter your password" />

          {/* Submit Button */}
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>
      </form>

      <SmtpMessage />
    </>
  );
}
