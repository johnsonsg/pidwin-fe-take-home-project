import { createContext, useState } from 'react';
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import GuessWord from './components/GuessWord';
import { boardDefault } from './components/Words'
import './App.css'

export const BoardContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  })

  // TODO: Replace this and call from backend api.
  const correctWord = "GAMES";

  const onSelectLetter = (keyVal) => {
		if (currentAttempt.letterPosition > 4) return
		const currentBoard = [...board]
		currentBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyVal
		setBoard(currentBoard)
		setCurrentAttempt({
			...currentAttempt,
			letterPosition: currentAttempt.letterPosition + 1,
		})
	}

  const onDeleteLetter = () => {
    if (currentAttempt.letterPosition === 0) return
		const currentBoard = [...board]
		currentBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = ''
		setBoard(currentBoard)
		setCurrentAttempt({
			...currentAttempt,
			letterPosition: currentAttempt.letterPosition - 1,
		})
  }

  const onEnterLetter = () => {
    if (currentAttempt.letterPosition !== 5) return
		setCurrentAttempt({
			attempt: currentAttempt.attempt + 1,
			letterPosition: 0,
		})
  }

	return (
		<div>
			<nav> 
				<h1>Wordle</h1>
			</nav>
			<BoardContext.Provider value={{ 
        board, 
        setBoard, 
        currentAttempt, 
        setCurrentAttempt,
        onSelectLetter,
        onDeleteLetter,
        onEnterLetter, 
        correctWord,
      }}>
				<div className='game-container'>
					<Board />
          <GuessWord />
					<Keyboard />
				</div>
			</BoardContext.Provider>
		</div>
	)
}

export default App
