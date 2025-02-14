import { Dispatch } from "react";

export interface ParetoChartData {
  sampleTitle: string;
  sampleDescription: string;
  sampleSize: number;
  firstColumn: string;
  rows: Array<ParetoChartRow>;
  sortOrder: "asc" | "desc";
}

export interface ParetoChartRow {
  name: string;
  firstColumnData: number;
}

export interface ParetoChartContextType {
  state: ParetoChartData;
  dispatch: Dispatch<any>;
}
