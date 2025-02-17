"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import LoadingSpinner from "./spinner";

export default function UserInfoCard() {
  const [userData, setUserData] = useState<{ name: string; tier: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const supabase = createClient();
      const { data: userData, error } = await supabase.auth.getUser();

      if (error || !userData?.user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const userId = userData.user.id;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, subscription_tier")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        setUserData(null);
      } else {
        setUserData({
          name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
          tier: profile.subscription_tier || "free",
        });
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!userData) return null; // Do not show if not authenticated

  return (
    <div className="border border-gray-300 bg-white rounded-lg shadow-md p-4 text-center mt-10 max-w-md">
      <h3 className="text-lg font-semibold text-gray-900">Your Account</h3>
      <p className="text-gray-700">{userData.name}</p>
      <p className="text-sm text-gray-600 mt-1">
        Subscription:{" "}
        <span className={`font-medium ${userData.tier === "paid" ? "text-green-600" : "text-blue-600"}`}>
          {userData.tier.charAt(0).toUpperCase() + userData.tier.slice(1)}
        </span>
      </p>
    </div>
  );
}
