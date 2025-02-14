import {
  ADD_ROW,
  EDIT_ROW,
  REMOVE_ROW,
  UPDATE_DESCRIPTION,
  UPDATE_FIRST_COLUMN,
  UPDATE_ROWS,
  UPDATE_SAMPLE_SIZE,
  UPDATE_SORT_ORDER,
  UPDATE_TITLE,
} from "./actions";
import { ParetoChartData } from "./types";

export let initialParetoChartData: ParetoChartData = {
  sampleTitle: "80-20 Pareto Chart",
  sampleDescription: "This tool allows you to visualize your scores",
  sampleSize: 0,
  rows: [],
  firstColumn: "Frequency",
  sortOrder: "desc",
};

// Reducer function
export const paretoChartReducer = (
  state: ParetoChartData,
  action: any
): ParetoChartData => {
  switch (action.type) {
    case UPDATE_TITLE:
      return { ...state, sampleTitle: action.payload };
    case UPDATE_DESCRIPTION:
      return { ...state, sampleDescription: action.payload };
    case UPDATE_SAMPLE_SIZE:
      return { ...state, sampleSize: action.payload };
    case UPDATE_FIRST_COLUMN:
      return { ...state, firstColumn: action.payload };
    case UPDATE_ROWS:
      return { ...state, rows: action.payload };
    case UPDATE_SORT_ORDER:
      return { ...state, sortOrder: action.payload };
    case ADD_ROW:
      return {
        ...state,
        rows: [...state.rows, { name: "", firstColumnData: 0 }],
      };
    case EDIT_ROW:
      return {
        ...state,
        rows: state.rows.map((row, index) =>
          index === action.payload.index
            ? { ...row, ...action.payload.updatedRow }
            : row
        ),
      };
    case REMOVE_ROW:
      return {
        ...state,
        rows: state.rows.filter((_, index) => index !== action.payload.index),
      };
    default:
      return state;
  }
};
