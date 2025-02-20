import { ADD_MEASUREMENT, ADD_MEASUREMENTS, REMOVE_MEASUREMENT, UPDATE_CONTROL_LIMITS, UPDATE_DESCRIPTION, UPDATE_TITLE } from "./actions";
import { IMRChartData } from "./types";

export const initialIMRChartData: IMRChartData = {
    title: "Individual Moving Range Chart",
    description: "This chart tracks process variation over time.",
    measurements: [],
    controlLimits: {
      mean: 0,
      uclI: 0,
      lclI: 0,
      uclMR: 0,
      lclMR: 0,
    },
  };
  
  export const IMRChartReducer = (state: IMRChartData, action: any): IMRChartData => {
    switch (action.type) {
      case UPDATE_TITLE:
        return { ...state, title: action.payload };
      case UPDATE_DESCRIPTION:
        return { ...state, description: action.payload };
      case ADD_MEASUREMENT:
        const updatedMeasurements = [...state.measurements, action.payload];
        return { ...state, measurements: updatedMeasurements };
      case ADD_MEASUREMENTS:
        const updatedALLMeasurements = [...state.measurements, ...action.payload];
        return { ...state, measurements: updatedALLMeasurements };
      case REMOVE_MEASUREMENT:
        return { ...state, measurements: state.measurements.filter((_, index) => index !== action.payload) };
      case UPDATE_CONTROL_LIMITS:
        return { ...state, controlLimits: action.payload };
      default:
        return state;
    }
  };
  