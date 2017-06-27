import React, { Component } from 'react';
import Event from '../components/Event';
import PastEvents from '../components/PastEvents';
import Favourites from '../components/Favourites';
// import './App.css';
import '../css/styles.css';
import base from '../base.js';
import gBooksKey from '../gbooks';

class Suggestions extends Component {
  constructor () {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.renderPastEvents = this.renderPastEvents.bind(this);
    this.renderFavourites = this.renderFavourites.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
    this.chooseBook = this.chooseBook.bind(this);

    this.state = {
      events: [],
      authenticated: false,
      user: '',
      loaded: false,
      currentEvent: false,
      pastEvents: [],
      searchBook: '',
      chosen: 'suggestion__choice',
      lastStamp: 0,
    }
  }

  authenticate() {
    base.authWithOAuthPopup('facebook', this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      return;
    }


    localStorage.setItem('authenticated', JSON.stringify({authenticated:true,user: authData.user.displayName}));

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

    localStorage.setItem('authenticated', null);

  }

  componentDidMount() {
    const eventsRef = base.database().ref('Events');
    eventsRef.on('value', (snapshot) => {
      this.setState({
        events: snapshot.val(),
        loaded: true
      });
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

  searchBooks(e) {
    const _this = this;
    e.preventDefault();

    const string = e.target.value;
    const searchString = `https://www.googleapis.com/books/v1/volumes?q=${string}&maxResults=1&key=${gBooksKey}`;

    if (this.state.lastStamp !== 0 && e.timeStamp - this.state.lastStamp > 100 && string !== '') {
      fetch(searchString).then(function(response) { 
      // Convert to JSON
        return response.json();
      }).then(function(book) {
        // Yay, `j` is a JavaScript object
        if (book.items.length) {
          const foundBook = book.items[0].volumeInfo;
          const title = foundBook.title;
          const image = foundBook.imageLinks.thumbnail;
          const author = '' || foundBook.authors[0];
          const description = foundBook.description;

          const result = {
            title,
            image,
            author,
            description
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

  toggleHeader() {
    const header = document.querySelector('header'),
          body = document.querySelector('body'),
          trigger = Math.abs(header.getBoundingClientRect().top - header.getBoundingClientRect().bottom) /2;
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


  getPast(events) {

  }


  renderEvents() { 
    if (this.state.loaded && this.state.currentEvent) {
      // yo dawg you probably shouldnt morph the currentEvent
      return <Event user={this.state.user} date={this.state.currentEvent.Date} book={this.state.currentEvent.Book} current={true} />
    } else {
      return (<div><p>
        <svg width="200px" height="200px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-book">
          <path d="M20 25L80 25L80 75L20 75Z"  fill="#ffffff" stroke="#f373af" strokeWidth="2"></path>
          <path d="M 50 25 L 75 24.1667 L 75 75.8333 L 50 75" strokeLinejoin="round" strokeLinecap="round" fill="#ffffff" stroke="#f373af" strokeWidth="2">
            <animate attributeName="d" calcMode="linear" values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75" keyTimes="0;0.5;0.501;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" calcMode="linear" values="1;1;0;0" keyTimes="0;0.5;0.5001;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
          </path>
          <path d="M 50 25 L 65.04 22.5067 L 65.04 77.4933 L 50 75" strokeLinejoin="round" strokeLinecap="round" fill="#ffffff" stroke="#f373af" strokeWidth="2">
            <animate attributeName="d" calcMode="linear" values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75" keyTimes="0;0.5;0.501;1" dur="1" begin="-0.166s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" calcMode="linear" values="1;1;0;0" keyTimes="0;0.5;0.5001;1" dur="1" begin="-0.166s" repeatCount="indefinite"></animate>
          </path>
          <path d="M 50 25 L 55.2 20.8667 L 55.2 79.1333 L 50 75" strokeLinejoin="round" strokeLinecap="round" fill="#ffffff" stroke="#f373af" strokeWidth="2">
            <animate attributeName="d" calcMode="linear" values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75" keyTimes="0;0.5;0.501;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" calcMode="linear" values="1;1;0;0" keyTimes="0;0.5;0.5001;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate>
          </path>
          <path d="M 50 25 L 20 25 L 20 75 L 50 75" strokeLinejoin="round" strokeLinecap="round" fill="#ffffff" stroke="#f373af" strokeWidth="2">
            <animate attributeName="d" calcMode="linear" values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75" keyTimes="0;0.499;0.5;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" calcMode="linear" values="0;0;1;1" keyTimes="0;0.4999;0.5;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate>
          </path>
          <path d="M 50 25 L 20 25 L 20 75 L 50 75" strokeLinejoin="round" strokeLinecap="round" fill="#ffffff" stroke="#f373af" strokeWidth="2">
            <animate attributeName="d" calcMode="linear" values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75" keyTimes="0;0.499;0.5;1" dur="1" begin="-0.166s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" calcMode="linear" values="0;0;1;1" keyTimes="0;0.4999;0.5;1" dur="1" begin="-0.166s" repeatCount="indefinite"></animate>
          </path>
          <path d="M 50 25 L 20 25 L 20 75 L 50 75" strokeLinejoin="round" strokeLinecap="round" fill="#ffffff" stroke="#f373af" strokeWidth="2">
            <animate attributeName="d" calcMode="linear" values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75" keyTimes="0;0.499;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" calcMode="linear" values="0;0;1;1" keyTimes="0;0.4999;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
          </path>
        </svg>
      </p></div>);
    }
  }

  renderPastEvents() {
    if (this.state.loaded) {
      return (
        <PastEvents events={this.state.events} user={this.state.user} current={false} />
      );
    }
  }

  renderFavourites() {
    if (this.state.loaded) {
      return (
        <Favourites events={this.state.events} current={false} />
      )
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

  render() {
    return (
      <div className="app clearfix">
        <header>
          <h1>Prestige Worldwide Literary Society</h1>
          <h1 className="toggled">PWLS</h1>
          { this.state.authenticated === false ? (
            <button onClick={() => this.authenticate()}>Login</button>
            ) : (
            <button onClick={() => this.logout()}>Logout</button>
            )
          }
          
        </header>
        
        <div className="app__container">
          <section className="app__sidebar">
            <h1 className="past-books__title">Past Events</h1>
            { this.renderPastEvents() }
          </section>

          <section className="app__main">
            <div className="suggestion">
              <h1>Submit a new Book</h1>
              <form>
                <label htmlFor="suggestion">Book Title</label><br />
                <input type="text" name="suggestion" placeholder="Book Title" ref="suggestion" onChange={this.searchBooks} />
                { this.state.searchBook !== "" &&
                  <div className={this.state.chosen} onClick={this.chooseBook}>
                    <p><strong>{this.state.searchBook.title}</strong><br />
                    {this.state.searchBook.author}</p>
                    <img src={this.state.searchBook.image} />
                  </div>
                }
                {this.state.chosen === 'suggestion__choice suggestion__choice--chosen' &&
                  <input type="submit" className="button button--fill button--fill--white" />
                }
              </form>
            </div>

            <div className="suggestions">
              <p>
                <strong>
                  View other suggestions
                </strong>
              </p>
            </div>

            <section className="app__footer">
              { this.renderFavourites() }
            </section>
          </section>
          
        </div>

      </div>
    );
  }
}

export default Suggestions;
