import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  subscription_tier: "free" | "paid";
}

// Fetch Authenticated User
export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}

// Fetch User Profile
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("Error fetching profile:", error.message);
    return null;
  }

  return data;
}
