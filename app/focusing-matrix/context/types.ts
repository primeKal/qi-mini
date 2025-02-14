import { Dispatch } from "react";

export interface FocusingMatrixData {
    
    title: string;
    description: string;
    rows: Array<MatrixRow>;
    columns: MatrixColumns;
    quadrantNames: QuadrantNames;
}

export interface MatrixRow {
    name: string;
    firstValue: number;
    secondValue: number;
    color: string;
}
export interface MatrixColumns {
    firstColumn: string;
    secondColumn: string;
}
export interface QuadrantNames {
    firstQuadrant: string;
    secondQuadrant: string;
    thirdQuadrant: string;
    fourthQuadrant: string;
}

export interface FocusingMatrixContextType {
    state: FocusingMatrixData;
    dispatch: Dispatch<any>;
  }
  