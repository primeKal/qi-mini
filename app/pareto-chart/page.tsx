import ToolWrapper from "@/components/tool-wrapper";
import React from "react";
import { ParetoChartProvider } from "./context/context";
import ParetoChart from "./components/pareto";
import ParetoChartHistory from "./components/history";

function page() {
  return (
    <ParetoChartProvider>
      <ToolWrapper
        title="Pareto Chart"
        toolId=""
        firstComponent={<ParetoChart />} 
        secondComponent={<ParetoChartHistory/>}   />
    </ParetoChartProvider>
  );
}

export default page;
