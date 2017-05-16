import React, { Component } from 'react';
import CurrentBookContainer from './components/CurrentBookContainer';
// import UserList from './components/UserList';
import PastBooks from './components/PastBooks';
import './App.css';

import base from './base.js';

class App extends Component {
  constructor () {
    super();

    this.state = {
      books: []
    }
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
        </header>
        
        <div className="app-container">
          <PastBooks  books={this.state.books}/>
          <CurrentBookContainer books={this.state.books}  />
        </div>
      </div>
    );
  }
}

export default App;
