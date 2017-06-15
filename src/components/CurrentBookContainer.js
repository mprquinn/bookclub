import React, { Component } from 'react';
import Book from './Book';

class CurrentBookContainer extends Component {

  constructor() {
    super();

    this.state = {
      cleanRatings: [],
      currentBook: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const currentBook = nextProps.books.filter(book => (book.current === true));
      let cleanRatings = [];

      if (currentBook[0] !== undefined) {
        
        if (currentBook[0].rated !== undefined) {
          const ratings = currentBook[0].rated;
          cleanRatings = Object.keys(ratings).map(key => parseInt(ratings[key], 10));
        }

        this.setState({
          cleanRatings,
          currentBook: currentBook[0]
        });

      }
    }
  }

  render() {
    return (
      <div className="current-book-wrapper">
        { this.state.currentBook !== null ? (
          <Book currentBook={true} pastBook={false} book={this.state.currentBook} description={true} rate={true} ratings={this.state.cleanRatings} authenticated={this.props.authenticated} />
        ) : (
          <p>Loading, please wait</p>
        )
        }
      </div>
    );
  }
}

export default CurrentBookContainer;