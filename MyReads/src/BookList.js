import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  updateBookShelf = () => {
  	this.props.onShelfChange()
  }

  render() {
    const { books, shelf, _ } = this.props

    return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
      <ol className="books-grid">
           { books.map((book) => (
		   		<Book 
      	   			book={ book }
                    onUpdateChange={ this.updateBookShelf }
      	   		/>
      	   ))}
       </ol>
	  </div>
	</div>
    )
  }
}

export default BookList
