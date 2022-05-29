import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";

const Square = ({ takeTurn, id }) => {
  const mark = ["O", "X", "+"];
  // id is the square's number
  // filled tells you if square has been filled
  // tik tells you symbol in square (same as player)
  // call takeTurn to tell Parent the square is  filled
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

  // Step 1: Move the mounted state & toggle from the board component to here
  const [mounted, setMounted] = React.useState(true);
  const toggle = () => setMounted(!mounted);

  // Step 2: Check to see if the mounted state is false. If it is we want to return null instead of returning the button

  return mounted ? (
    // Step 3: Trigger toggle() when button is clicked
    <button
      // DO NOT DELETE THIS id
      id={`square-button-${id}`}
      onClick={() => {
        toggle();
        setTik(takeTurn(id));
        setFilled(true);
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
  ) : null;
};

const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  // const [mounted, setMounted] = React.useState(true);
  const [gameState, setGameState] = React.useState([]);

  // const toggle = () => setMounted(!mounted);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      {/* <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <h1>{status}</h1>
      </div> */}
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
