import React, { Component } from 'react';
import Event from './components/Event';
import PastBooks from './components/PastBooks';
import './App.css';
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
    const test = base.database().ref('Books');
    test.on('value', (snapshot) => {
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
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Prestige Worldwide Literary Society</h1>
          { this.state.authenticated === false ? (
            <button onClick={() => this.authenticate()}>Login</button>
            ) : (
            <button onClick={() => this.logout()}>Logout</button>
            )
          }
          
        </header>

        { this.props.children }
        
        <div className="app-container">
          <PastBooks  books={this.state.books}/>
          <Event {...this.state} />
        </div>

      </div>
    );
  }
}

export default App;
