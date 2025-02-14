// Action types
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_ROWS = "UPDATE_ROWS";
export const UPDATE_COLUMNS = "UPDATE_COLUMNS";
export const UPDATE_QUADRANT_NAMES = "UPDATE_QUADRANT_NAMES";


// Action creators
export const updateTitle = (title: string) => ({ type: "UPDATE_TITLE", payload: title });
export const updateDescription = (description: string) => ({ type: "UPDATE_DESCRIPTION", payload: description });
export const updateRows = (rows: { name: string; firstValue: number; secondValue: number }[]) => ({ type: "UPDATE_ROWS", payload: rows });
export const updateColumns = (columns: any) => ({ type: "UPDATE_COLUMNS", payload: columns });
export const updateQuadrantNames = (quadrantNames: any) => ({ type: "UPDATE_QUADRANT_NAMES", payload: quadrantNames });
export const addRow = () => ({ type: "ADD_ROW" });
export const editRow = (index: number, updatedRow: { name?: string; firstValue?: number; secondValue?: number, color?: string }) => ({ type: "EDIT_ROW", payload: { index, updatedRow } });
export const removeRow = (index: number) => ({ type: "REMOVE_ROW", payload: { index } });
