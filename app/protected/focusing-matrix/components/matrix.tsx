"use client";

import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";

import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import MatrixConfiguration from "./config";
import { useFocusingMatrixContext } from "../context/context";
import { FocusingMatrixData, MatrixRow } from "../context/types";
import FocusingMatrixFooter from "./footer";
import FocusingMatrixViewModal from "./view-modal";
import { Toaster } from "react-hot-toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  annotationPlugin
);

function Matrix() {
  const { state, dispatch } = useFocusingMatrixContext();

  //  chart configuration
  const chartData = {
    datasets: state.rows.map((row: MatrixRow) => ({
      label: row.name,
      data: [{ x: row.firstValue, y: row.secondValue, label: row.name }],
      backgroundColor: row.color,
      pointRadius: 8,
    })),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: state.columns.firstColumn,
        },
        min: -10,
        max: 10,
      },
      y: {
        title: {
          display: true,
          text: state.columns.secondColumn,
        },
        min: -10,
        max: 10,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          // Vertical line at x=0
          verticalLine: {
            type: "line",
            xMin: 0,
            xMax: 0,
            borderColor: "black",
            borderWidth: 2,
          },
          // Horizontal line at y=0
          horizontalLine: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "black",
            borderWidth: 2,
          },
          // quadrant texts
          quadrant1Text: {
            type: "label",
            xValue: 5,
            yValue: 8,
            content: [
              `${state.columns.firstColumn} &  ${state.columns.secondColumn}`,
            ],
            backgroundColor: "rgba(0,0,0,0.0)",
            color: "black",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          quadrant2Text: {
            type: "label",
            xValue: -5,
            yValue: 8,
            content: [
              `Not ${state.columns.firstColumn} & ${state.columns.secondColumn}`,
            ],
            backgroundColor: "rgba(0,0,0,0.0)",
            color: "black",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          quadrant3Text: {
            type: "label",
            xValue: 5,
            yValue: -8,
            content: [
              `${state.columns.firstColumn} & Not ${state.columns.secondColumn}`,
            ],
            backgroundColor: "rgba(0,0,0,0.0)",
            color: "black",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          quadrant4Text: {
            type: "label",
            xValue: -5,
            yValue: -8,
            content: [
              `Not ${state.columns.firstColumn} & Not ${state.columns.secondColumn}`,
            ],
            backgroundColor: "rgba(0,0,0,0.0)",
            color: "black",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return context.raw.label;
          },
        },
      },
    },
  };
  return (
    <div className="flex flex-col  w-full">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Left pane - Matrix Configuration */}
        <div className="flex-1 p-4">
          <MatrixConfiguration />
        </div>
  
        {/* Right pane - Chart Display */}
        <div className="flex-1 p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold">{state.title}</h3>
            <p className="text-gray-600">{state.description}</p>
            <div className="mt-4">
              <Scatter data={chartData} options={options as any} />
            </div>
            <FocusingMatrixViewModal {...(state as FocusingMatrixData)} />
          </div>
        </div>
      </div>
  
      {/* Footer (Now outside the 50/50 layout) */}
      <div className="w-full border-t  p-4 flex justify-center">
        <FocusingMatrixFooter />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
  
}

export default Matrix;
