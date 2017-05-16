import React, { Component } from 'react';
import CurrentBookContainer from './components/CurrentBookContainer';
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
  }

  logout() {
    base.unauth();

    this.setState({
      authenticated: false,
      user: ''
    })
    
  }

  componentDidMount() {
    base.fetch('Books', {
      context: this,
      asArray: true,
      then(books) {
        this.setState({
          books
        })
      }
    })
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
          <CurrentBookContainer books={this.state.books}  />
        </div>

      </div>
    );
  }
}

export default App;
