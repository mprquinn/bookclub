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
      avgRating: null,
      authenticated: this.props.authenticated
    }
  }


  generateAverageRating(ratings) {
    const ratingsArray = Object.keys(ratings).map(key => parseInt(ratings[key]))
    const sum = ratingsArray.reduce((a,b) => a + b);
    const avg = sum / ratingsArray.length;

    this.setState({
      avgRating: avg
    });
  }

  componentWillMount() {
    const user = base.auth().currentUser;
    this.setState({
      user
    });

    if (this.props.ratings) {
      this.generateAverageRating(this.props.ratings);  
    }
    
  }


  render() {
     return (
      <div className="book">
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
              <p>&nbsp;</p>
            )
          }

          { this.state.user && this.props.rate && this.props.authenticated ? (
            <Rating bookToRate={this.props.book.title} />
            ) : (
              <p></p>
            )
          }

          <p>Average Rating: {this.state.avgRating}</p>
      </div>
    );
  }
}

export default Book;
