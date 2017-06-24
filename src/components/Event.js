import React, { Component } from 'react';
import Book from './Book';
import base from '../base';

class Event extends Component {
  constructor() {
    super();

    this.renderBook = this.renderBook.bind(this);

    this.state = {
      loaded: false,
      attendees: {}
    }
  }

  componentDidMount() {
    const attendeesRef = base.database().ref(`Events/${this.props.book.Title}/Attendees`);
    attendeesRef.on('value', (snapshot) => {
      this.setState({
        attendees: snapshot.val(),
        loaded: true
      });
    });
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
    if (this.state.loaded) {
      console.log(this.state);
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
                  Object.keys(this.state.attendees).map(attendee => {
                    return (
                      <li key={attendee} className="event-details__attendee">{this.state.attendees[attendee]}</li>
                    );
                  })
                }
              </ul>
            </div>
            
        </div>
      );
    } else {
      return (
        <p className="MIkeTEst">Loading</p>
      )
    }
  }
}

export default Event;