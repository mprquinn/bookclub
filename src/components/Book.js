import React, { Component } from 'react';

class Book extends Component {
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
      </div>
    );
  }
}

export default Book;
