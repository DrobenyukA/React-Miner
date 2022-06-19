// Motivation
// Because the game board represents the square of NxN cells the most suitable structure will be the array of arrays
// where each cell will be represented as an object that will keep its state and list indexes can be interpreted
// as a board coordinates.

// Individual cell configuration that stores its state
export interface Cell {
  isOpen: boolean;
  isBomb: boolean;
  countOfBombs: number;
}
// Navigation coordinates that allows navigation inside the board
export interface Coordinates {
  row: number;
  cell: number;
}
// Offsets for cell navigation
export type OffsetY = number;
export type OffsetX = number;
export type Offsets = [OffsetY, OffsetX];
// Structure of a single row
export type Row = Cell[];

export type Board = Row[];
