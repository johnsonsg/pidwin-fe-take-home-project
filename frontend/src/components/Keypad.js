import React, { useEffect, useState, useMemo, useCallback } from 'react'

export default function Keypad({ usedKeys, onLetterClick }) {
	const [letters, setLetters] = useState(null)
	const [activeKey, setActiveKey] = useState(null)

	const keys1 = useMemo(() => ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], [])
	const keys2 = useMemo(() => ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], [])
	const keys3 = useMemo(() => ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], [])

	const lettersVal = useMemo(() => [keys1, keys2, keys3], [keys1, keys2, keys3])

	useEffect(() => {
		setLetters(lettersVal.flat().map((key) => ({ key })))
	}, [setLetters, lettersVal])

	const handleMouseOver = useCallback(
		(key) => {
			setActiveKey(key)
		},
		[setActiveKey]
	)

	const handleMouseOut = useCallback(() => {
		setActiveKey(null)
	}, [setActiveKey])

	const handleLetterClick = useCallback(
		(event) => {
			const pressedKey = event.toLowerCase()
			console.log('Pressed Key:', pressedKey)

			setActiveKey(pressedKey)
			onLetterClick(pressedKey)
		},
		[onLetterClick]
	)

	// create a keyboard from the keys
	useEffect(() => {
		const keyboard = [keys1, keys2, keys3]

		setLetters(
			keyboard.map((row, i) => (
				<div key={i} className='keypad'>
					{row.map((key, index) => {
						const isActive = activeKey === key
						console.log('🚀 ~ {row.map ~ isActive:', isActive)
						const color = usedKeys[key]
						return (
							<div
								key={index}
								className={`${color} ${isActive ? 'active' : ''} key`}
								onClick={() => handleLetterClick(key)}
								onMouseOver={() => handleMouseOver(key)}
								onMouseOut={handleMouseOut}
							>
								{key}
							</div>
						)
					})}
				</div>
			))
		);
	}, [
		keys1,
		keys2,
		keys3,
		usedKeys,
		activeKey,
		handleLetterClick,
		handleMouseOver,
		handleMouseOut,
	])

	return <div>{letters}</div>
}
