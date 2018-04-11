import { combineReducers } from 'redux'
import decks from './deckReducer'

const appReducer = combineReducers({
	decks
})

export default appReducer