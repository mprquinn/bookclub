import React, { Component } from 'react';
import Rating from './Rating';
import base from '../base';

class Book extends Component {
  constructor(props) {
    super(props);

    this.generateAverageRating = this.generateAverageRating.bind(this);
    this.joinEvent = this.joinEvent.bind(this);

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
    console.log(fetchString);
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

  joinEvent(e) {
    e.preventDefault();
    const user = this.props.user;
    const attendeeRef = `Events/${this.props.book.Title}/Attendees/`;

    base.push(attendeeRef, {
      data: user
    });

    this.setState({
      attending: true
    });
  }

  renderButton() {
    let button;
    if (this.state.attending) {
      return <a className="button button--fill">Attending</a>
    } else {
      return <a href="#" onClick={this.joinEvent} className="button button--fill">Join Event</a>
    }
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
          <p>
            {this.renderButton()}
          </p>
      </div>
    );
  }
}

export default Book;
