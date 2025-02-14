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
import { useFocusingMatrixContext } from "./context/context";
import { MatrixRow } from "./context/types";

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
    <div className="flex  flex-col md:flex-row h-fit w-full">
      {/* Left pane */}
      <MatrixConfiguration />

      {/* Right pane */}
      <div className="flex-[0.5] p-4">
        <div className="  bg-white shadow-md rounded-lg p-4 m-5">
          <h3>{state.title}</h3>
          <p>{state.description}</p>
          <div className="h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] 2xl:h-[900px] 2xl:w-[900px]">
            <Scatter data={chartData} options={options as any} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matrix;
