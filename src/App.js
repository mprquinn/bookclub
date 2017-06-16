import React, { Component } from 'react';
import Event from './components/Event';
import PastBooks from './components/PastBooks';
// import './App.css';
import './css/styles.css';
import base from './base.js';

class App extends Component {
  constructor () {
    super();

    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);

    this.state = {
      books: [],
      authenticated: false,
      user: ''
    }
  }

  authenticate() {
    base.authWithOAuthPopup('facebook', this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      console.log(err);
      return;
    }

    this.setState({
      authenticated: true,
      user: authData.user.displayName
    });

    localStorage.setItem('authenticated', JSON.stringify({authenticated:true,user: authData.user.displayName}));
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
    const dbBooks = base.database().ref('Books');
    dbBooks.on('value', (snapshot) => {
      let books = snapshot.val();
      const newBooks = [];
      for (let book in books) {
        newBooks.push(books[book]);
      }
      this.setState({
        books: newBooks
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

  toggleHeader() {
    const header = document.querySelector('header'),
          body = document.querySelector('body'),
          trigger = Math.abs(header.getBoundingClientRect().top - header.getBoundingClientRect().bottom);
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

        { this.props.children }
        
        <div className="app__container">
          <section className="app__sidebar">
            <h1 className="past-books__title">Past Books</h1>
            <PastBooks  books={this.state.books}/>
          </section>

          <section className="app__main">
            <Event {...this.state} />
          </section>
        </div>

      </div>
    );
  }
}

export default App;
