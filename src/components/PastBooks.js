import React, { Component } from 'react';
import Book from './Book';

class PastBooks extends Component {
  render() {
    let bookArray = this.props.books.map(book => {
      return (
        <Book book={book} />
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
