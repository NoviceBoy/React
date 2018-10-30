import * as ServerAPI from '../ServerApi/ServerAPI'

export function gotCategories( categories ){
  return {
  	type: 'GET_CATEGORIES',
  	categories
  }
}

export function getCategories(){
  return ( dispatch ) =>  { ServerAPI.getAllCategories()
    .then( (data ) => dispatch(gotCategories( JSON.parse( data )["categories"] )))
   };
}

