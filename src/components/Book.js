import React, { Component } from 'react';
import Rating from './Rating';
import base from '../base';

class Book extends Component {
  constructor(props) {
    super(props);

    this.generateAverageRating = this.generateAverageRating.bind(this);

    this.state = {
      user: null,
      ratings: [],
      avgRating: [],
      authenticated: this.props.authenticated
    }
  }


  generateAverageRating(ratings) {
    if (ratings.length) {
      const sum = ratings.reduce((a,b) => parseInt(a,10) + parseInt(b,10));
      const avg = sum / ratings.length;

      this.setState({
        avgRating: avg
      });
    }
    
  }

  componentWillMount() {
    const user = base.auth().currentUser;
    this.setState({
      user
    });

    const fetchString = `Books/${this.props.book.title}/rated/`;

    base.listenTo(fetchString, {
      context: this,
      asArray: true,
      then(ratings) {
        this.generateAverageRating(ratings);
      }
    });
    
  }

  componentDidMount() {
    
  }

  render() {
    let bookClass = 'book clearfix';
    if (this.props.currentBook) {
      bookClass = 'book book--current clearfix';
    } else if (this.props.pastBook) {
      bookClass = 'book book--past clearfix';
    }
     return (
      <div className={bookClass}>
        <p className="book__title">
            <strong>
              {this.props.book.title}
            </strong>
          </p>
          <p className="book__author">
            {this.props.book.author}
          </p>
          <img src={`${this.props.book.image}`} alt="" className="book__cover"/>
          { this.props.description ? (
              <p className="book__description">
                {this.props.book.description}
              </p>
            ) : (
              ``
            )
          }

          { this.state.user && this.props.rate && this.props.authenticated ? (
            <Rating bookToRate={this.props.book.title} />
            ) : (
              <p></p>
            )
          }

          <p className="fill">Average Rating: {this.state.avgRating}</p>
      </div>
    );
  }
}

export default Book;
