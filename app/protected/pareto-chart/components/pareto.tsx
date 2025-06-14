"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { useParetoChartContext } from "../context/context";
import ParetoChartConfiguration from "./config";
import ParetoChartFooter from "./footer";
import ParetoChartViewModal from "./view-modal";
import { Toaster } from "react-hot-toast";
import AnalyzeWithAI from "@/components/open-ai/analyze-with-ai";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  annotationPlugin,
  Tooltip
);

const ParetoChart = () => {
  const { state } = useParetoChartContext();
  const [cumulativePercentages, setCumulativePercentages] = useState<number[]>(
    []
  );

  useEffect(() => {
    // Ensure rows are sorted in descending order
    const sortedRows = [...state.rows].sort(
      (a, b) => b.firstColumnData - a.firstColumnData
    );

    // Compute total sum of all values
    const total = sortedRows
      .map((x) => Number(x.firstColumnData))
      .filter((value) => !isNaN(value)) // Ensure all values are valid numbers
      .reduce((acc: number, value: number) => acc + value, 0);

    let cumulative = 0;
    setCumulativePercentages(
      sortedRows.map((row) => {
        cumulative += Number(row.firstColumnData);
        return total ? (cumulative / total) * 100 : 0;
      })
    );
  }, [state.rows]);

  const sortedRows = [...state.rows].sort(
    (a, b) => b.firstColumnData - a.firstColumnData
  );

  // Generate random colors for each cumulative point
  const generateRandomColors = (count: number) => {
    return Array.from({ length: count }, () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b})`;
    });
  };

  const cumulativeColors = generateRandomColors(cumulativePercentages.length);

  const data = {
    labels: sortedRows.map((x) => x.name),
    datasets: [
      {
        type: "bar",
        label: "Values",
        data: sortedRows.map((x) => x.firstColumnData),
        backgroundColor: "rgba(0, 123, 255, 0.5)", // Bar color
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Cumulative Percentage",
        data: cumulativePercentages,
        borderColor: "rgba(255, 99, 132, 1)", // Line color
        borderWidth: 2,
        fill: false,
        yAxisID: "percentage",
        tension: 0.4, // Adds smooth curve effect
        pointBackgroundColor: cumulativeColors, // Different colors for points
        pointRadius: 5, // Make points more visible
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false, // Allow flexible resizing
    layout: {
      padding: {
        top: 20, // Add extra space to prevent clipping
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Frequency",
        },
      },
      percentage: {
        type: "linear",
        position: "right",
        min: 0,
        max: 105, // Increase max limit to avoid clipping at 100%
        title: {
          display: true,
          text: "Cumulative Percentage",
        },
        ticks: {
          callback: function (value: any) {
            return value + "%"; // Show percentage sign on the y-axis
          },
        },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 80,
            yMax: 80,
            borderColor: "rgba(255, 99, 132, 0.5)",
            borderWidth: 2,
            yScaleID: "percentage",
            label: {
              content: "80% Threshold",
              enabled: true,
              position: "end",
              color: "white",
              backgroundColor: "rgba(255, 99, 132, 0.7)",
              padding: 4,
            },
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const datasetIndex = tooltipItem.datasetIndex;
            const index = tooltipItem.dataIndex;
            if (datasetIndex === 1) {
              return ` Cumulative: ${cumulativePercentages[index].toFixed(2)}%`;
            }
            return ` Frequency: ${sortedRows[index].firstColumnData}`;
          },
        },
      },
    },
  };
  

  return (
    <div className="flex flex-col  w-full">
      {/* Main Content - Keeps 50/50 Layout */}
      <div className="flex flex-col lg:flex-row flex-1 w-full">
        {/* Left Pane - Configuration */}
        <div className="flex-1 p-4">
          <ParetoChartConfiguration />
        </div>
  
        {/* Right Pane - Chart */}
        <div className="flex-1 p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{state.sampleTitle}</h2>
            {state.rows.length > 0 && (
              <h3 className="text-gray-600">
                Showing Pareto chart for a sample size of{" "}
                {state.rows.reduce((sum, row) => sum + row.firstColumnData, 0)}
              </h3>
            )}
            <Bar data={data as any} options={options as any} className="m-3 p-4" />
            <ParetoChartViewModal data={state} />
            <AnalyzeWithAI data={state} />
          </div>
        </div>
      </div>
  
      {/* Footer (Now outside the 50/50 layout) */}
      <div className="w-full border-t p-4 flex items-center justify-center">
        <ParetoChartFooter />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
  
};

export default ParetoChart;
