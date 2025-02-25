import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyDown,
    handleLetterClick,
    isDisabled,
    resetGame,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const handleGuessWord = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/word?guess=${currentGuess}`
      );

      if (!response.ok) {
        throw new Error("Network error or API issue");
      }

      const data = await response.json();
      console.log(data);

      if (data.result === "11111") {
        console.log("You win!");
        setHasWon(true);
        data.result = "You win!";
      } else if (data.result.includes("1")) {
        console.log("Almost there! Keep guessing!");
      } else {
        console.log("You lose!");
        data.result = "You lose!";
      }

      handleKeyDown({ key: "Enter" });
    } catch (error) {
      console.error("Error making API call:", error.message);
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    setHasWon(false);
    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 1000);
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, isCorrect, turn]);

  return (
    <div className="game-container">
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
	  <div style={{
		display: 'block',
		margin: '48px auto',
	  }}>
		<button
			onClick={handleGuessWord}
			className={`guess-word-button ${isDisabled ? `disabled` : ``} ${
			hasWon || isCorrect ? `winning` : ``
			}`}
		>
			Guess Word
		</button>
	  </div>
      <Keypad 
	  usedKeys={usedKeys} 
	  onLetterClick={handleLetterClick} 
	  onEnterClick={handleGuessWord} 
	  onDeleteClick={() => handleKeyDown({ key: "Backspace" })}
	  />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
