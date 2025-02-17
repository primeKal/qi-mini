"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { X, HelpCircle } from "lucide-react";
import React from "react";

export default function FocusingMatrixInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Question Mark Icon (Aligned Properly) */}
      <button
        onClick={() => setIsOpen(true)}
        className="ml-2 flex items-center text-gray-600 hover:text-blue-500 transition"
        aria-label="Open Focusing Matrix Info"
      >
        <HelpCircle size={24} />
      </button>

      {/* Dialog - Information Popup */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          {/* Background Overlay */}
          <Transition.Child
            enter="transition-opacity ease-in duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* Dialog Panel (Increased Height for Better Readability) */}
          <div className="fixed inset-0 flex items-center justify-center p-6">
            <Transition.Child
              enter="transition-transform ease-in duration-200"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition-transform ease-out duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 h-[70vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                  <Dialog.Title className="text-xl font-semibold text-gray-900">
                    Understanding the Focusing Matrix
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content - Scrollable Section */}
                <div className="mt-4 text-gray-700 flex-1 overflow-y-auto px-2 space-y-6">
                  {/* Section 1: General Information */}
                  <div>
                    <h3 className="text-lg font-semibold">What is a Focusing Matrix?</h3>
                    <p className="mt-2">
                      The <strong>Focusing Matrix</strong> is a **2D decision-making tool** that helps in **prioritization** 
                      by organizing ideas, tasks, or data points into **four quadrants** based on two chosen dimensions.
                    </p>

                    <p className="mt-3">
                      You can customize the **column and row labels** to match your needs. Some common examples:
                    </p>

                    <ul className="mt-3 list-disc list-inside space-y-2">
                      <li><strong>Effort vs. Impact:</strong> Used in project planning.</li>
                      <li><strong>Risk vs. Reward:</strong> Useful in business strategy.</li>
                      <li><strong>Urgency vs. Importance:</strong> Great for productivity management.</li>
                      <li><strong>Complexity vs. Feasibility:</strong> Often used in software development.</li>
                    </ul>
                  </div>

                  {/* Section 2: What You Can Do Here */}
                  <div>
                    <h3 className="text-lg font-semibold">What You Can Do in This Tool</h3>
                    <ul className="mt-3 list-disc list-inside space-y-2">
                      <li>💾 <strong>Save:</strong> Store your Focusing Matrix in the database for future reference.</li>
                      <li>📂 <strong>Load:</strong> Retrieve and edit saved matrices from your history.</li>
                      <li>📊 <strong>Visualize:</strong> Display a **scatter plot** representation of your matrix.</li>
                      <li>📥 <strong>Download:</strong> Export your matrix data for external use.</li>
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
