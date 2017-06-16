import React, { Component } from 'react';
import CurrentBookContainer from './CurrentBookContainer';
class Event extends Component {
  render() {
    return (
      <div className="event clearfix">
          <div className="event-details">
            <h1 className="event-details__title">Next Event:</h1>
            <p className="event-details__date">June 23, 2016</p>
            <div className="event-details__book">
              <CurrentBookContainer books={this.props.books} authenticated={this.props.authenticated} user={this.props.user} />
            </div>
            <ul className="event-details__attendees">
              <li className="event-details__attendee">Attendee</li>
              <li className="event-details__attendee">Attendee 2</li>
            </ul>
          </div>
          
      </div>
    );
  }
}

export default Event;