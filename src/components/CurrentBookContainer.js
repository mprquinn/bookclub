import React, { Component } from 'react';
import Book from './Book';

class CurrentBookContainer extends Component {
  render() {
    const currentBook = this.props.books.filter(book => (book.current === true));

    return (
      <div>
        { currentBook[0] !== undefined ? (
          <Book book={currentBook[0]} description={true} rate={true} />
        ) : (
          <p>Loading, please wait</p>
        )
        }
      </div>
    );
  }
}

export default CurrentBookContainer;