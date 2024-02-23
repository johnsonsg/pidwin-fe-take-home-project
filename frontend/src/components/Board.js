import React from 'react'
import Letter from './Letter'
import { boardDefault } from './Words'

const Board = () => {
	const renderRows = () => {
		return boardDefault.map((row, rowIndex) => (
			<div key={rowIndex} className='row'>
				{row.map((letter, letterIndex) => (
					<Letter
						key={letterIndex}
						letterPos={letterIndex}
						attemptVal={rowIndex}
						value={letter} // Pass the actual letter value to Letter component
					/>
				))}
			</div>
		))
	}

	return <div className='board'>{renderRows()}</div>
}

export default Board
