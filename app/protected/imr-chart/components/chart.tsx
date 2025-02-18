"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useIMRChartContext } from "../contex/contex";
import IMRChartConfiguration from "./config";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function IMRChart() {
  const { state } = useIMRChartContext();

  // **Extracting Values for Plotting**
  const timestamps = state.measurements.map((m) => new Date(m.timestamp).toLocaleTimeString());
  const values = state.measurements.map((m) => m.value);
  const movingRanges = (state.measurements || [])
    .map((m) => m.movingRange)
    .filter((val): val is number => typeof val === "number");

  // **Handling Empty Data Cases**
  const meanX = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const movingRangeAvg = movingRanges.length > 0 ? movingRanges.reduce((a, b) => a + b, 0) / movingRanges.length : 0;

  const UCL_X = meanX + 2.66 * movingRangeAvg;
  const LCL_X = meanX - 2.66 * movingRangeAvg;

  // **Moving Range Control Limits**
  const UCL_MR = movingRanges.length > 0 ? 3.268 * movingRangeAvg : 0;
  const LCL_MR = 0; // Always zero for MR chart

  // **Individual Chart Data**
  const individualChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Individual Values",
        data: values,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.3)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Center Line (CL)",
        data: Array(values.length).fill(meanX),
        borderColor: "#000",
        borderWidth: 2,
        borderDash: [5, 5],
      },
      {
        label: "Upper Control Limit (UCL)",
        data: Array(values.length).fill(UCL_X),
        borderColor: "#ff073a",
        borderWidth: 2,
        borderDash: [5, 5],
      },
      {
        label: "Lower Control Limit (LCL)",
        data: Array(values.length).fill(LCL_X),
        borderColor: "#ff073a",
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  // **Moving Range Chart Data**
  const movingRangeChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Moving Range",
        data: movingRanges,
        borderColor: "#ff8800",
        backgroundColor: "rgba(255, 136, 0, 0.3)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Center Line (CL)",
        data: Array(movingRanges.length).fill(movingRangeAvg),
        borderColor: "#000",
        borderWidth: 2,
        borderDash: [5, 5],
      },
      {
        label: "Upper Control Limit (UCL)",
        data: Array(movingRanges.length).fill(UCL_MR),
        borderColor: "#ff073a",
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* Left: Configuration */}
      <div className="flex-[0.5] bg-white shadow-md rounded-lg p-6 m-3">
        <IMRChartConfiguration />
      </div>

      {/* Right: Charts (Stacked Vertically) */}
      <div className="flex-[0.5] flex flex-col gap-4 p-6 m-3 bg-white shadow-md rounded-lg">
        {/* Title & Description */}
        <h2 className="text-2xl font-bold mb-2">{state.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{state.description}</p>

        {/* Line Descriptions */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
            <span>Individual Values</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-black rounded-full"></span>
            <span>Center Line (CL)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span>Upper Control Limit (UCL)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span>Lower Control Limit (LCL)</span>
          </div>
        </div>

        {/* Charts */}
        {state.measurements.length > 0 ? (
          <>
            {/* Individual Chart */}
            <div className="flex-1 h-[250px]">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Individual Chart</h3>
              <Line data={individualChartData} options={options as any} />
            </div>

            {/* Moving Range Chart */}
            <div className="flex-1 h-[250px] mt-2">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Moving Range Chart</h3>
              <Line data={movingRangeChartData} options={options as any} />
            </div>
          </>
        ) : (
          <p className="text-gray-500">No data available. Add measurements to generate a chart.</p>
        )}
      </div>
    </div>
  );
}
