"use client";

import { useState } from "react";
import { useFocusingMatrixContext } from "../context/context";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client
import { Tab } from "@headlessui/react";

export default function FocusingMatrixFooter() {
  const { state } = useFocusingMatrixContext();
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const supabase = createClient();

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage(null);

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated.");
      }

      // Save the matrix data
      const { data, error } = await supabase
        .from("focusing_matrix")
        .insert([
          {
            created_by: user.data.user.id,
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

      setSuccessMessage("Focusing Matrix saved successfully!");
      
      // Switch to the "History" tab after saving
      
    } catch (err) {
      console.error("Error saving matrix:", err);
      setSuccessMessage("Failed to save matrix.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
      {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}
      
      <Button onClick={handleSave} disabled={isSaving} className="bg-blue-500 text-white px-6 py-2 rounded">
        {isSaving ? "Saving..." : "Save Focusing Matrix"}
      </Button>
    </div>
  );
}
