import { Board, Cell, Coordinates } from "../types/Game";

function getBombsQuantityPerSize(size: number): number {
  const percentsOfBombs = 15 / 100;
  return Math.floor(size * size * percentsOfBombs);
}

function getCell(isBomb = false, isOpened = false, countOfBombs = 0): Cell {
  return { isBomb, isOpened, countOfBombs };
}

function getRow(size: number): Cell[] {
  return new Array(size).fill(null).map(() => getCell());
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
  const top = get(board, row - 1, cell);
  const topRight = get(board, row - 1, cell + 1);
  const right = get(board, row, cell + 1);
  const bottomRight = get(board, row + 1, cell + 1);
  const bottom = get(board, row + 1, cell);
  const bottomLeft = get(board, row + 1, cell - 1);
  const left = get(board, row, cell - 1);
  const topLeft = get(board, row - 1, cell - 1);
  return [
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft,
    left,
    topLeft,
  ].filter((cell) => !!cell) as Cell[];
}

function countBombs(board: Board, coords: Coordinates): number {
  return getSurroundingCells(board, coords).reduce(
    (acc, item) => (item.isBomb ? (acc += 1) : acc),
    0
  );
}

function setBombs(count: number, board: Board) {
  if (count !== 0) {
    const { row, cell } = getCellCoordinates(board);
    board[row][cell] = { ...board[row][cell], isBomb: true, countOfBombs: 0 };
    setBombs(count - 1, board);
  }
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

export function generateBoard(size: number, bombCount?: number): Board {
  const bombs = bombCount || getBombsQuantityPerSize(size);
  const board = new Array(size).fill(null).map(() => getRow(size));
  setBombs(bombs, board);
  setBombsCount(board);
  return board;
}
