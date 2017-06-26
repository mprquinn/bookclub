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
    console.log(this.props.book);
  }

  

  render() {
     return (
      <div className="book book--current clearfix">
        <p className="book__title">
            <strong>
              {this.props.book.Title}
            </strong>
          </p>
          <p className="book__author">  
            {this.props.book.Author}
          </p>
          <img src={`${this.props.book.Image}`} alt="" className="book__cover"/>
          <p className="book__description">
            {this.props.book.Description}
          </p>

      </div>
    );
  }
}

export default Book;
