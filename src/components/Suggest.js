import React, { Component } from 'react';
import Header from '../components/Header';
import Event from '../components/Event';
import PastEvents from '../components/PastEvents';
import Favourites from '../components/Favourites';
import Book from '../components/Book';
// import './App.css';
import '../css/styles.css';
import base from '../base';
import gBooksKey from '../gbooks';

class Suggestions extends Component {
  constructor() {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.renderPastEvents = this.renderPastEvents.bind(this);
    this.renderFavourites = this.renderFavourites.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.chooseBook = this.chooseBook.bind(this);
    this.suggestBook = this.suggestBook.bind(this);

    this.state = {
      authenticated: false,
      user: '',
      loaded: false,
      pastEvents: [],
      suggestedBooks: [],
      searchBook: '',
      chosen: 'suggestion__choice',
      lastStamp: 0,
      submitting: false,
      submitted: false
    };
  }

  authenticate() {
    base.authWithOAuthPopup('facebook', this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      return;
    }

    localStorage.setItem(
      'authenticated',
      JSON.stringify({ authenticated: true, user: authData.user.displayName })
    );

    this.setState({
      authenticated: true,
      user: authData.user.displayName
    });
  }

  logout() {
    base.unauth();

    this.setState({
      authenticated: false,
      user: ''
    });

    console.log(this.state.authenticated);

    localStorage.setItem('authenticated', null);
  }

  componentDidMount() {
    const eventsRef = base.database().ref('Events');
    eventsRef.on('value', snapshot => {
      this.setState({
        events: snapshot.val(),
        loaded: true
      });
    });

    const suggestionsRef = base.database().ref('Suggestions');
    const suggestedBooks = [];

    suggestionsRef.on('value', snapshot => {
      Object.keys(snapshot.val()).map(book => {
        suggestedBooks.push(snapshot.val()[book]);
      });
      this.setState({
        suggestedBooks: suggestedBooks.reverse()
      });
    });

    const savedUser = JSON.parse(localStorage.getItem('authenticated'));

    if (savedUser !== null) {
      this.setState({
        authenticated: true,
        user: savedUser.user
      });
    }
  }

  searchBooks(e) {
    const _this = this;
    e.preventDefault();

    const string = e.target.value;
    const searchString = `https://www.googleapis.com/books/v1/volumes?q=${string}&maxResults=1&key=${gBooksKey}`;

    if (
      this.state.lastStamp !== 0 &&
      e.timeStamp - this.state.lastStamp > 100 &&
      string !== ''
    ) {
      fetch(searchString)
        .then(function(response) {
          // Convert to JSON
          return response.json();
        })
        .then(function(book) {
          // Yay, `j` is a JavaScript object
          if (book.items.length) {
            const foundBook = book.items[0].volumeInfo;
            const Title = foundBook.title;
            const Image = foundBook.imageLinks.smallThumbnail;
            const Author = '' || foundBook.authors[0];
            const Description = foundBook.description;

            const result = {
              Title,
              Image,
              Author,
              Description
            };

            _this.setState({
              searchBook: result
            });
          }
        });
    }

    this.setState({
      lastStamp: e.timeStamp
    });
  }

  renderEvents() {
    if (this.state.loaded && this.state.currentEvent) {
      // yo dawg you probably shouldnt morph the currentEvent
      return (
        <Event
          user={this.state.user}
          date={this.state.currentEvent.Date}
          book={this.state.currentEvent.Book}
          current={true}
        />
      );
    } else {
      return (
        <div>
          <p>
            <svg
              width="200px"
              height="200px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              className="lds-book"
            >
              <path
                d="M20 25L80 25L80 75L20 75Z"
                fill="#ffffff"
                stroke="#f373af"
                strokeWidth="2"
              />
              <path
                d="M 50 25 L 75 24.1667 L 75 75.8333 L 50 75"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#ffffff"
                stroke="#f373af"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  calcMode="linear"
                  values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
                  keyTimes="0;0.5;0.501;1"
                  dur="1"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  calcMode="linear"
                  values="1;1;0;0"
                  keyTimes="0;0.5;0.5001;1"
                  dur="1"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 50 25 L 65.04 22.5067 L 65.04 77.4933 L 50 75"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#ffffff"
                stroke="#f373af"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  calcMode="linear"
                  values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
                  keyTimes="0;0.5;0.501;1"
                  dur="1"
                  begin="-0.166s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  calcMode="linear"
                  values="1;1;0;0"
                  keyTimes="0;0.5;0.5001;1"
                  dur="1"
                  begin="-0.166s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 50 25 L 55.2 20.8667 L 55.2 79.1333 L 50 75"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#ffffff"
                stroke="#f373af"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  calcMode="linear"
                  values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
                  keyTimes="0;0.5;0.501;1"
                  dur="1"
                  begin="-0.33s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  calcMode="linear"
                  values="1;1;0;0"
                  keyTimes="0;0.5;0.5001;1"
                  dur="1"
                  begin="-0.33s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 50 25 L 20 25 L 20 75 L 50 75"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#ffffff"
                stroke="#f373af"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  calcMode="linear"
                  values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
                  keyTimes="0;0.499;0.5;1"
                  dur="1"
                  begin="-0.33s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  calcMode="linear"
                  values="0;0;1;1"
                  keyTimes="0;0.4999;0.5;1"
                  dur="1"
                  begin="-0.33s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 50 25 L 20 25 L 20 75 L 50 75"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#ffffff"
                stroke="#f373af"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  calcMode="linear"
                  values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
                  keyTimes="0;0.499;0.5;1"
                  dur="1"
                  begin="-0.166s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  calcMode="linear"
                  values="0;0;1;1"
                  keyTimes="0;0.4999;0.5;1"
                  dur="1"
                  begin="-0.166s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 50 25 L 20 25 L 20 75 L 50 75"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="#ffffff"
                stroke="#f373af"
                strokeWidth="2"
              >
                <animate
                  attributeName="d"
                  calcMode="linear"
                  values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
                  keyTimes="0;0.499;0.5;1"
                  dur="1"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  calcMode="linear"
                  values="0;0;1;1"
                  keyTimes="0;0.4999;0.5;1"
                  dur="1"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </p>
        </div>
      );
    }
  }

