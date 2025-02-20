import { ControlLimits, IMRChartRow } from "./types";

export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const ADD_MEASUREMENT = "ADD_MEASUREMENT";
export const ADD_MEASUREMENTS = "ADD_MEASUREMENTS";
export const REMOVE_MEASUREMENT = "REMOVE_MEASUREMENT";
export const UPDATE_CONTROL_LIMITS = "UPDATE_CONTROL_LIMITS";

export const updateTitle = (title: string) => ({
  type: UPDATE_TITLE,
  payload: title,
});

export const updateDescription = (description: string) => ({
  type: UPDATE_DESCRIPTION,
  payload: description,
});

export const addMeasurement = (measurement: IMRChartRow) => ({
  type: ADD_MEASUREMENT,
  payload: measurement,
});
export const addMeasurements = (measurements: IMRChartRow[]) => ({
  type: ADD_MEASUREMENTS,
  payload: measurements,
});

export const removeMeasurement = (index: number) => ({
  type: REMOVE_MEASUREMENT,
  payload: index,
});

export const updateControlLimits = (limits: ControlLimits) => ({
  type: UPDATE_CONTROL_LIMITS,
  payload: limits,
});
