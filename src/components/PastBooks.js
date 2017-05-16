import React, { Component } from 'react';
import Book from './Book';

class PastBooks extends Component {
  render() {
    const pastBooks = this.props.books.filter(book => book.current !== true);
    let bookArray = pastBooks.map(book => {
      return (
        <Book book={book} description={false} key={book.key} />
      )
    })
    return (
      <ul className="past-books">
      	{ bookArray }
      </ul>
    );
  }
}

export default PastBooks;
