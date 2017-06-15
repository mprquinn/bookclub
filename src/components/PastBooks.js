import React, { Component } from 'react';
import Book from './Book';

class PastBooks extends Component {
  render() {
    const pastBooks = this.props.books.filter(book => book.current !== true);
    const booksSorted = pastBooks.sort((bookA, bookB) => bookA.order > bookB.order ? -1 : 1);
    let bookArray = booksSorted.map(book => {
      console.log(book);
      return (
        <Book book={book} description={false} key={book.key} ratings={book.ratings} />
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
