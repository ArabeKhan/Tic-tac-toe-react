import React, { useState } from "react";
import Board from "./board";
import { calculateWinner } from "./func";

const Game = () => {
  const [gameHsitory, setGameHsitory] = useState([
    { squares: Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const history = gameHsitory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setGameHsitory(history.concat([{ squares }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  const history = gameHsitory;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const move = history.map((step, move) => {
    const decs = move ? "Go to your move" + move : "Go to start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{decs}</button>
      </li>
    );
  });

  let status = "";
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next Player : " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <h1>Game Board</h1>
        <Board onClick={handleClick} squares={current.squares} />

        <div className="game-info">
          <div>{status}</div>
          <ol>{move}</ol>
        </div>
      </div>
    </div>
  );
};

export default Game;
