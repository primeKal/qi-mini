"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Trash2, Edit } from "lucide-react";
import { Database } from "@/supabase/types/supabase";
import LoadingSpinner from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useIMRChartContext } from "../contex/contex";
import { IMRChartData, IMRChartRow } from "../contex/types";

export default function IMRChartHistory() {
  const supabase = createClient();
  const { dispatch } = useIMRChartContext();
  const [charts, setCharts] = useState<
    Database["public"]["Tables"]["imr_charts"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("imr_charts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching IMR Charts:", error);
      toast.error("Failed to fetch IMR Charts.");
    } else {
      setCharts(data || []);
    }

    setLoading(false);
  };

  const handleEdit = async (chartId: string) => {
    toast.loading("Loading IMR Chart...");
    setLoading(true);

    const { data, error } = await supabase
      .from("imr_charts")
      .select("*")
      .eq("id", chartId)
      .single();

    if (error || !data) {
      console.error("Error fetching chart:", error);
      toast.error("Failed to load IMR Chart.");
      return;
    }

    // Dispatch chart data to context
    dispatch({
      type: "LOAD_IMR_CHART",
      payload: {
        title: data.title,
        description: data.description,
        measurements: [],
      },
    });

    // Fetch chart measurements
    const { data: measurements, error: rowError } = await supabase
      .from("imr_chart_data")
      .select("timestamp, value, moving_range")
      .eq("chart_id", chartId);

    if (rowError) {
      console.error("Error fetching rows:", rowError);
      toast.error("Failed to load measurements.");
      return;
    }

    dispatch({
      type: "LOAD_IMR_CHART_MEASUREMENTS",
      payload: measurements,
    });

    toast.dismiss();
    toast.success("IMR Chart loaded successfully!");
    setLoading(false);
  };

  const handleDelete = async (chartId: string) => {
    if (!confirm("Are you sure you want to delete this IMR Chart?")) return;

    toast.loading("Deleting IMR Chart...");
    setLoading(true);

    try {
      // Delete chart measurements first
      const { error: deleteRowsError } = await supabase
        .from("imr_chart_data")
        .delete()
        .eq("chart_id", chartId);
      if (deleteRowsError) throw deleteRowsError;

      // Delete the chart itself
      const { error: deleteChartError } = await supabase
        .from("imr_charts")
        .delete()
        .eq("id", chartId);
      if (deleteChartError) throw deleteChartError;

      setCharts(charts.filter((chart) => chart.id !== chartId));
      toast.dismiss();
      toast.success("IMR Chart deleted successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to delete IMR Chart.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">IMR Chart History</h2>

      {loading ? (
        <LoadingSpinner />
      ) : charts.length === 0 ? (
        <p className="text-gray-600">No IMR Charts found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {charts.map((chart) => (
            <li key={chart.id} className="p-3 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{chart.title}</h3>
                <p className="text-sm text-gray-600">{chart.description}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleEdit(chart.id)}
                  className="bg-blue-500 text-white px-3 py-1 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(chart.id)}
                  className="bg-red-500 text-white px-3 py-1 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
