import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParetoChartContext } from "./context/context";
import {
  updateTitle,
  updateDescription,
  updateSampleSize,
  updateFirstColumn,
  editRow,
  addRow,
  removeRow,
  updateRows,
} from "./context/actions";

function ParetoChartConfiguration() {
  const { state, dispatch } = useParetoChartContext();
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [tempRowData, setTempRowData] = useState<{
    name: string;
    firstColumnData: number;
  } | null>(null);

  // Handle input changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handleSampleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSampleSize(Number(e.target.value)));
  };

  const handleColumnChange = (value: string) => {
    dispatch(updateFirstColumn(value));
  };

  const handleRowChange = (key: "name" | "firstColumnData", value: string) => {
    if (!tempRowData) return;
    const updatedValue = key === "name" ? value : Number(value);
    setTempRowData({ ...tempRowData, [key]: updatedValue });
  };

  const handleSaveRow = (index: number) => {
    if (tempRowData) {
      const updatedRows = [...state.rows];
      updatedRows[index] = { ...tempRowData };
      dispatch(updateRows(updatedRows));
    }
    setEditingRow(null);
    setTempRowData(null);
  };

  const handleRemoveClick = (index: number) => {
    const originalIndex = state.rows.findIndex(
      (row) => row === sortedRows[index]
    );
    if (originalIndex !== -1) {
      dispatch(removeRow(originalIndex));
    }
    setEditingRow(null);
    setTempRowData(null);
  };

  const handleAddRow = () => {
    dispatch(addRow());
    setTimeout(() => {
      const updatedRows = [...state.rows, { name: "", firstColumnData: 0 }];
      dispatch(updateRows(updatedRows));
      setEditingRow(updatedRows.length - 1);
      setTempRowData({ name: "", firstColumnData: 0 });
    }, 0);
  };

  const sortedRows = [...state.rows].sort(
    (a, b) => b.firstColumnData - a.firstColumnData
  );

  return (
    <div className="flex-[0.5] flex-col items-start justify-center overflow-auto">
      <div className="p-5">
        <h1 className="text-4xl font-bold">Pareto Chart Configuration</h1>
        <p className="text-gray-600">
          This is the Pareto Chart Configuration page
        </p>
      </div>
      <div className="flex flex-col m-2 p-3 gap-2">
        {/* Title Input */}
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          value={state.sampleTitle}
          onChange={handleTitleChange}
          placeholder="Pareto Chart"
          required
        />
        <br />

        {/* Sample Size Input */}
        <Label htmlFor="sampleSize">Sample Size</Label>
        <Input
          name="sampleSize"
          type="number"
          value={state.sampleSize}
          onChange={handleSampleSizeChange}
          placeholder="Enter sample size"
          required
        />
        <br />

        {/* First Column Label Input */}
        <Label htmlFor="firstColumn">First Column</Label>
        <Input
          value={state.firstColumn}
          onChange={(e) => handleColumnChange(e.target.value)}
          className="w-full p-1"
        />
      </div>

      <p className="text-sm text-gray-600 mt-1 px-4">
        * Pareto charts are always sorted in descending order.
      </p>

      {/* Table for Rows */}
      <div className="flex flex-col flex-1 p-4 w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">{state.firstColumn}</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, index) => (
                <tr key={`row-${index}`} className="border-t">
                  <td className="px-4 py-2">
                    {editingRow === index ? (
                      <Input
                        type="text"
                        value={tempRowData?.name || ""}
                        onChange={(e) =>
                          handleRowChange("name", e.target.value)
                        }
                        className="w-full min-w-[60px] p-1"
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === index ? (
                      <Input
                        type="number"
                        value={tempRowData?.firstColumnData || 0}
                        onChange={(e) =>
                          handleRowChange("firstColumnData", e.target.value)
                        }
                        className="w-full min-w-[60px] p-1"
                      />
                    ) : (
                      row.firstColumnData
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {editingRow === index ? (
                      <button
                        onClick={() => handleSaveRow(index)}
                        className={`px-2 py-1 rounded ${editingRow === index ? "bg-green-500" : "bg-blue-500"} text-white`}
                      >
                        {editingRow === index ? "Save" : "Edit"}
                      </button>
                    ) : null}
                    <button
                      onClick={() => handleRemoveClick(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="border-t">
                <td colSpan={3} className="text-center py-2">
                  <button
                    onClick={handleAddRow}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    + Add New Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ParetoChartConfiguration;
