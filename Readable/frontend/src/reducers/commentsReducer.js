import _ from 'lodash'

const comments = (state ={}, action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      return _.mapKeys( _.filter( action.comments , { deleted : false } ), 'id' );
    case 'ADD_COMMENT':
    case 'VOTE_COMMENT':
    case 'EDIT_COMMENT':
      return {
        ...state,
        [ action.comment.id ] : action.comment
      }
    case 'DELETE_COMMENT':
      return _.omit( state, action.id )
    default:
      return state;
  }
}

export default comments