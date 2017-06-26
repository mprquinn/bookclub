import React, { Component } from 'react';
import Book from './Book';
import base from '../base';
import getKeyByValue from '../helpers/getKeyByValue';

class Event extends Component {
  constructor() {
    super();

    this.renderBook = this.renderBook.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
    this.leaveEvent = this.leaveEvent.bind(this);
    this.checkAttending = this.checkAttending.bind(this);

    this.state = {
      loaded: false,
      attendees: [],
      attending: false,
      userId: '',
    }
  }

  componentDidMount() {
    const _this = this;
    const attendeesRef = base.database().ref(`Events/${this.props.book.Title}/Attendees`);
    attendeesRef.on('value', (snapshot) => {
      let attendees = snapshot.val();
      let newAttendees = [];
      for (let attendee in attendees) {
        this.setState({
          userId: attendee
        });
        newAttendees.push({
          id: attendee,
          name: attendees[attendee]
        });
      }
      this.setState({
        attendees: newAttendees,
        loaded: true
      });
    });
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

  leaveEvent(e) {
    e.preventDefault();
    const user = this.props.user;
    const attendeeRef = base.database().ref(`Events/${this.props.book.Title}/Attendees/${this.state.userId}`);

    const userCheck = this.state.attendees.find(this.checkAttending);

    if (userCheck.name === user) {
      attendeeRef.remove();
      this.setState({
        attending: false
      });
    }
    
  }

  checkAttending(attendee) {
    return attendee.id === this.state.userId;
  }

  renderButton() {
    let button;
    
    if (this.state.attending && this.props.user !== undefined) {
      console.log('test');
      return <a href="#" onClick={this.leaveEvent} className="button button--fill">Leave Event</a>;
    } else if (!this.state.attending && this.props.user !== undefined) {
      return <a href="#" onClick={this.joinEvent} className="button button--fill">Join Event</a>;
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
    if (this.state.loaded) {
      return ( 
        <div className="event clearfix">
            <div className="event-details">
              <h1 className="event-details__title">Next Event:</h1>
              <p className="event-details__date">{this.props.date}</p>
              <div className="event-details__book">
                <Book book={this.props.book} user={this.props.user} />
                <p>
                  {this.renderButton()}
                </p>
              </div>
              <ul className="event-details__attendees">
                {
                  this.state.attendees.map(attendee => {
                    return (
                      <li key={attendee.id} className="event-details__attendee">
                        {attendee.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            
        </div>
      );
    } else {
      return (
        <p>Loading</p>
      )
    }
  }
}

export default Event;