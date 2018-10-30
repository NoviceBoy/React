import * as ServerAPI from '../ServerApi/ServerAPI'

export function gotComments( comments, id ){
  return {
  	type: 'GET_COMMENTS',
  	comments, 
    id
  }
}

export function getComments( id ){
  return ( dispatch ) =>  { ServerAPI.getComments( id )
    .then( (data ) => dispatch(gotComments( JSON.parse( data ), id )))
   };
}

export function addedComment( comment ){
  return {
  	type: 'ADD_COMMENT',
  	comment
  }
}
export function addComment( comment ){
  return ( dispatch ) =>  { ServerAPI.addComment( comment )
    .then( (data ) => dispatch(addedComment( JSON.parse( data ))))
   };
}

export function votedComment( comment ){
  return {
  	type: 'VOTE_COMMENT',
  	comment
  }
}
export function voteComment( id, vote ){
  return ( dispatch ) =>  { ServerAPI.voteComment( id, vote )
    .then( (data ) => dispatch(votedComment( JSON.parse( data ))))
   };
}

export function deletedComment( id, parentId ){
  return {
  	type: 'DELETE_COMMENT',
  	id,
    parentId
  }
}
export function deleteComment( id, parentId ){
  return ( dispatch ) =>  { ServerAPI.deleteComment( id )
    .then( (data ) => dispatch(deletedComment( id, parentId )))
   };
}

export function editedComment( comment ){
  return {
  	type: 'EDIT_COMMENT',
  	comment
  }
}
export function editComment( id, comment  ){
  return ( dispatch ) =>  { ServerAPI.editComment( id, comment )
    .then( (data ) => dispatch(editedComment( data )))
   };
}