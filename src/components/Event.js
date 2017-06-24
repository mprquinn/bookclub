import React, { Component } from 'react';
import Book from './Book';

class Event extends Component {
  constructor() {
    super();

    this.renderBook = this.renderBook.bind(this);

    this.state = {
      loaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      console.log('test');
      this.setState({
        loaded: true
      });
    }
  }

  renderBook() {
    let Book;
    if (this.state.loaded) {
      return <h1>Fart</h1>;
    } else {
      return <p>Loading</p>;
    }
  }
  render() {

    return ( 
      <div className="event clearfix">
          <div className="event-details">
            <h1 className="event-details__title">Next Event:</h1>
            <p className="event-details__date">{this.props.date}</p>
            <div className="event-details__book">
              <Book book={this.props.book} user={this.props.user} />
            </div>
            <ul className="event-details__attendees">
              {
                this.props.attendees.map(attendee => {
                  return (
                    <li key={attendee} className="event-details__attendee">{attendee}</li>
                  );
                })
              }
            </ul>
          </div>
          
      </div>
    );
  }
}

export default Event;