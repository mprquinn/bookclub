import React, { Component } from 'react';
import Event from './Event';

class Favourites extends Component {
  constructor(props) {
    super(props);

    this.renderFavEvents = this.renderFavEvents.bind(this);
    this.generateAverageRating = this.generateAverageRating.bind(this);
    
    this.state = {
      events: [],
      loaded: false
    }
  }

  componentDidMount() {

  }

  generateAverageRating(ratings) {
    // console.log(ratings);
    const ratingsArray = Object.keys(ratings).map(rating => {
      return ratings[rating] 
    });
    // console.log(ratingsArray);
    const sum = ratingsArray.reduce((a,b) => parseInt(a,10) + parseInt(b,10));
    const avg = sum / ratingsArray.length;
    return avg;
  }

  renderFavEvents() {
    const fullEventsArray = Object.keys(this.props.events).map(event => {
      return { event: this.props.events[event] }
    });

    const favEventsSorted = fullEventsArray.sort((eventA, eventB) => this.generateAverageRating(eventA.event.Book.Ratings) > this.generateAverageRating(eventB.event.Book.Ratings) ? -1 : 1);
  
    return favEventsSorted.map(event => {
      return (
        <li key={event.event.Book.Title} className="favourite-books__book">
          <Event type="favourites" key={event.event.Book.Title} user={this.props.user} date={event.event.Date} book={event.event.Book} current={false} ratings={event.event.Book.Ratings} />
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="favourite-books">
        <h1>Prestige's Favourites</h1>
      	{ this.renderFavEvents() }
      </ul>
    );
  }
}

export default Favourites;
