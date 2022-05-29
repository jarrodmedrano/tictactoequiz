import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";

// notice properties takeTurn and id are being passed in
const Square = ({ takeTurn, id, player }) => {
  console.log("Square re-rendering now.");
  const palet = ["blue", "red", "green"];
  // id is the square's number
  // We call takeTurn to tell Parent we have clicked in this square

  const [color, setColor] = React.useState(2);

  return (
    <button
      id={id}
      onClick={(e) => {
        setColor(takeTurn(id));
        e.preventDefault();
        e.target.style.background = palet[color];
      }}
    ></button>
  );
};

const Board = () => {
  // 1st player is 1
  // State keeps track of next player
  const [player, setPlayer] = React.useState(1);
  console.log("Board re-rendering now.");

  // check for winner (see superset.js)
  let status = `Player ${player}`;
  console.log(`Status Player ${status}`);

  // Note that Child (Square Component) calls this function
  // However the function has access to the player held here
  const takeTurn = (id) => {
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i, color) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i} player={player}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div id="info">
        <h1>{status}</h1>
        <button onClick={() => takeTurn()}> Change Player</button>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

const root = createRoot(document.getElementById("root"));
root.render(<Game />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
