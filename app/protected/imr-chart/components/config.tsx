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
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState({
    timestamp: "",
    value: "",
  });

  // Update input values
  const handleInputChange = (key: "timestamp" | "value", value: string) => {
    setNewMeasurement((prev) => ({ ...prev, [key]: value }));
  };

  // Add new measurement
  const handleSaveRow = () => {
    if (!newMeasurement.timestamp.trim() || newMeasurement.value.trim() === "") return;
    
    const newValue = Number(newMeasurement.value);
    if (isNaN(newValue)) return;

    const lastValue = state.measurements.length > 0 ? state.measurements[state.measurements.length - 1].value : newValue;
    const movingRange = Math.abs(newValue - lastValue);

    dispatch(
      addMeasurement({
        timestamp: newMeasurement.timestamp,
        value: newValue,
        movingRange,
      })
    );

    setNewMeasurement({ timestamp: "", value: "" });
    setIsAddingNew(false);
  };

  // Cancel new row entry
  const handleCancelNewRow = () => {
    setNewMeasurement({ timestamp: "", value: "" });
    setIsAddingNew(false);
  };

  // Remove measurement
  const handleRemoveClick = (index: number) => {
    dispatch(removeMeasurement(index));
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
          <table className="min-w-full w-full bg-white shadow-md rounded-lg">
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
                  <td className="px-4 py-2">{new Date(row.timestamp).toLocaleDateString()}</td>
                  <td className="px-4 py-2 w-24">{row.value}</td>
                  <td className="px-4 py-2">{row.movingRange}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => handleRemoveClick(index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                  </td>
                </tr>
              ))}
              {isAddingNew && (
                <tr className="border-t">
                  <td className="px-4 py-2">
                    <Input type="date" value={newMeasurement.timestamp} onChange={(e) => handleInputChange("timestamp", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 w-24">
                    <Input type="number" value={newMeasurement.value} onChange={(e) => handleInputChange("value", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 text-gray-500">Auto</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={handleSaveRow} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={handleCancelNewRow} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {!isAddingNew && (
          <button onClick={() => setIsAddingNew(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-3">Add New Row</button>
        )}
      </div>
    </div>
  );
}
