"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useIMRChartContext } from "../contex/contex";
import { updateTitle, updateDescription, addMeasurement, removeMeasurement } from "../contex/actions";

export default function IMRChartConfiguration() {
  const { state, dispatch } = useIMRChartContext();
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [newMeasurement, setNewMeasurement] = useState({
    timestamp: "",
    value: "",
  });

  // Update input values
  const handleInputChange = (key: "timestamp" | "value", value: string) => {
    setNewMeasurement((prev) => ({ ...prev, [key]: value }));
  };

  // Add new measurement
  const handleAddRow = () => {
    if (!newMeasurement.timestamp.trim() || newMeasurement.value.trim() === "") return;

    const newValue = Number(newMeasurement.value);
    if (isNaN(newValue)) return;

    // Calculate moving range
    const lastValue =
      state.measurements.length > 0
        ? state.measurements[state.measurements.length - 1].value
        : newValue;
    const movingRange = Math.abs(newValue - lastValue);

    dispatch(
      addMeasurement({
        timestamp: newMeasurement.timestamp,
        value: newValue,
        movingRange,
      })
    );

    // Reset input fields
    setNewMeasurement({ timestamp: "", value: "" });
    setEditingRow(null);
  };

  // Remove measurement
  const handleRemoveClick = (index: number) => {
    dispatch(removeMeasurement(index));
    setEditingRow(null);
  };

  // Handle row edit
  const handleEditClick = (index: number) => {
    if (editingRow === index) {
      setEditingRow(null);
    } else {
      setEditingRow(index);
    }
  };

  return (
    <div className="flex-[0.5] flex-col items-start justify-center h-fit">
      <div className="p-5">
        <h1 className="text-4xl font-bold">I-MR Chart Configuration</h1>
        <p className="text-gray-600">This is the I-MR Chart Configuration page</p>
      </div>
      <div className="flex flex-col m-2 p-3 gap-2">
        {/* Title Input */}
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          value={state.title}
          onChange={(e) => dispatch(updateTitle(e.target.value))}
          placeholder="Enter chart title"
          required
        />

        {/* Description Input */}
        <Label htmlFor="description">Description</Label>
        <Input
          name="description"
          value={state.description}
          onChange={(e) => dispatch(updateDescription(e.target.value))}
          placeholder="Describe the chart"
          required
        />
      </div>

      {/* Table for Measurements */}
      <div className="flex flex-col flex-1 p-4 w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full w-14 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Timestamp</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Moving Range</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.measurements.map((row, index) => (
                <tr key={`row-${index}`} className="border-t">
                  <td className="px-4 py-2">
                    {editingRow === index ? (
                      <></>
                    ) : (
                      new Date(row.timestamp).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === index ? (
                      <></>
                    ) : (
                      row.value
                    )}
                  </td>
                  <td className="px-4 py-2">{row.movingRange}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(index)}
                      className={`px-2 py-1 rounded ${editingRow === index ? "bg-green-500" : "bg-blue-500"} text-white`}
                    >
                      {editingRow === index ? "Save" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleRemoveClick(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {/* Last Row to Add New Rows */}
              {editingRow === null && (
                <tr className="border-t">
                  <td className="px-4 py-2">
                    <Input
                      type="date"
                      value={newMeasurement.timestamp}
                      onChange={(e) => handleInputChange("timestamp", e.target.value)}
                      placeholder="Select date"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="number"
                      value={newMeasurement.value}
                      onChange={(e) => handleInputChange("value", e.target.value)}
                      placeholder="Enter value"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-500">Auto</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={handleAddRow}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Add New Row
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
