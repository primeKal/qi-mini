import { IMRChartData } from "../contex/types";

export const calculateIMRChartValues = ( data : IMRChartData) => {
      // **Extracting Values for Plotting**
  const timestamps = data.measurements.map((m) =>
    new Date(m.timestamp).toLocaleTimeString()
  );
  const values = data.measurements.map((m) => m.value);
  const movingRanges = (data.measurements || [])
    .map((m) => m.movingRange)
    .filter((val): val is number => typeof val === "number");

  // **Handling Empty Data Cases**
  const meanX =
    values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  const movingRangeAvg =
    movingRanges.length > 0
      ? movingRanges.reduce((a, b) => a + b, 0) / movingRanges.length
      : 0;

  const UCL_X = meanX + 2.66 * movingRangeAvg;
  const LCL_X = meanX - 2.66 * movingRangeAvg;

  // **Moving Range Control Limits**
  const UCL_MR = movingRanges.length > 0 ? 3.268 * movingRangeAvg : 0;
  const LCL_MR = 0; // Always zero for MR chart
return {
    timestamps: timestamps,
    values: values,
    movingRanges: movingRanges,
    meanX: meanX,
    movingRangeAvg: movingRangeAvg,
    UCL_X: UCL_X,
    LCL_X: LCL_X,
    UCL_MR: UCL_MR,
    LCL_MR: LCL_MR
    }
}
export const getIndividualChartData = (timestamps: any,values: any,meanX: Number, UCL_X: Number, LCL_X: Number) => {
    return {
        labels: timestamps,
        datasets: [
          {
            label: "Individual Values",
            data: values,
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.3)",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Center Line (CL)",
            data: Array(values.length).fill(meanX),
            borderColor: "#000",
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            label: "Upper Control Limit (UCL)",
            data: Array(values.length).fill(UCL_X),
            borderColor: "#ff073a",
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            label: "Lower Control Limit (LCL)",
            data: Array(values.length).fill(LCL_X),
            borderColor: "#ff073a",
            borderWidth: 2,
            borderDash: [5, 5],
          },
        ],
      };



}

export const getMovingChartData = (timestamps: any, movingRanges : any,movingRangeAvg: Number, UCL_MR: Number ) => {
    return {
        labels: timestamps,
        datasets: [
          {
            label: "Moving Range",
            data: movingRanges,
            borderColor: "#ff8800",
            backgroundColor: "rgba(255, 136, 0, 0.3)",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Center Line (CL)",
            data: Array(movingRanges.length).fill(movingRangeAvg),
            borderColor: "#000",
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            label: "Upper Control Limit (UCL)",
            data: Array(movingRanges.length).fill(UCL_MR),
            borderColor: "#ff073a",
            borderWidth: 2,
            borderDash: [5, 5],
          },
        ],
      };
}

