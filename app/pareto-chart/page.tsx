import ToolWrapper from "@/components/tool-wrapper";
import React from "react";
import { ParetoChartProvider } from "./context/context";
import ParetoChart from "./components/pareto";
import ParetoChartHistory from "./components/history";
import ParetoChartInfo from "./components/info-dialogue";

function page() {
  return (
    <ParetoChartProvider>
      <ToolWrapper
        title="Pareto Chart"
        toolId=""
        firstComponent={<ParetoChart />}
        secondComponent={<ParetoChartHistory />}
        infoComponent={<ParetoChartInfo />}
      />
    </ParetoChartProvider>
  );
}

export default page;
