import React, { Component } from 'react';
import CurrentBookContainer from './components/CurrentBookContainer';
// import UserList from './components/UserList';
import PastBooks from './components/PastBooks';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" link={[
  { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css' }
]}>
        <header>
          <h1>Prestige Literary Worldwide</h1>  
        </header>
        
        <div className="app-container">
          <PastBooks />
          <CurrentBookContainer />
        </div>
      </div>
    );
  }
}

export default App;
