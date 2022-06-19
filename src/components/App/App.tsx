import { useCallback, useState } from "react";
import useDidMount from "../../hooks/useDidMount";
import { generateBoard } from "../../services/Board.service";
import { Board } from "../../types/Game";
import Game from "../Game";

function App() {
  const [gameBoard, setGameBoard] = useState<Board>([]);

  const handleGameOver = useCallback(() => setGameBoard(generateBoard(40)), []);

  useDidMount(() => {
    setGameBoard(generateBoard(40));
  });

  return <Game board={gameBoard} onGameOver={handleGameOver} />;
}

export default App;
