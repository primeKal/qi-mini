import { IMRChartData } from "../contex/types";

export const getIMRChartDataMappingFromDb = (chart: any): IMRChartData => {
    return {
    title: chart.title,
    description: chart.description,
    measurements: chart.imr_chart_rows.map((measurement: any) => ({
        timestamp: measurement.timestamp,
        value: measurement.value,
        movingRange: measurement.moving_range,
    })),
    controlLimits: {
        mean: 0,
        uclI: 0,
        lclI: 0,
        uclMR: 0,
        lclMR: 0,    
    }
};
  };
  