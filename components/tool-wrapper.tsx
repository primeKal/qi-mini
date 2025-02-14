import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";

interface ToolWrapperProps {
  title: string;
  toolId: string;
  firstComponent: React.ReactNode;
}

function ToolWrapper({ title, firstComponent }: ToolWrapperProps) {
  return (
    <div className="flex h-fit w-full justify-center items-center bg-green-100 ">
      <div className="w-full  bg-white shadow-xl rounded-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>

        {/* Tab Group */}
        <TabGroup className="w-full">
          <TabList className="flex gap-6 justify-center">
            <Tab
              key="playground"
              className="rounded-full py-2 px-5 text-lg font-semibold text-gray-800 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:outline-none data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:bg-blue-100"
            >
              Play Ground
            </Tab>
            <Tab
              key="history"
              className="rounded-full py-2 px-5 text-lg font-semibold text-gray-800 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:outline-none data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:bg-blue-100"
            >
              History
            </Tab>
          </TabList>

          {/* Tab Panels */}
          <TabPanels className="mt-6  h-screen w-full">
            <TabPanel
              key="playground"
              className="rounded-xl p-6 h-full w-full"
            >
              {firstComponent}
            </TabPanel>
            <TabPanel
              key="history"
              className="rounded-xl bg-green-50 p-6 "
            >
              <div>History goes here</div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

export default ToolWrapper;
