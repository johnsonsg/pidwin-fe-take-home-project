import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FiDelete } from "react-icons/fi";
import { MdKeyboardReturn } from "react-icons/md";

export default function Keypad({ usedKeys, onLetterClick, onEnterClick, onDeleteClick }) {
  // eslint-disable-next-line no-unused-vars
  const [lettersVal, setLettersVal] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const letters = useMemo(
    () => [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
      ["enter"],
      ["backspace"],
    ],
    []
  );

  const rowKeys1 = useMemo(
    () => letters[0].map((key) => ({ key, color: usedKeys[key] })),
    [letters, usedKeys]
  );

  const rowKeys2 = useMemo(
    () => letters[1].map((key) => ({ key, color: usedKeys[key] })),
    [letters, usedKeys]
  );

  const rowKeys3 = useMemo(
    () => letters[2].map((key) => ({ key, color: usedKeys[key] })),
    [letters, usedKeys]
  );

  const enter = useMemo(
    () => letters[3].map((key) => ({ key, color: usedKeys[key] })),
    [letters, usedKeys]
  );

  const backspace = useMemo(
    () => letters[4].map((key) => ({ key, color: usedKeys[key] })),
    [letters, usedKeys]
  );

  const handleLetterClick = (key) => {
    console.log("🚀 ~ handleLetterClick ~ key:", key)
    if (key === "enter") {
      onEnterClick();
    } else if (key === "backspace") {
      onDeleteClick();
    }
    else {
      setActiveKey(key);
      onLetterClick(key);
    }
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

      if (pressedKey === "backspace") {
        const lastNonEmptyIndex = letters.reduceRight(
          (acc, row) => acc !== null ? acc : row.findIndex((key) => key !== null),
          null
        );

        if (lastNonEmptyIndex !== null) {
          const rowToEdit = letters.find((row) => row[lastNonEmptyIndex] !== null);

          const lastNonEmptyElement = rowToEdit.reduceRight(
            (acc, element, index) => acc !== null ? acc : (element !== null ? index : null),
            null
          );

          const updatedRow = [...rowToEdit];
          updatedRow[lastNonEmptyElement] = null;

          setLettersVal((prev) => {
            const updatedVal = [...prev];
            updatedVal[letters.indexOf(rowToEdit)] = updatedRow;
            return updatedVal;
          });
        }
      } else if (letters.flat().includes(pressedKey)) {
        setActiveKey(pressedKey);
        onLetterClick(pressedKey);
      }
    },
    [letters, onLetterClick]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setLettersVal(letters.flat().map((key) => ({ key })));
  }, [letters]);

  return (
    <>
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
      </div>
      <div className="keypad">
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
      </div>
      <div className="keypad">
        {enter.map((l, index) => {
          const color = usedKeys[l.key];
          const isActive = activeKey === l.key;
          return (
            <div
              id="bigKey"
              key={index}
              className={`${color} ${isActive ? "active" : ""} key`}
              onClick={() => handleLetterClick(l.key)}
              onMouseOver={() => handleMouseOver(l.key)}
              onMouseOut={handleMouseOut}
            >
               { l.key === "enter" ? <MdKeyboardReturn /> : null }
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
        {backspace.map((l, index) => {
          const color = usedKeys[l.key];
          const isActive = activeKey === l.key;
          return (
            <div
              id="bigKey"
              key={index}
              className={`${color} ${isActive ? "active" : ""} key`}
              onClick={() => handleLetterClick(l.key)}
              onMouseOver={() => handleMouseOver(l.key)}
              onMouseOut={handleMouseOut}
            >
              { l.key === "backspace" ? <FiDelete /> : null }
            </div>
          );
        })} 
      </div>
    </>
  );
}
