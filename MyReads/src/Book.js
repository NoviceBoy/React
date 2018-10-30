import React, { Component } from 'react';

import * as BooksAPI from './BooksAPI'

class Book extends Component {
  updateBook = ( book, shelf ) => {    
    BooksAPI.update(book, shelf).then((books) => {
      console.log( "Updated Book" );
    });
    if ( this.props.onUpdateChange ){
    	this.props.onUpdateChange()
    }
  }

  render(){
    const { book, _ } = this.props
    return(
    <li key={ book.id } className='book-list-item'>
      <div className="book">
      <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
      </div>
      <div className="book-shelf-changer">
      <select value={ book.shelf } onChange={(event) => this.updateBook( book , event.target.value )}>
      <option disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
      </select>
      </div>
      </div>
      <div className="book-title">{ book.title } </div>
      <div className="book-authors">{ book.authors } </div>
      </div>
    </li>
	)
  }
}

export default Book