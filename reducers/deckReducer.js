const decks = (state = {}, action) => {
  switch (action.type) {
  	case 'GET_DECKS':
  		//console.log( state )
  		return action.decks
  	case 'ADD_DECK':
  		//console.log( state )
  		return { ...state, 
  			[ action.deck ] : { "title" : action.deck, "questions": [] }
  		};
  	case 'ADD_CARD':
  		//console.log( state )
  		const { question, answer } = action.data.card
  		const deck = action.data.title
  		return { ...state, 
  			[ deck ] : {
  				...state[ deck ],
  				questions : [ ...state[ deck ].questions,  { question, answer }]
  			}
  		};
	default :
		return state
  }
}

export default decks