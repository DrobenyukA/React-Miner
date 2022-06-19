import { useCallback, useEffect, useState } from "react";

import { Board, Cell, Coordinates } from "../../types/Game";
import Column from "../Column";
import {
  getBoardWithOpenedCell,
  getBoardForSafeCell,
  isSafeCell,
} from "../../services/Board.service";

interface Props {
  board: Board;
  onGameOver: () => void;
}

const Game = ({ onGameOver, ...props }: Props) => {
  const [board, setBoard] = useState<Board>(props.board);

  const handleCellClick = useCallback(
    (cell: Cell, coords: Coordinates) => {
      if (cell.isBomb) {
        alert("Game Over");
        return onGameOver();
      }

      if (!isSafeCell(cell)) {
        return setBoard((prevBoard) =>
          getBoardWithOpenedCell(prevBoard, coords)
        );
      }

      setBoard((prevBoard) => getBoardForSafeCell(prevBoard, coords));
    },
    [onGameOver]
  );

  useEffect(() => {
    setBoard(props.board);
  }, [props.board]);

  return (
    <table>
      <tbody>
        <tr>
          <th>||</th>
          {board.map((_, cellIndex) => (
            <th key={cellIndex.toString()}>{cellIndex}</th>
          ))}
        </tr>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex.toString()}>
            <th>{rowIndex}</th>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex.toString()}>
                <Column
                  data={cell}
                  coords={{ row: rowIndex, cell: cellIndex }}
                  onClick={handleCellClick}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Game;