  renderPastEvents() {
    if (this.state.loaded) {
      return (
        <PastEvents
          events={this.state.events}
          user={this.state.user}
          current={false}
        />
      );
    }
  }

  renderFavourites() {
    if (this.state.loaded) {
      return <Favourites events={this.state.events} current={false} />;
    }
  }

  chooseBook(e) {
    if (this.state.chosen === 'suggestion__choice') {
      this.setState({
        chosen: 'suggestion__choice suggestion__choice--chosen'
      });
    } else {
      this.setState({
        chosen: 'suggestion__choice'
      });
    }
  }

  suggestBook(e) {
    const _this = this;
    e.preventDefault();

    const book = {
      Title: this.state.searchBook.Title,
      Author: this.state.searchBook.Author,
      Image: this.state.searchBook.Image,
      Description: this.state.searchBook.Description,
      User: this.state.user
    };
    const bookTitle = book.title;
    const pushString = `Suggestions`;

    this.setState({
      submitting: true
    });

    base.database().ref(pushString).push(book, function(error) {
      if (error) {
        console.log(error);
      } else {
        _this.setState({
          submitting: false,
          submitted: true
        });
        _this.reset();
      }
    });
  }

  render() {
    return (
      <div className="app clearfix">
        <Header
          authenticate={this.authenticate}
          authHander={this.authHandler}
          logout={this.logout}
          authenticated={this.state.authenticated}
        />

        <div className="app__container">
          <section className="app__sidebar">
            <h1 className="past-books__title">Past Events</h1>
            {this.renderPastEvents()}
          </section>

          <section className="app__main">
            {this.state.user !== '' &&
              <div className="suggestion">
                <h1>Submit a new Book</h1>
                <form className="suggestion__form" onSubmit={this.suggestBook}>
                  <label htmlFor="suggestion">Book Title</label>
                  <br />
                  <input
                    type="text"
                    name="suggestion"
                    placeholder="Book Title"
                    ref="suggestion"
                    onChange={this.searchBooks}
                  />
                  {this.state.searchBook !== '' &&
                    !this.state.submitted &&
                    <div
                      className={this.state.chosen}
                      onClick={this.chooseBook}
                    >
                      <p>
                        <strong>
                          {this.state.searchBook.Title }

                          
                        </strong>
                        <br />
                        {this.state.searchBook.Author}
                      </p>
                      <img src={this.state.searchBook.Image} />
                    </div>}

                  {this.state.submitting &&
                    !this.state.submitted &&
                    <p>
                      <strong>Submitting...</strong>
                    </p>}

                  {this.state.submitted &&
                    !this.state.submitting &&
                    <p>
                      <strong>Submitted!</strong>
                    </p>}

                  {this.state.chosen ===
                    'suggestion__choice suggestion__choice--chosen' &&
                    !this.state.submitted &&
                    <input
                      type="submit"
                      className="button button--fill button--fill--white"
                    />}
                </form>
              </div>}

            <div className="suggestions">
              <p>
                <strong>View other suggestions</strong>
              </p>
              <ul>
                {this.state.suggestedBooks.map(book => {
                  return (
                    <li key={book.Title}>
                      <Book book={book} current={false} suggested={true} />
                      <p>
                        Submitted by {book.User}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <section className="app__footer">
              {this.renderFavourites()}
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default Suggestions;
