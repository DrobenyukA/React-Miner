import logo from "./logo.svg";
import "./App.css";
import useDidMount from "./hooks/useDidMount";
import { generateBoard } from "./services/Board.service";

function App() {
  useDidMount(() => {
    console.table(
      generateBoard(10, 10).map((row) =>
        row.map(({ isBomb, countOfBombs }) => (isBomb ? "Bomb" : countOfBombs))
      )
    );
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
