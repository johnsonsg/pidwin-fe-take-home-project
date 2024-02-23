import React, { useContext} from 'react';
import { BoardContext } from '../App';


const Letter = ({ letterPos, attemptVal }) => {
	const { board, correctWord, currentAttempt } = useContext(BoardContext)
	const letter = board[attemptVal][letterPos]

	const correct = correctWord[letterPos] === letter
	const almost = !correct && letter !== '' && correctWord.includes(letter)

	const letterState =
		currentAttempt.attempt > attemptVal &&
		(correct ? 'correct' : almost ? 'almost' : 'incorrect')

	return (
		<div className='letter' id={letterState}>
			{letter}
		</div>
	)
}

export default Letter
 