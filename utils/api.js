import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS = 'flashcards'

//AsyncStorage.clear()

var data = {
  Animals: {
    title: 'Animals',
    questions: [
      {
        question: 'Dog',
        answer: 'Perro'
      },
      {
        question: 'Duck',
        answer: 'Pato'
      },
      {
        question: 'Cat',
        answer: 'Gato'
      },
      {
        question: 'Crab',
        answer: 'Congreja'
      }      
    ]
  },
  Food: {
    title: 'Food',
    questions: [
      {
        question: 'Rice',
        answer: 'Arroz'
      },
      {
        question: 'Onion',
        answer: 'Cebolla'
      },
      {
        question: 'Potato',
        answer: 'Papa'
      }
    ]
  }
}

export function getDecks( deck ){
  return AsyncStorage.getItem( MOBILE_FLASHCARDS )
  .then( decks  => {
      if ( decks == null ) {
        AsyncStorage.setItem( MOBILE_FLASHCARDS, JSON.stringify( data ))
        return JSON.stringify( data )
      } else {
        return JSON.parse( decks )
      }
  })
}


export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem( MOBILE_FLASHCARDS, JSON.stringify({ 
    [ title ] : { "title" : title, "questions": [] }}))
}

export function addCardToDeck( title, card ){
  AsyncStorage.getItem( MOBILE_FLASHCARDS )
  .then( decks  => {
      deck = JSON.parse( decks )
      //console.log( "beforeAdd", decks )
      deck[ title ].questions.push( card )
      AsyncStorage.setItem( MOBILE_FLASHCARDS, JSON.stringify( deck ) )
      //console.log( "addCard", deck )
      return deck
  })
}