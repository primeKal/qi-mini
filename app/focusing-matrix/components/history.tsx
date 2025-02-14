"use client";

import { useEffect, useState } from "react";
import { useFocusingMatrixContext } from "../context/context";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Trash2, Edit } from "lucide-react";
import { Database } from "@/supabase/types/supabase";
import LoadingSpinner from "@/components/ui/spinner";

export default function FocusingMatrixHistory({
//   openEditor,
}: {
//   openEditor: () => void;
}) {
  const supabase = createClient();
  const { dispatch } = useFocusingMatrixContext();
  const [matrices, setMatrices] = useState<
    Database["public"]["Tables"]["focusing_matrix"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMatrices();
  }, []);

  const fetchMatrices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("focusing_matrix")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching matrices:", error);
    else setMatrices(data || []);

    setLoading(false);
  };

  const handleEdit = async (matrixId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("focusing_matrix")
      .select("*")
      .eq("id", matrixId)
      .single();

    if (error) {
      console.error("Error fetching matrix:", error);
      return;
    }

    // Dispatch to context (sync with frontend state)
    dispatch({
      type: "LOAD_MATRIX",
      payload: {
        title: data.title,
        description: data.description,
        columns: {
          firstColumn: data.first_column,
          secondColumn: data.second_column,
        },
        quadrantNames: {
          firstQuadrant: data.first_quadrant,
          secondQuadrant: data.second_quadrant,
          thirdQuadrant: data.third_quadrant,
          fourthQuadrant: data.fourth_quadrant,
        },
        rows: [],
      },
    });

    // Fetch & load matrix rows
    const { data: rowData, error: rowError } = await supabase
      .from("focusing_matrix_rows")
      .select("*")
      .eq("matrix_id", matrixId);

    if (rowError) {
      console.error("Error fetching rows:", rowError);
      return;
    }

    dispatch({
      type: "LOAD_MATRIX_ROWS",
      payload: rowData,
    });

    // openEditor(); // Open the matrix editor
    setLoading(false);
  };

  const handleDelete = async (matrixId: string) => {
    if (!confirm("Are you sure you want to delete this matrix?")) return;

    setLoading(true);
    const { error } = await supabase
      .from("focusing_matrix")
      .delete()
      .eq("id", matrixId);

    if (error) {
      console.error("Error deleting matrix:", error);
    } else {
      setMatrices(matrices.filter((m) => m.id !== matrixId)); // Remove from UI
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">Focusing Matrix History</h2>

      {loading ? (
        <LoadingSpinner />
      ) : matrices.length === 0 ? (
        <p className="text-gray-600">No matrices found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {matrices.map((matrix) => (
            <li key={matrix.id} className="p-3 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{matrix.title}</h3>
                <p className="text-sm text-gray-600">{matrix.description}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleEdit(matrix.id)}
                  className="bg-blue-500 text-white px-3 py-1 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(matrix.id)}
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
