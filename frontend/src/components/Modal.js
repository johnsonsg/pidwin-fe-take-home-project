import React from "react";

export default function Modal({ isCorrect, turn, onPlayAgain }) {
  return (
    <div className="modal">
      {isCorrect ? (
        <div>
          <h1>You Win!</h1>
          <p className="solution">Congratulations!</p>
          <p>You found the solution in {turn} guesses :)</p>
          <button onClick={onPlayAgain}>Play again</button>
        </div>
      ) : (
        <div>
          <h1>Nevermind</h1>
          <p className="solution">Yikes!</p>
          <p>Better luck next time :)</p>
          <button onClick={onPlayAgain}>Play again</button>
        </div>
      )}
    </div>
  );
}
