"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"; 
import { toast } from "react-hot-toast";
import { useIMRChartContext } from "../contex/contex";

export default function IMRChartFooter() {
  const { state } = useIMRChartContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const supabase = createClient();

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated.");
      }

      // Save the IMR chart data
      const { data, error } = await supabase
        .from("imr_charts")
        .insert([
          {
            created_by: user.data.user.id,
            title: state.title,
            description: state.description,
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      // Save IMR chart rows
      const chartId = data.id;
      const { error: rowError } = await supabase.from("imr_chart_rows").insert(
        state.measurements.map((measurement) => ({
          chart_id: chartId,
          timestamp: measurement.timestamp,
          value: measurement.value,
          moving_range: measurement.movingRange,
        }))
      );

      if (rowError) throw rowError;

      toast.success("IMR Chart saved successfully!");

    } catch (err) {
      console.error("Error saving IMR Chart:", err);
      toast.error("Failed to save IMR Chart.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const chartData = JSON.stringify(state.measurements, null, 2);
      const blob = new Blob([chartData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${state.title.replace(/\s+/g, "_")}_IMR_Chart.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success("IMR Chart downloaded successfully!");
    } catch (err) {
      console.error("Error downloading IMR Chart:", err);
      toast.error("Failed to download IMR Chart.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-t gap-3">
      <Button onClick={handleSave} disabled={isSaving} className="bg-blue-500 text-white px-6 py-2 rounded">
        {isSaving ? "Saving..." : "Save IMR Chart"}
      </Button>
      <Button onClick={handleDownload} disabled={isDownloading} className="bg-green-500 text-white px-6 py-2 rounded">
        {isDownloading ? "Downloading..." : "Download IMR Chart"}
      </Button>
    </div>
  );
}
