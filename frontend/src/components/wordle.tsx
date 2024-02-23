import React, { useState, useEffect } from 'react';

const secretWord = 'REACT'; // Replace with your own secret word

const Wordle: React.FC = () => {
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value.toUpperCase());
  };

  const handleGuess = () => {
    if (guess.length === secretWord.length) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      const newCorrectLetters = Array.from(new Set([...correctLetters, ...getCorrectLetters()]));
      setCorrectLetters(newCorrectLetters);

      if (newCorrectLetters.length === secretWord.length) {
        setGameOver(true);
      }
    }
  };

  const getCorrectLetters = (): string[] => {
    const correctLetters: string[] = [];
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord.includes(guess[i])) {
        correctLetters.push(guess[i]);
      }
    }
    return correctLetters;
  };

  const renderWord = (): JSX.Element[] => {
    return secretWord.split('').map((letter, index) => (
      <span key={index} className={correctLetters.includes(letter) ? 'correct' : ''}>
        {correctLetters.includes(letter) ? letter : '_'}
      </span>
    ));
  };

  const restartGame = () => {
    setGuess('');
    setAttempts(0);
    setCorrectLetters([]);
    setGameOver(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleGuess();
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, [guess, handleGuess]);

  return (
    <div className="wordle-container">
      <h1>Wordle Game</h1>
      <div className="word-display">{renderWord()}</div>
      <div className="input-container">
        <input
          type="text"
          maxLength={secretWord.length}
          value={guess}
          onChange={handleInputChange}
          disabled={gameOver}
        />
        <button onClick={handleGuess} disabled={gameOver}>
          Guess
        </button>
      </div>
      <div className="attempts">Attempts: {attempts}</div>
      {gameOver && (
        <div className="game-over">
          <p>Congratulations! You guessed the word.</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Wordle;
