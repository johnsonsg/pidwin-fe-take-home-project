import React, { useEffect, useState, useMemo, useCallback } from 'react';

export default function Keypad({ usedKeys, onLetterClick }) {
  const [letters, setLetters] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const lettersVal = useMemo(
		() => [
			['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
			['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
			['z', 'x', 'c', 'v', 'b', 'n', 'm'],
		],
		[]
	)

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
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className='keypad'>
      {letters &&
        letters.map((l, index) => {
          const color = usedKeys[l.key];
          const isActive = activeKey === l.key;
          return (
            <div
              key={index}
              className={`${color} ${isActive ? 'active' : ''} key`}
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
