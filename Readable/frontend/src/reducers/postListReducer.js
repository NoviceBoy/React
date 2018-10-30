import _ from 'lodash'

const posts = (state = {}, action) => {
  switch( action.type ) {
    case 'GET_POSTS_CATEGORY':
      return _.mapKeys( _.filter( action.posts, { deleted : false } ) , 'id' );
    case 'GET_POST':
    case 'CREATE_POST':
    case 'VOTE_POST':
    case 'EDIT_POST':
      return {
        ...state,
        [ action.post.id ] : action.post
      }
    case 'DELETE_POST':
      return _.omit( state, action.id )
    default:
      return state;
  }
}

export default posts