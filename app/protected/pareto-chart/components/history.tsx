"use client";

import { useEffect, useState } from "react";
import { useParetoChartContext } from "../context/context";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Trash2, Edit } from "lucide-react";
import { Database } from "@/supabase/types/supabase";
import LoadingSpinner from "@/components/ui/spinner";
import { ParetoChartData } from "../context/types";
import toast from "react-hot-toast";
import { getParetoChartDataFromDB } from "../utility/mapping-functions";
import ParetoChartViewModal from "./view-modal";


export default function ParetoChartHistory({
//   openEditor,
}: {
//   openEditor: () => void;
}) {
  const supabase = createClient();
  const { dispatch } = useParetoChartContext();
  const [charts, setCharts] = useState<
  any
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    setLoading(true);
  
    const { data, error } = await supabase
      .from("pareto_charts")
      .select(
        `
        id, sample_title, sample_description, sample_size, first_column, created_at,
        pareto_chart_rows (
          id, chart_id, name, first_column_data
        )
      `
      )
      .order("created_at", { ascending: false });
  
    if (error) {
      console.error("Error fetching Pareto charts:", error);
      toast.error("Failed to fetch Pareto charts.");
    } else {
      setCharts(data || []);
    }
  
    setLoading(false);
  };
  

  const handleEdit = async (chartId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pareto_charts")
      .select("*")
      .eq("id", chartId)
      .single();

    if (error) {
      console.error("Error fetching chart:", error);
      return;
    }

    // Dispatch chart data to the context
    dispatch({
      type: "LOAD_PARETO_CHART",
      payload: {
        sampleTitle: data.sample_title,
        sampleDescription: data.sample_description,
        sampleSize: data.sample_size,
        firstColumn: data.first_column,
        sortOrder: data.sort_order,
        rows: [],
      },
    });

    // Fetch & load chart rows
    const { data: rowData, error: rowError } = await supabase
      .from("pareto_chart_rows")
      .select("*")
      .eq("chart_id", chartId);

    if (rowError) {
      console.error("Error fetching rows:", rowError);
      return;
    }

    dispatch({
      type: "LOAD_PARETO_CHART_ROWS",
      payload: rowData,
    });

    // openEditor(); // Open the Pareto chart editor
    setLoading(false);
  };

  const handleDelete = async (chartId: string) => {
    if (!confirm("Are you sure you want to delete this Pareto chart?")) return;

    setLoading(true);
    const { error } = await supabase
      .from("pareto_charts")
      .delete()
      .eq("id", chartId);

    if (error) {
      console.error("Error deleting chart:", error);
    } else {
      setCharts(charts.filter((chart: any) => chart.id !== chartId)); // Remove from UI
    }

    setLoading(false);
  };

  const getParetoChartData = (data: any): ParetoChartData => {
   const mappedData = getParetoChartDataFromDB(data); 
   return mappedData;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">Pareto Chart History</h2>

      {loading ? (
        <LoadingSpinner />
      ) : charts.length === 0 ? (
        <p className="text-gray-600">No Pareto charts found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {charts.map((chart: any) => (
            <li key={chart.id} className="p-3 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{chart.sample_title}</h3>
                <p className="text-sm text-gray-600">
                  {chart.sample_description}
                </p>
              </div>
              <div className="flex gap-3">
                <ParetoChartViewModal data={getParetoChartData(chart)} />
                {/* <Button
                  onClick={() => handleEdit(chart.id)}
                  className="bg-blue-500 text-white px-3 py-1 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button> */}
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
