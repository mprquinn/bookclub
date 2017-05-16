import React, { Component } from 'react';
import Book from './Book';

class CurrentBookContainer extends Component {

  render() {

    const currentBook = this.props.books.filter(book => (book.current === true));
    let cleanRatings = [];

    if (currentBook[0] !== undefined) {
      const ratings = currentBook[0].rated
      cleanRatings = Object.keys(ratings).map(key => parseInt(ratings[key], 10));

    }

    return (
      <div className="current-book-wrapper">
        { currentBook[0] !== undefined ? (
          <Book book={currentBook[0]} description={true} rate={true} ratings={cleanRatings} authenticated={this.props.authenticated} />
        ) : (
          <p>Loading, please wait</p>
        )
        }
      </div>
    );
  }
}

export default CurrentBookContainer;