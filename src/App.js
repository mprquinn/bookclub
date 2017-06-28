import React, { Component } from 'react';
import Header from './components/Header';
import Event from './components/Event';
import PastEvents from './components/PastEvents';
import Favourites from './components/Favourites';
import { Link } from 'react-router';
import './css/styles.css';
import base from './base.js';

class App extends Component {
  constructor( )   {
    super();

    this.renderEvents = this.renderEvents.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
    this.renderPastEvents = this.renderPastEvents.bind(this);
    this.renderFavourites = this.renderFavourites.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      events: [],
      authenticated: false,
      user: '',
      loaded: false,
      currentEvent: false,
      pastEvents: []
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
      this.getCurrent(snapshot.val());
    });

    const savedUser = JSON.parse(localStorage.getItem('authenticated'));

    if (savedUser !== null) {
      this.setState({
        authenticated: true,
        user: savedUser.user
      });
    }

    this.toggleHeader();
  }

  toggleHeader() {
    const header = document.querySelector('header'),
      body = document.querySelector('body'),
      trigger =
        Math.abs(
          header.getBoundingClientRect().top -
            header.getBoundingClientRect().bottom
        ) / 2;
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      if (scrolled >= trigger) {
        header.classList.add('header--toggled');
        body.classList.add('body--push');
      } else {
        header.classList.remove('header--toggled');
        body.classList.remove('body--push');
      }
    });
  }

  getCurrent(events) {
    // obj loop
    const current = Object.keys(events).filter(event => {
      return events[event].Current;
    });
    this.setState({
      currentEvent: this.state.events[current]
    });
  }

  getPast(events) {}

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
            {this.renderEvents()}

            <section className="app__footer">
              {this.renderFavourites()}
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
