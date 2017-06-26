import React, { Component } from 'react';
import Book from './Book';

class PastEvents extends Component {
  constructor(props) {
    super(props);

    this.renderPastEvents = this.renderPastEvents.bind(this);
    
    this.state = {
      events: [],
      loaded: false
    }
  }

  componentDidMount() {
    // console.log(this.props);
  }

  renderPastEvents() {
    const fullEventsArray = Object.keys(this.props.events).map(event => {
      return { event: this.props.events[event] }
    });
    // fullEventsArray.map(event => {
    //   console.log(event);
    // })
    const pastEvents = fullEventsArray.filter(event => event.event.Current !== true);
    return pastEvents.map(event => {
      return (
        <Book book={event.event.Book} pastBook={true} user={this.props.user} />
      )
    })
  }

  render() {
    // const pastBooks = this.props.books.filter(book => book.current !== true);
    // const booksSorted = pastBooks.sort((bookA, bookB) => bookA.order > bookB.order ? -1 : 1);
    // let bookArray = booksSorted.map(book => {
    //   return (
    //     <Book book={book} currentBook={false} pastBook={true} description={false} key={book.order} ratings={book.ratings} />
    //   )
    // })
    return (
      <ul className="past-books">
      	{ this.renderPastEvents() }
      </ul>
    );
  }
}

export default PastEvents;
