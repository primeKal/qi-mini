import { ParetoChartData } from "../context/types";

export const getParetoChartDataFromDB = (chart: any): ParetoChartData => {
    return {
      sampleTitle: chart.sample_title,
      sampleDescription: chart.sample_description,
      sampleSize: chart.sample_size,
      firstColumn: chart.first_column,
      sortOrder: chart.sort_order as "asc" | "desc",
      rows: chart.pareto_chart_rows.map((row: any) => ({
        name: row.name,
        firstColumnData: row.first_column_data,
      })),
    };
  };
  