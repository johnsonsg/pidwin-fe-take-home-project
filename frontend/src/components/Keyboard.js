import React, { useCallback, useEffect, useContext, useMemo } from 'react'
import { BoardContext } from '../App'
import Key from './Key'


const Keyboard = () => {
  const { onEnterLetter, onDeleteLetter, onSelectLetter } = useContext(BoardContext)

  const keys1 = useMemo(() => ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], []);
  const keys2 = useMemo(() => ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], []);
  const keys3 = useMemo(() => ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], []);

  const handleKeyboard = useCallback((e) => {
    if (e.key === 'Enter') {
      onEnterLetter();
    } else if (e.key === 'Backspace') {
      onDeleteLetter();
    } else if (e.key.length === 1) {
      keys1.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      });
      keys2.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
					onSelectLetter(key)
				}
      });
      keys3.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
					onSelectLetter(key)
				}
      });
    } 
  }, [keys1, keys2, keys3, onDeleteLetter, onEnterLetter, onSelectLetter]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    };
  }, [handleKeyboard])

  return (
		<div className='keyboard' onKeyDown={handleKeyboard}>
			<div className='keyboard-rows'>
				{keys1.map((key) => (
					<Key keyVal={key} />
				))}
			</div>
			<div className='keyboard-rows'>
				{keys2.map((key) => (
					<Key keyVal={key}  />
				))}
			</div>
			<div className='keyboard-rows'>
				<Key keyVal={'ENTER'} bigKey />
				{keys3.map((key) => (
					<Key keyVal={key} />
				))}
				<Key keyVal={'DELETE'} bigKey />
			</div>
		</div>
	)
}

export default Keyboard
