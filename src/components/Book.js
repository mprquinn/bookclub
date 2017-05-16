import React, { Component } from 'react';
import Rating from './Rating';
import base from '../base';

class Book extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    const user = base.auth().currentUser;
    this.setState({
      user
    })
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

          { this.state.user && this.props.rate ? (
            <Rating book-to-rate={this.props.book.title} />
            ) : (
              <p></p>
            )
          }
      </div>
    );
  }
}

export default Book;
