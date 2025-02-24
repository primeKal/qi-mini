"use client";

import React, { useState, useRef } from "react";
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Download, Fullscreen } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FocusingMatrixData } from "../context/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  annotationPlugin
);

function FocusingMatrixViewModal({ data }: { data: FocusingMatrixData } ) {
  const [open, setOpen] = useState(false);
  const pdfRef = useRef(null);

  // Chart data configuration
  const chartData = {
    datasets: data.rows?.map((row) => ({
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
          text: data.columns.firstColumn,
        },
        min: -10,
        max: 10,
      },
      y: {
        title: {
          display: true,
          text: data.columns.secondColumn,
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
              `${data.columns.firstColumn} &  ${data.columns.secondColumn}`,
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
              `Not ${data.columns.firstColumn} & ${data.columns.secondColumn}`,
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
              `${data.columns.firstColumn} & Not ${data.columns.secondColumn}`,
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
              `Not ${data.columns.firstColumn} & Not ${data.columns.secondColumn}`,
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

  // Download as PDF including table and graph
  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.text(data.title, 10, 10);
    doc.text(data.description, 10, 20);
    
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 30, 180, 100);
    }
    
    doc.save("FocusingMatrix.pdf");
  };
    // Download as PNG image
    const downloadPNG = async () => {
        if (pdfRef.current) {
          const canvas = await html2canvas(pdfRef.current);
          const imgData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "FocusingMatrix.png";
          link.click();
        }
      };

  return (
    <div>
      {/* Button to Open Modal */}
      <Button onClick={() => setOpen(true)} variant="outline" size="icon">
        <Fullscreen size={20} />
      </Button>

      {/* Full-Screen Modal */}
      <Transition show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="max-w-10xl w-full h-[90vh] bg-white rounded-lg shadow-xl p-6 flex flex-col">
              <Dialog.Title className="text-2xl font-bold">{data.title}</Dialog.Title>
              <p className="text-gray-600">{data.description}</p>

              {/* Modal Content */}
              <div ref={pdfRef} className="flex flex-1 overflow-hidden gap-4">
                {/* Left: Table Section */}
                <div className="w-1/3 bg-gray-100 p-4 overflow-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">{data.columns.firstColumn}</th>
                        <th className="text-left p-2">{data.columns.secondColumn}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.rows?.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{row.name}</td>
                          <td className="p-2">{row.firstValue}</td>
                          <td className="p-2">{row.secondValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Right: Graph Section */}
                <div className="w-2/3 p-4">
                  <Scatter data={chartData} options={options as any} />
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-end p-4 gap-3">
                <Button onClick={downloadPDF} className="bg-blue-500 text-white px-6 py-2 rounded">
                  <Download size={16} className="mr-2" /> Download PDF
                </Button>
                <Button onClick={downloadPNG} className="bg-blue-500 text-white px-6 py-2 rounded">
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

export default FocusingMatrixViewModal;
