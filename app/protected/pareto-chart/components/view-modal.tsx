"use client";

import React, { useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Download, Fullscreen } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ParetoChartData } from "../context/types";
import { getParetoChartData, getParetoChartOptions } from "../utility/chart-config";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

function ParetoChartViewModal({ data }: { data: ParetoChartData }) {
  const [open, setOpen] = useState(false);
  const pdfRef = useRef(null);

  // Download as PDF
  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.text(data.sampleTitle, 10, 10);
    doc.text(data.sampleDescription, 10, 20);
    
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 30, 180, 100);
    }
    
    doc.save("ParetoChart.pdf");
  };

  // Download as PNG
  const downloadPNG = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "ParetoChart.png";
      link.click();
    }
  };
  const chartData = getParetoChartData(data);
  const chartOptions = getParetoChartOptions(data);

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
              <Dialog.Title className="text-2xl font-bold">{data.sampleTitle}</Dialog.Title>
              <p className="text-gray-600">{data.sampleDescription}</p>
              <div ref={pdfRef} className="flex flex-1 overflow-hidden gap-4">
                {/* Left: Table Section */}
                <div className="w-1/3 bg-gray-100 p-4 overflow-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.rows.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{row.name}</td>
                          <td className="p-2">{row.firstColumnData}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Right: Chart Section */}
                <div className="w-2/3 p-4">
                  <Bar data={chartData as any} options={chartOptions as any} />
                </div>
              </div>

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

export default ParetoChartViewModal;
