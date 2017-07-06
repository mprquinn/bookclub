import React, { Component } from 'react';
import Event from './Event';

class PastEvents extends Component {
  constructor(props) {
    super(props);

    this.renderPastEvents = this.renderPastEvents.bind(this);

    this.state = {
      events: [],
      loaded: false
    };
  }

  componentDidMount() {
    // console.log(this.props);
  }

  renderPastEvents() {
    const fullEventsArray = Object.keys(this.props.events).map(event => {
      return { event: this.props.events[event] };
    });
    const pastEvents = fullEventsArray.filter(
      event => event.event.Current !== true
    );
    const pastEventsSorted = pastEvents.sort(
      (eventA, eventB) => new Date(eventA.event.Date) > new Date(eventB.event.Date) ? -1 : 1
    );
    return pastEventsSorted.map(event => {
      return (
        <Event
          key={event.event.Book.Title}
          user={this.props.user}
          date={event.event.Date}
          book={event.event.Book}
          current={false}
          ratings={event.event.Book.Ratings}
        />
      );
    });
  }

  render() {
    return (
      <ul className="past-books">
        {this.renderPastEvents()}
      </ul>
    );
  }
}

export default PastEvents;
