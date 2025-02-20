"use client";

import { useState } from "react";
import { useFocusingMatrixContext } from "../context/context";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client
import UpgradeAccountModal from "@/components/modals/upgrade-account-modal";
import toast from "react-hot-toast";

export default function FocusingMatrixFooter() {
  const { state } = useFocusingMatrixContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const supabase = createClient();

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Get authenticated user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        throw new Error("User not authenticated.");
      }

      const userId = userData.user.id;

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        throw new Error("Could not fetch user profile.");
      }

      // Check subscription tier
      if (profile.subscription_tier !== "paid") {
        setIsUpgradeModalOpen(true);
        return;
      }

      // Save the matrix data
      const { data, error } = await supabase
        .from("focusing_matrix")
        .insert([
          {
            created_by: userId,
            title: state.title,
            description: state.description,
            first_column: state.columns.firstColumn,
            second_column: state.columns.secondColumn,
            first_quadrant: state.quadrantNames.firstQuadrant,
            second_quadrant: state.quadrantNames.secondQuadrant,
            third_quadrant: state.quadrantNames.thirdQuadrant,
            fourth_quadrant: state.quadrantNames.fourthQuadrant,
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      // Save matrix rows
      const matrixId = data.id;
      const { error: rowError } = await supabase.from("focusing_matrix_rows").insert(
        state.rows.map((row) => ({
          matrix_id: matrixId,
          name: row.name,
          first_value: row.firstValue,
          second_value: row.secondValue,
          color: row.color,
        }))
      );

      if (rowError) throw rowError;

      toast.success("Focusing Matrix saved successfully!");
      
    } catch (err) {

      toast.error("Failed to save Focusing Matrix.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-4  gap-3">

      {/* Save Button */}
      <Button onClick={handleSave} disabled={isSaving} className="bg-blue-500 text-white px-6 py-2 rounded">
        {isSaving ? "Saving..." : "Save Focusing Matrix"}
      </Button>


      {/* Upgrade Account Modal */}
      <UpgradeAccountModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}
