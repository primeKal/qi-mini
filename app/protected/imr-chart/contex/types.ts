import { Dispatch } from "react";

export interface IMRChartData {
    title: string; // Title of the chart
    description: string; // Short description
    measurements: IMRChartRow[]; // Array of individual values
    controlLimits: ControlLimits; // Control limits (UCL, LCL, mean)
  }
  
  export interface IMRChartRow {
    timestamp: string; // Date/time of measurement
    value: number; // Individual measurement (I-Chart)
    movingRange?: number; // Moving range (MR-Chart) (difference between this & previous value)
  }
  
  export interface ControlLimits {
    mean: number; // Mean of individual values
    uclI: number; // Upper Control Limit for Individual Chart
    lclI: number; // Lower Control Limit for Individual Chart
    uclMR: number; // Upper Control Limit for Moving Range Chart
    lclMR: number; // Lower Control Limit for Moving Range Chart
  }
  export interface IMRChartContextType {
    state: IMRChartData;
    dispatch: Dispatch<any>;
  }