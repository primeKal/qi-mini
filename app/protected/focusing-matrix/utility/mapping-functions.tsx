import { FocusingMatrixData } from "../context/types";

export function mapFocusingMatrixFromDb(
    matrix: any
  ): FocusingMatrixData {
    return {
      title: matrix.title || "Untitled Matrix",
      description: matrix.description || "",
      columns: {
        firstColumn: matrix.first_column || "First Column",
        secondColumn: matrix.second_column || "Second Column",
      },
      quadrantNames: {
        firstQuadrant: matrix.first_quadrant || "Quadrant 1",
        secondQuadrant: matrix.second_quadrant || "Quadrant 2",
        thirdQuadrant: matrix.third_quadrant || "Quadrant 3",
        fourthQuadrant: matrix.fourth_quadrant || "Quadrant 4",
      },
      rows: matrix.focusing_matrix_rows?.map((row: any) => ({
        name: row.name || "",
        firstValue: row.first_value || 0,
        secondValue: row.second_value || 0,
        color: row.color || "#000000",
      })),
    };
  }