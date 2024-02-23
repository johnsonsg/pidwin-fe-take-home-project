import React, { useContext } from 'react'
import { BoardContext } from '../App'

const Key = ({ keyVal, bigKey }) => {
	const {
		onSelectLetter,
		onDeleteLetter,
		onEnterLetter,
	} = useContext(BoardContext)

	const selectLetter = () => {
    if (keyVal === 'ENTER') {
      onEnterLetter()
    } else if (keyVal === 'DELETE') {
      onDeleteLetter()
    } else {
      onSelectLetter(keyVal)
    }
	}

	return (
		<div className='key' id={bigKey && 'big'} onClick={selectLetter}>
			{keyVal}
		</div>
	)
}

export default Key
