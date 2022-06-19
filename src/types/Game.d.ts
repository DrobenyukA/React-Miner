export interface Cell {
  isOpened: boolean;
  isBomb: boolean;
  countOfBombs: number;
}

export interface Coordinates {
  row: number;
  cell: number;
}

export type Row = Cell[];

export type Board = Row[];
