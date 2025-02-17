import { ParetoChartRow } from "./types";

// Action types
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_SAMPLE_SIZE = "UPDATE_SAMPLE_SIZE";
export const UPDATE_FIRST_COLUMN = "UPDATE_FIRST_COLUMN";
export const UPDATE_ROWS = "UPDATE_ROWS";
export const ADD_ROW = "ADD_ROW";
export const EDIT_ROW = "EDIT_ROW";
export const REMOVE_ROW = "REMOVE_ROW";
export const UPDATE_SORT_ORDER = "UPDATE_SORT_ORDER";



// Action creators
export const updateTitle = (title: string) => ({ type: UPDATE_TITLE, payload: title });
export const updateDescription = (description: string) => ({ type: UPDATE_DESCRIPTION, payload: description });
export const updateSampleSize = (sampleSize: number) => ({ type: UPDATE_SAMPLE_SIZE, payload: sampleSize });
export const updateFirstColumn = (firstColumn: string) => ({ type: UPDATE_FIRST_COLUMN, payload: firstColumn });
export const updateRows = (rows: ParetoChartRow[]) => ({ type: UPDATE_ROWS, payload: rows });
export const addRow = () => ({ type: ADD_ROW });
export const editRow = (index: number, updatedRow: Partial<ParetoChartRow>) => ({ type: EDIT_ROW, payload: { index, updatedRow } });
export const removeRow = (index: number) => ({ type: REMOVE_ROW, payload: { index } });
export const updateSortOrder= (order: 'asc' | 'desc') => ({ type: UPDATE_SORT_ORDER, payload: order });