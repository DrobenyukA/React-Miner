import { Board, Cell, Coordinates, Offsets } from "../types/Game";
// list of offsets that allows to navigate inside the board on cell click
const surroundingCellsOffsets: Array<Offsets> = [
  [-1, 0], // top
  [-1, 1], // topRight
  [0, 1], // right
  [1, 1], // bottomRight
  [1, 0], // bottom
  [1, -1], // bottomLeft
  [0, -1], // left
  [-1, -1], // topLeft
];

function createCell(isBomb = false, isOpen = false, countOfBombs = 0): Cell {
  return { isBomb, isOpen, countOfBombs };
}

function createRow(size: number): Cell[] {
  return new Array(size).fill(null).map(() => createCell());
}

function getCellCoordinates(board: Board): Coordinates {
  return {
    row: Math.floor(Math.random() * board.length),
    cell: Math.floor(Math.random() * board.length),
  };
}

function get(board: Board, row: number, col: number): Cell | undefined {
  return board[row] ? board[row][col] : undefined;
}

function getSurroundingCells(board: Board, { row, cell }: Coordinates): Cell[] {
  return surroundingCellsOffsets
    .map(([y, x]) => get(board, row + y, cell + x))
    .filter((cell) => !!cell) as Cell[];
}

function countBombs(board: Board, coords: Coordinates): number {
  return getSurroundingCells(board, coords).reduce(
    (acc, item) => (item.isBomb ? (acc += 1) : acc),
    0
  );
}

function setBombsCount(board: Board) {
  board.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      if (cell.isBomb) {
        return;
      }
      cell.countOfBombs = countBombs(board, { row: rowIndex, cell: cellIndex });
    })
  );
}

function setBombs(count: number, board: Board) {
  if (count !== 0) {
    const { row, cell } = getCellCoordinates(board);
    board[row][cell] = { ...board[row][cell], isBomb: true, countOfBombs: 0 };
    setBombs(count - 1, board);
  }
}

function getBaseBombsQuantityPerSize(size: number): number {
  const percentsOfBombs = 15 / 100;
  return Math.floor(size * size * percentsOfBombs);
}

export function generateBoard(size: number, bombCount?: number): Board {
  const bombs = bombCount || getBaseBombsQuantityPerSize(size);
  const board = new Array(size).fill(null).map(() => createRow(size));
  setBombs(bombs, board);
  setBombsCount(board);
  return board;
}

export function getBoardWithOpenedCell(
  board: Board,
  { row, cell }: Coordinates
): Board {
  const updatedCell = { ...board[row][cell], isOpen: true };
  const updatedRow = [...board[row]];
  const updatedBoard = [...board];

  updatedRow[cell] = updatedCell;
  updatedBoard[row] = updatedRow;

  return updatedBoard;
}
export function isSafeCell({ countOfBombs, isBomb }: Cell) {
  return !isBomb && countOfBombs === 0;
}

export const getBoardForSafeCell = (
  board: Board,
  { row, cell }: Coordinates
): Board => {
  return [[0, 0]]
    .concat(surroundingCellsOffsets)
    .reduce((newBoard, [offsetY, offsetX]) => {
      const current = get(board, row + offsetY, cell + offsetX);

      if (current && !current.isBomb && !current.isOpen) {
        return getBoardWithOpenedCell(newBoard, {
          row: row + offsetY,
          cell: cell + offsetX,
        });
      }

      return newBoard;
    }, board);
};
