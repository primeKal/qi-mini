"use client";

import { useState } from "react";
import { Loader, RefreshCw, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { getProfile, getUser } from "@/app/protected/service";
import { createClient } from "@/utils/supabase/client";
import { get } from "http";
import { getSummary } from "./ask";

export default function AnalyzeWithAI({ data }: { data: any }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const supabase = createClient();

  const checkSubscriptionAndAnalyze = async () => {
    setLoading(true);
    const { data } = await supabase.auth.getUser();
    if ( data.user === null) {
      toast.error("User not found.");
      return;
    }
    
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("subscription_tier")
      .eq("id", data.user.id)
      .single();

    if (error || !profile) {
      toast.error("Failed to check subscription.");
      setLoading(false);
      return;
    }

    if (profile.subscription_tier !== "paid") {
      setShowUpgrade(true);
      setLoading(false);
      return;
    }

    fetchSummary();
  };

  const fetchSummary = async () => {
    setLoading(true);

    try {
      const response = await getSummary(data);
        setSummary(response);
    } catch (error) {
      toast.error("Error analyzing data.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4  rounded-xl">
      <div>
        {summary ? (
          <div className="space-y-4">
            <p className="text-lg font-semibold">AI Summary:</p>
            <p className="text-gray-700">{summary}</p>
            <Button onClick={fetchSummary} variant="outline" disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : <RefreshCw size={16} />}
              Refresh
            </Button>
          </div>
        ) : (
          <Button onClick={checkSubscriptionAndAnalyze} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : <Zap size={16} />}
            {" "}Ask Chat GPT
          </Button>
        )}
      </div>

      {showUpgrade && (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg mt-4">
          <p className="text-sm font-semibold">Upgrade Required</p>
          <p className="text-sm">Subscribe to unlock AI analysis. Or fill in the contact us form.</p>
        </div>
      )}
    </div>
  );
}
