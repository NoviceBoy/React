import { getDecks, saveDeckTitle, addCardToDeck } from '../utils/api';

export function addedDeck( deck ){
	return {
		type: 'ADD_DECK',
		deck
	}
}

export function gotDecks( decks ){
	return {
		type: 'GET_DECKS',
		decks
	}
}

export function addedCardToDeck( data ){
	return {
		type: 'ADD_CARD',
		data
	}
}

export function fetchAllDecks() {
	return (dispatch) => {
		getDecks().then(data => dispatch( gotDecks( data ) ))
	}
}

export function addToDecks( deck ){
	return ( dispatch ) => {
		saveDeckTitle( deck )
		dispatch( addedDeck( deck ) )
	}
}

export function saveCardToDeck( title, card ){
	return ( dispatch ) => {
		addCardToDeck( title, card )
		console.log( "Save", title, card )
		dispatch( addedCardToDeck( { title, card } ))
	}
}