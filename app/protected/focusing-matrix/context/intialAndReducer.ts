import { UPDATE_TITLE, UPDATE_DESCRIPTION, UPDATE_ROWS, UPDATE_COLUMNS, UPDATE_QUADRANT_NAMES } from "./actions";
import { FocusingMatrixData } from "./types";

export let initialFocusingMatrixData: FocusingMatrixData = {
  title: "",
  description: "2 dimensional analyzer",
  rows: [],
  columns: {
    firstColumn: "Important",
    secondColumn: " Urgent",
  },
  quadrantNames: {
    firstQuadrant: "Important and Urgent",
    secondQuadrant: "Not Important and Urgent",
    thirdQuadrant: "Not Important and Not Urgent",
    fourthQuadrant: "Important and Not Urgent",
  },
};

export const focusingMatrixReducer = (state: FocusingMatrixData, action: any): FocusingMatrixData => {
  switch (action.type) {
    case "UPDATE_TITLE":
      return { ...state, title: action.payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload };
    case "UPDATE_ROWS":
      return { ...state, rows: action.payload };
    case "UPDATE_COLUMNS":
      return { ...state, columns: { ...state.columns, ...action.payload } };
    case "UPDATE_QUADRANT_NAMES":
      return { ...state, quadrantNames: { ...state.quadrantNames, ...action.payload } };
    case "ADD_ROW":
      return { ...state, rows: [...state.rows, { name: "", firstValue: 0, secondValue: 0, color: "#000000"  }] };
    case "EDIT_ROW":
      return {
        ...state,
        rows: state.rows.map((row, index) =>
          index === action.payload.index ? { ...row, ...action.payload.updatedRow } : row
        ),
      };
    case "REMOVE_ROW":
      return {
        ...state,
        rows: state.rows.filter((_, index) => index !== action.payload.index),
      };
    default:
      return state;
  }
};
