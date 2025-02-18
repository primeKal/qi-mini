"use client";

import { createContext, useContext, useReducer } from "react";
import { IMRChartContextType } from "./types";
import { IMRChartReducer, initialIMRChartData } from "./initialANdReducer";

const IMRChartContext = createContext<IMRChartContextType | undefined>(undefined);

export const IMRChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(IMRChartReducer, initialIMRChartData);

  return (
    <IMRChartContext.Provider value={{ state, dispatch }}>
      {children}
    </IMRChartContext.Provider>
  );
};

export const useIMRChartContext = () => {
  const context = useContext(IMRChartContext);
  if (!context) {
    throw new Error("useIMRChartContext must be used within an IMRChartProvider");
  }
  return context;
};
