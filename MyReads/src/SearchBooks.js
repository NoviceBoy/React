import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {
    query: '',
    results: []
  }

  getBooks = (query ) => {
    BooksAPI.search( query, 16 ).then((books) => {
        if( books ) {
          books = books.map((book) => {
            var onShelf = this.props.shelfBooks.find( (item )=> { return item.id === book.id} );
            book.shelf = onShelf ? onShelf.shelf : "none";
            return book;
          });
      	  this.setState({ results: books })
        }
    })
  }

  updateQuery = (text) => {
    text = text.trim()
    this.setState({ query: text })
    if( text === '' ) {
      this.setState({ results: [] })
      return
    }
    this.getBooks( text )
  }

  render() {
    const { query, _ } = this.state

    return (
          <div className="search-books">
            <div className="search-books-bar">
      		  <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
      			  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}/>
				</div>
				</div>
            	<div className="search-books-results">
              	<ol className="books-grid">
					{ this.state.results.length > 0 &&
						 this.state.results.map((book) => (
                                <Book
                                    book={ book }
                                />
                           ))
                      }
					</ol>
				</div>
	 </div>
    )
  }
}

export default SearchBooks