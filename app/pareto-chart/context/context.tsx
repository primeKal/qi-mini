"use client";

import { useReducer, useContext, createContext } from "react";
import { initialParetoChartData, paretoChartReducer } from "./intialAndReducer";
import { ParetoChartContextType } from "./types";

// Create context
const ParetoChartContext = createContext<ParetoChartContextType | undefined>(
  undefined
);

// Context Provider
export const ParetoChartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    paretoChartReducer,
    initialParetoChartData
  );

  return (
    <ParetoChartContext.Provider value={{ state, dispatch }}>
      {children}
    </ParetoChartContext.Provider>
  );
};

// Hook to use context
export const useParetoChartContext = () => {
  const context = useContext(ParetoChartContext);
  if (!context) {
    throw new Error(
      "useParetoChartContext must be used within a ParetoChartProvider"
    );
  }
  return context;
};
