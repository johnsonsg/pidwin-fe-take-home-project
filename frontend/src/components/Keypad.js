import React, { useEffect, useState, useMemo, useCallback } from "react";

export default function Keypad({ usedKeys, onLetterClick }) {
  const [letters, setLetters] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const lettersVal = useMemo(
    () => [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
    ],
    []
  );

  // const rowKeys1 = lettersVal[0];
  // const rowKeys2 = lettersVal[1];
  // const rowKeys3 = lettersVal[2];

  // const rowKeys1 = lettersVal[0].map((key) => ({ key }));
  const rowKeys1 = useMemo(
    () => lettersVal[0].map((key) => ({ key })),
    [lettersVal]
  );
  const rowKeys2 = useMemo(
    () => lettersVal[1].map((key) => ({ key })),
    [lettersVal]
  );
  const rowKeys3 = useMemo(
    () => lettersVal[2].map((key) => ({ key })),
    [lettersVal]
  );

  useEffect(() => {
    setLetters(lettersVal.flat().map((key) => ({ key })));
  }, [setLetters, lettersVal]);

  const handleLetterClick = (key) => {
    setActiveKey(key);
    onLetterClick(key);
  };

  const handleMouseOver = (key) => {
    setActiveKey(key);
  };

  const handleMouseOut = () => {
    setActiveKey(null);
  };

  const handleKeyDown = useCallback(
    (event) => {
      const pressedKey = event.key.toLowerCase();
      if (lettersVal.flat().includes(pressedKey)) {
        setActiveKey(pressedKey);
        onLetterClick(pressedKey);
      }
    },
    [lettersVal, onLetterClick]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="keypad">
      {rowKeys1.map((l, index) => {
        const color = usedKeys[l.key];
        const isActive = activeKey === l.key;
        return (
          <div
            key={index}
            className={`${color} ${isActive ? "active" : ""} key`}
            onClick={() => handleLetterClick(l.key)}
            onMouseOver={() => handleMouseOver(l.key)}
            onMouseOut={handleMouseOut}
          >
            {l.key}
          </div>
        );
      })}
      {rowKeys2.map((l, index) => {
        const color = usedKeys[l.key];
        const isActive = activeKey === l.key;
        return (
          <div
            key={index}
            className={`${color} ${isActive ? "active" : ""} key`}
            onClick={() => handleLetterClick(l.key)}
            onMouseOver={() => handleMouseOver(l.key)}
            onMouseOut={handleMouseOut}
          >
            {l.key}
          </div>
        );
      })}
      {rowKeys3.map((l, index) => {
        const color = usedKeys[l.key];
        const isActive = activeKey === l.key;
        return (
          <div
            key={index}
            className={`${color} ${isActive ? "active" : ""} key`}
            onClick={() => handleLetterClick(l.key)}
            onMouseOver={() => handleMouseOver(l.key)}
            onMouseOut={handleMouseOut}
          >
            {l.key}
          </div>
        );
      })}
    </div>
  );
}
