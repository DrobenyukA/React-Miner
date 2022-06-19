export interface Cell {
  isOpen: boolean;
  isBomb: boolean;
  countOfBombs: number;
}

export interface Coordinates {
  row: number;
  cell: number;
}

export type OffsetY = number;
export type OffsetX = number;
export type Offsets = [OffsetY, OffsetX];

export type Row = Cell[];

export type Board = Row[];
