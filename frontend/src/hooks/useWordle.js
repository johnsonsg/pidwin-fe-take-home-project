import { useState, useEffect } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const resetGame = () => {
    setTurn(0);
    setCurrentGuess("");
    setGuesses([...Array(6)]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
  };

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "red" };
    });

    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "red" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "red";
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("you used all your guesses!");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("you already tried that word.");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars.");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  useEffect((handleKeyDown) => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLetterClick = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyDown,
    handleLetterClick,
    resetGame,
    isDisabled: isCorrect || currentGuess.length !== 5,
  };
};

export default useWordle;
