import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import { Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BookApp extends Component {
  state = {
    books : [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      	this.setState({ books: books, 
                        currentlyReadingBooks: books.filter((book) => book.shelf === "currentlyReading" ),
    					wantToReadBooks: books.filter((book) => book.shelf === "wantToRead" ),
    					readBooks: books.filter((book) => book.shelf === "read" ),
  			})
    })
  }

  componentDidMount() {
	this.getAllBooks()
  }

  componentWillReceiveProps(){
  	this.getAllBooks()
  }

  updateBookShelf = () => {    
    this.getAllBooks()
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={({history }) => (
          <div>
           <div className="list-books">
           <div className="list-books-title">
                <h1>MyReads</h1>
           </div>
          <BookList
            books={ this.state.currentlyReadingBooks }
			shelf="Currently Reading"
			onShelfChange={ this.updateBookShelf }
          />
          <BookList
            books={ this.state.wantToReadBooks }
			shelf="Want To Read"
			onShelfChange={ this.updateBookShelf }
          />
          <BookList
            books={ this.state.readBooks }
			shelf="Read"
			onShelfChange={ this.updateBookShelf }
          />
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
		 </div>
		</div>
        )}/>
        <Route exact path='/search' render={({ history }) => (
          <SearchBooks
          	books={[]}
            shelfBooks={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BookApp;