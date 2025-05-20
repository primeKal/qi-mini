"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useIMRChartContext } from "../contex/contex";
import IMRChartConfiguration from "./config";
import IMRChartFooter from "./footer";
import { Toaster } from "react-hot-toast";
import {
  calculateIMRChartValues,
  getIndividualChartData,
  getMovingChartData,
} from "../utility/chart-config";
import IMRChartViewModal from "./view-modal";
import AnalyzeWithAI from "@/components/open-ai/analyze-with-ai";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function IMRChart() {
  const { state } = useIMRChartContext();



  const allTheData = calculateIMRChartValues(state);
  // **Individual Chart Data**
  const individualChartData = getIndividualChartData(
    allTheData.timestamps,
    allTheData.values,
    allTheData.meanX,
    allTheData.UCL_X,
    allTheData.LCL_X
  );

  // **Moving Range Chart Data**
  const movingRangeChartData = getMovingChartData(
    allTheData.timestamps,
    allTheData.movingRanges,
    allTheData.movingRangeAvg,
    allTheData.UCL_MR
  )

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Date',
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
        // callback: function (val: any, index: number, ticks: any): any {
        //   // const label = this.getLabelForValue(val);
        //   console.log(val);
        //   return val; // Or format here if needed
        // },
      },
    },
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: 'Value',
      },
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
    <div>
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
              <div className="flex-1 ">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Individual Chart
                </h3>
                <div>
                  <Line data={individualChartData} options={options as any} />
                </div>
              </div>

              {/* Moving Range Chart */}
              <div className="flex-1  mt-2">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Moving Range Chart
                </h3>
                <div>
                  <Line data={movingRangeChartData} options={options as any} />
                </div>
              </div>
              <IMRChartViewModal data={state} />
              <AnalyzeWithAI data={state} />
            </>
          ) : (
            <p className="text-gray-500">
              No data available. Add measurements to generate a chart.
            </p>
          )}
        </div>
      </div>
      {/* Footer (Now outside the 50/50 layout) */}
      <div className="w-full border-t  p-4 flex justify-center">
        <IMRChartFooter />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
