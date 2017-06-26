import React, { Component } from 'react';
import Rating from './Rating';
import base from '../base';

class Book extends Component {
  constructor(props) {
    super(props);

    this.generateAverageRating = this.generateAverageRating.bind(this);

    this.state = {
      ratings: [],
      avgRating: [],
      authenticated: this.props.authenticated,
      attending: false
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
    const fetchString = `Events/${this.props.book.Title}/Book/Ratings`;
    base.listenTo(fetchString, {
      context: this,
      asArray: true,
      then(ratings) {
        this.generateAverageRating(ratings);
      }
    });
    
  }

  componentDidMount() {
    const fetchString = `Events/${this.props.book.Title}/Book/Ratings/`;

    base.listenTo(fetchString, {
      context: this,
      asArray: true,
      then(ratings) {
        this.generateAverageRating(ratings);
      }
    });
  }

  

  render() {
    let bookClass = 'book clearfix';
    if (this.props.current) {
      bookClass = 'book book--current clearfix';
    } else {
      bookClass = 'book book--past clearfix';
    }
     return (
      <div className={bookClass}>
        <p className="book__title">
            <strong>
              {this.props.book.Title}
            </strong>
          </p>
          <p className="book__author">  
            {this.props.book.Author}
          </p>
          <img src={`${this.props.book.Image}`} alt="" className="book__cover"/>
          {this.props.current && 
            <p className="book__description">
              {this.props.book.Description}
            </p>
          }
          {
            this.props.user && this.props.current &&
            <Rating bookToRate={this.props.book.Title} />
          }
          <p className="fill">Average Rating: {this.state.avgRating}</p>
      </div>
    );
  }
}

export default Book;
