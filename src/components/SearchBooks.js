import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class SearchBooks extends Component {
    render() {
        const { books } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.props.onChange}
                        />
                        <ol className="books-grid">
                            <Bookshelf
                                bookshelfTitle={'Search Results'}
                                books={books}
                                updateShelf={this.props.updateShelf}
                            />
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks;