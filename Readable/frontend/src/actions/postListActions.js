import * as ServerAPI from '../ServerApi/ServerAPI'

export function gotPostsForCategories( posts ){
  return {
  	type: 'GET_POSTS_CATEGORY',
  	posts
  }
}

export function getPostsCategories( category ){
    if( category === "all" ) {
        return ( dispatch ) =>  { ServerAPI.getAllPosts()
             .then( (data )=> dispatch(gotPostsForCategories( JSON.parse( data ) )))
             
        }
    } else {
        return ( dispatch ) =>  { ServerAPI.getCategoryPosts( category )
             .then( (data )=> dispatch(gotPostsForCategories( JSON.parse( data ) )))
        }
    }
}

export function gotPost( post ){
  return {
  	type: 'GET_POST',
  	post
  }
}

export function getPost( id ){
	return ( dispatch ) =>  { ServerAPI.getPost( id )
    		.then( (data )=> dispatch(gotPost( JSON.parse( data ) )))
         }

}

export function addedPost( post ){
  // Creating this for future use if needed
  return {
  	type: 'CREATE_POST',
  	post
  }
}
export function addPost( post ){
	return ( dispatch ) =>  { ServerAPI.addPost( post )
    		.then( (data )=> dispatch(addedPost( JSON.parse( data ) )))
         }
}

export function votedPost( post ){
  return {
  	type: 'VOTE_POST',
  	post
  }
}
export function votePost( id, vote ){
	return ( dispatch ) =>  { ServerAPI.votePost( id, vote )
    		.then( (data )=> dispatch(votedPost( JSON.parse( data ) )))
         }
}

export function deletedPost( id ){
  return {
  	type: 'DELETE_POST',
  	id
  }
}

export function deletePost( id ){
	return ( dispatch ) =>  { ServerAPI.deletePost( id )
    		.then( (data )=> dispatch(deletedPost(id)))
         }
}

export function editedPost( post ){
  return {
  	type: 'EDIT_POST',
  	post
  }
}

export function editPost( id, data ){
	return ( dispatch ) =>  { ServerAPI.editPost( id, data)
    		.then( (data )=> dispatch(editedPost(data)))
         }
}
