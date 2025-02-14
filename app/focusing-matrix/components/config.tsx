import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFocusingMatrixContext } from "../context/context";
import { updateTitle, updateDescription, updateColumns, editRow, addRow, removeRow } from "../context/actions";

function MatrixConfiguration() {
  const { state, dispatch } = useFocusingMatrixContext();
  const [editingRow, setEditingRow] = useState<number | null>(null);

  // Handle input changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDescription(e.target.value));
  };

  const handleColumnChange = (columnKey: "firstColumn" | "secondColumn", value: string) => {
    dispatch(updateColumns({ [columnKey]: value }));
  };

  const handleRowChange = (index: number, key: "name" | "firstValue" | "secondValue" | "color", value: string) => {
    const updatedValue = key === "color" || key === "name" ? value : Number(value);
    if (key !== "color" && key !== "name" && isNaN(Number(value))) return;

    dispatch(editRow(index, { [key]: updatedValue }));
  };

  const handleEditClick = (index: number) => {
    if (editingRow === index) {
      setEditingRow(null); // Save changes and exit edit mode
    } else {
      setEditingRow(index); // Enter edit mode
    }
  };

  const handleRemoveClick = (index: number) => {
    dispatch(removeRow(index));
    setEditingRow(null);
  };

  const handleAddRow = () => {
    dispatch(addRow());
    setEditingRow(state.rows.length); // Set the new row to be in edit mode
  };

  return (
    <div className="flex-[0.5] flex-col items-start justify-center h-fit">
      <div className="p-5">
        <h1 className="text-4xl font-bold">Matrix Configuration</h1>
        <p className="text-gray-600">This is the Matrix Configuration page</p>
      </div>
      <div className="flex flex-col m-2 p-3 gap-2">
        {/* Title Input */}
        <Label htmlFor="title">Title</Label>
        <Input name="title" value={state.title} onChange={handleTitleChange} placeholder="Focusing Matrix" required />
        <br />

        {/* Description Input */}
        <Label htmlFor="description">Description</Label>
        <Input name="description" value={state.description} onChange={handleDescriptionChange} placeholder="Enter description" required />

        <Label htmlFor="firstColumn">First Column</Label>
        <Input value={state.columns.firstColumn} onChange={(e) => handleColumnChange("firstColumn", e.target.value)} className="w-full p-1" />
        <Label htmlFor="secondColumn">Second Column</Label>
        <Input value={state.columns.secondColumn} onChange={(e) => handleColumnChange("secondColumn", e.target.value)} className="w-full p-1" />
      </div>

      {/* Table for Matrix */}
      <div className="flex flex-col flex-1 p-4 w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full w-14 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">{state.columns.firstColumn}</th>
                <th className="px-4 py-2 text-left">{state.columns.secondColumn}</th>
                <th className="px-4 py-2 text-left">Color</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.rows.map((row, index) => (
                <tr key={`row-${index}`} className="border-t">
                  <td className="px-4 py-2">
                    {editingRow === index ? (
                      <Input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleRowChange(index, "name", e.target.value)}
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
                        value={row.firstValue}
                        onChange={(e) => handleRowChange(index, "firstValue", e.target.value)}
                        className="w-full min-w-[60px] p-1"
                      />
                    ) : (
                      row.firstValue
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === index ? (
                      <Input
                        type="number"
                        value={row.secondValue}
                        onChange={(e) => handleRowChange(index, "secondValue", e.target.value)}
                        className="w-full min-w-[60px] p-1"
                      />
                    ) : (
                      row.secondValue
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === index ? (
                      <Input
                        type="color"
                        value={row.color}
                        onChange={(e) => handleRowChange(index, "color", e.target.value)}
                        className="w-full min-w-[60px] p-1"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-gray-400" style={{ backgroundColor: row.color }}></div>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(index)}
                      className={`px-2 py-1 rounded ${editingRow === index ? "bg-green-500" : "bg-blue-500"} text-white`}
                    >
                      {editingRow === index ? "Save" : "Edit"}
                    </button>
                    <button onClick={() => handleRemoveClick(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {/* Last Row to Add New Rows */}
              <tr className="border-t">
                <td colSpan={5} className="text-center py-2">
                  <button onClick={handleAddRow} className="bg-green-500 text-white px-4 py-2 rounded">
                    + Add New Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 mt-4">* Importance and Urgency are on a scale from -10 to 10</p>
      </div>
    </div>
  );
}

export default MatrixConfiguration;
