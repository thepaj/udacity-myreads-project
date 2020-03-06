import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import BookList from './components/BookList';
import SearchBooks from './components/SearchBooks';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchedBooks: [],
      query: '',
    }

    this.getBookOnNewShelf = this.getBookOnNewShelf.bind(this);
    this.onUpdateShelf = this.onUpdateShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books: books
        })
      })
  }

  // the SEARCH part
  onBookSearch(event) {
    const query = event.target.value;

    // if query is not empty, calling API 
    if (query === '') {
      this.setState({
        searchedBooks: []
      })
    } else if (query !== '') {
      BooksAPI.search(query.trim())
        .then(results => {
          console.log(results);
          const mappedOverBooks = results
            .map(result => {
              this.state.books.forEach(book => {
                if (result.id === book.id) {
                  result.shelf = book.shelf;
                }
              })
              return result;
            })

          this.setState({ searchedBooks: mappedOverBooks });
        })
        .catch(() => {
          // in case of an error, setting state to empty array
          this.setState({
            searchedBooks: []
          })
        })
    }
  }

  // the UPDATE part
  onUpdateShelf(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(() => {
        console.log('update');
        this.getBookOnNewShelf();
      })
  }

  getBookOnNewShelf() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books: books
        })
      })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BookList
            updateShelf={this.onUpdateShelf}
            books={this.state.books}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            onChange={(event) => this.onBookSearch(event)}
            books={this.state.searchedBooks}
            updateShelf={this.onUpdateShelf}
          />
        )} />
      </div>
    )
  }
}

export default App;
