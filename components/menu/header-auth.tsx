import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <Badge
          variant="default"
          className="font-normal pointer-events-none bg-red-500 text-white"
        >
          Please update .env.local with anon key and URL
        </Badge>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled className="opacity-75">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button size="sm" variant="default" disabled className="opacity-75">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4 text-gray-700">
      <span className="font-medium">Hey, {user.email}!</span>
      <form action={signOutAction}>
        <Button type="submit" variant="outline" className="hover:bg-gray-100">
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline" className="hover:bg-gray-100">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button
        asChild
        size="sm"
        variant="default"
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
