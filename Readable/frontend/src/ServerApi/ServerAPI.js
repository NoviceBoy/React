const url = `${process.env.REACT_APP_BACKEND}` || 'http://localhost:3001' ;

const params = { headers: {'Authorization': 'whatever-you-want'}, credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true  }

export const getAllPosts = () =>
    fetch(`${url}/posts`, params )
      .then( (res) => res.text())
      .then((data) => { return data }) 

export const getComments = ( id ) =>
    fetch(`${url}/posts/${id}/comments`, params )
      .then( (res) => res.text())
      .then((data) => { return data }) 

export const getCategoryPosts = ( category ) =>
    fetch(`${url}/${category}/posts`, params )
      .then( (res) => res.text())
      .then((data) => { return data }) 

export const getPost = ( id ) =>
    fetch(`${url}/posts/${id}`, params )
      .then( (res) => res.text())
      .then((data) => { return data}) 

export const getAllCategories = () => 
    fetch(`${url}/categories`, params )
      .then( (res) => res.text())
      .then((data) => { return data }) 

export const addPost = ( post ) => 
    fetch(`${url}/posts`, { method: 'POST', 
                           headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                           credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                           body: JSON.stringify( post ) })
      .then( (res) => res.text())
      .then((data) => {return data}) 

export const addComment = ( comment ) => 
    fetch(`${url}/comments`, { method: 'POST', 
                              headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                              credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                              body: JSON.stringify( comment ) })
      .then( (res) => res.text())
      .then((data) => { return data} ) 

export const votePost = ( id, vote  ) => 
    fetch(`${url}/posts/${id}`, { method: 'POST', 
                                 headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                                 credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                                 body: JSON.stringify( {option: vote } ) })
      .then( (res) => res.text())
      .then((data) => { return data}) 

export const voteComment = ( id, vote  ) => 
    fetch(`${url}/comments/${id}`, { method: 'POST', 
                                    headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                                    credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                                    body: JSON.stringify( {option: vote } ) })
      .then( (res) => res.text())
      .then((data) => { return data}) 

export const deletePost = ( id ) => 
    fetch(`${url}/posts/${id}`, { method: 'DELETE', 
                                 headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                                 credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                                 body: JSON.stringify( {} ) })
      .then( (res) => res.text())
      .then((data) => { return data}) 

export const deleteComment = ( id ) => 
    fetch(`${url}/comments/${id}`, { method: 'DELETE', 
                                    headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                                    credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                                    body: JSON.stringify( {} ) })
      .then( (res) => res.text())
      .then((data) => { return data }) 

export const editPost = ( id, post ) => 
    fetch(`${url}/posts/${id}`, { method: 'PUT', 
                                 headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                                 credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                                 body: JSON.stringify(post)  })
      .then( (res) => res.text())
      .then((data) => { return JSON.parse(data) }) 

export const editComment = ( id, comment ) => 
    fetch(`${url}/comments/${id}`, { method: 'PUT', 
                                    headers : {'Authorization': 'whatever-you-want', 'Content-type': 'application/json'},
                                    credentials: `${process.env.REACT_APP_BACKEND}`? 'include' : true ,
                                    body: JSON.stringify(comment) })
      .then( (res) => res.text())
      .then((data) => { return JSON.parse( data ) }) 

