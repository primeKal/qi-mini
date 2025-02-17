import { Database } from "@/supabase/types/supabase";
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
  

// types from supabase 
//   maintaining both because of the flatness of supabase types
// example is the rows of a focusing Matrix



export type FocusingMatrix = Database["public"]["Tables"]["focusing_matrix"]["Row"];
export type FocusingMatrixRow = Database["public"]["Tables"]["focusing_matrix_rows"]["Row"];
