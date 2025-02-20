"use client";

import { useState } from "react";
import { useParetoChartContext } from "../context/context";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function ParetoChartFooter() {
  const { state } = useParetoChartContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage(null);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!user || userError) {
        throw new Error("User not authenticated.");
      }

      // Save Pareto Chart Metadata
      const { data: paretoData, error: paretoError } = await supabase
        .from("pareto_charts")
        .insert([
          {
            created_by: user.id,
            sample_title: state.sampleTitle,
            sample_description: state.sampleDescription,
            sample_size: state.sampleSize,
            first_column: state.firstColumn,
            // sort_order: state.sortOrder,
          },
        ])
        .select("id")
        .single();

      if (paretoError) throw paretoError;

      // Save Pareto Chart Rows
      const paretoChartId = paretoData.id;
      const { error: rowError } = await supabase
        .from("pareto_chart_rows")
        .insert(
          state.rows.map((row) => ({
            chart_id: paretoChartId,
            name: row.name,
            first_column_data: row.firstColumnData,
          }))
        );

      if (rowError) throw rowError;

      setSuccessMessage("Pareto Chart saved successfully!");
      
    } catch (err) {
      console.error("Error saving Pareto Chart:", err);
      setSuccessMessage("Failed to save Pareto Chart.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full  p-4 flex justify-center items-center gap-3">
      {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}

      <Button onClick={handleSave} disabled={isSaving} className="bg-blue-500 text-white px-6 py-2 rounded">
        {isSaving ? "Saving..." : "Save Pareto Chart"}
      </Button>
      <Button onClick={handleSave} disabled={isDownloading} className="bg-blue-500 text-white px-6 py-2 rounded">
        {isDownloading ? "Downloading..." : "Download Pareto Chart"}
      </Button>
    </div>
  );
}
