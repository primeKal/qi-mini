import ToolWrapper from "@/components/tool-wrapper";
import React from "react";
import { ParetoChartProvider } from "./context/context";
import ParetoChart from "./pareto";

function page() {
  return (
    <ParetoChartProvider>
      <ToolWrapper
        title="Pareto Chart"
        toolId=""
        firstComponent={<ParetoChart />}
      />
    </ParetoChartProvider>
  );
}

export default page;
