import _ from 'lodash'
const count= (state ={}, action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      var filteredComments = _.filter( action.comments , { deleted : false } )
	  return { ...state,
				[ action.id ] : _.size( filteredComments ) 
             }
    case 'DELETE_COMMENT':
	  const nextState = { ...state }
      nextState[ action.parentId ] = nextState[ action.parentId ] - 1
      return nextState
    default:
      return state;
  }
}

export default count