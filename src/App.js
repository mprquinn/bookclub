import React, { Component } from 'react';
import Header from './components/Header';
import Event from './components/Event';
import PastEvents from './components/PastEvents';
import Favourites from './components/Favourites';
import { Link } from 'react-router';
import './css/styles.css';
import base from './base.js';

class App extends Component {
  constructor() {
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
            Loading...
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
        <p className="disclaimer">
          &copy; 2017,{' '}
          <a href="https://github.com/mprquinn" target="_blank">
            Mike Quinn
          </a>{' '}
          📚
        </p>
      </div>
    );
  }
}

export default App;
