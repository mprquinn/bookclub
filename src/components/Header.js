import React, { Component } from 'react';
import base from '../base';

class Header extends Component {
  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
    
    this.state = {
      toggled: false
    }
  }

  componentDidMount() {
    // console.log(this.props);
    this.toggleHeader();
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


  render() {
    return (
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
    );
  }
}

export default Header;
