"use client";

import React, { useState, useRef } from "react";
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Download, Fullscreen } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { IMRChartData } from "../contex/types";
import {
  calculateIMRChartValues,
  getIndividualChartData,
  getMovingChartData,
} from "../utility/chart-config";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function IMRChartViewModal({ data }: { data: IMRChartData }) {
  const [open, setOpen] = useState(false);
  const pdfRef = useRef(null);

  // Download as PDF
  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.text(data.title, 10, 10);
    doc.text(data.description, 10, 20);

    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 30, 180, 100);
    }

    doc.save("IMRChart.pdf");
  };

  // Download as PNG
  const downloadPNG = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "IMRChart.png";
      link.click();
    }
  };

  const allTheData = calculateIMRChartValues(data);
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
  );
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
    <div>
      <Button onClick={() => setOpen(true)} variant="outline" size="icon">
        <Fullscreen size={20} />
      </Button>

      <Transition show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="max-w-6xl w-full h-[90vh] bg-white rounded-lg shadow-xl p-6 flex flex-col">
              <Dialog.Title className="text-2xl font-bold">
                {data.title}
              </Dialog.Title>
              <p className="text-gray-600">{data.description}</p>
              <div ref={pdfRef} className="flex flex-1 overflow-hidden gap-4">
                {/* Left: Table Section */}
                <div className="w-1/3 bg-gray-100 p-4 overflow-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Timestamp</th>
                        <th className="text-left p-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.measurements.map((m, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">
                            {m.timestamp}
                          </td>
                          <td className="p-2">{m.value.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Right: Graph Section */}
                <div className="w-2/3 flex flex-col gap-4 p-4">
                  <div className="h-full">
                    <Line data={individualChartData} options={options as any} />
                  </div>
                  <div className="h-full">
                    <Line
                      data={movingRangeChartData}
                      options={options as any}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-4 gap-3">
                <Button
                  onClick={downloadPDF}
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                  <Download size={16} className="mr-2" /> Download PDF
                </Button>
                <Button
                  onClick={downloadPNG}
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                >
                  <Download size={16} className="mr-2" /> Download PNG
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default IMRChartViewModal;
