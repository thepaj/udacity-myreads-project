import React, { Component } from 'react';

class Bookshelf extends Component {
    render() {
        const { bookshelfType, books, bookshelfTitle } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter((book) => (book.shelf === bookshelfType)).map((book) =>
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                value={book.shelf}
                                                onChange={(event) => this.props.updateShelf(book, event.target.value)}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.author}</div>
                                </div>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf;