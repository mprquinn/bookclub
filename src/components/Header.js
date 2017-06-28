import React, { Component } from 'react';
import  { Link } from 'react-router';
import base from '../base';

class Header extends Component {
  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
    this.toggleNav = this.toggleNav.bind(this);

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

  toggleNav() {
    this.setState({
      toggled: !this.state.toggled
    });
  }


  render() {
    let mobileClass = 'hamburger hamburger--squeeze mobile-toggle ';
    if (this.state.toggled) {
      mobileClass = 'hamburger hamburger--squeeze mobile-toggle  is-active';
    } else {
      mobileClass = 'hamburger hamburger--squeeze mobile-toggle'
    }

    return (
      <header>
          <h1>Prestige Worldwide Literary Society</h1>
          <h1 className="toggled">PWLS</h1>

        <div className="header__menu">
          <Link className="button" to="/suggest">Suggest a Book</Link>
          { this.state.authenticated === false ? (
            <button onClick={() => this.authenticate()}>Login</button>
            ) : (
            <button onClick={() => this.logout()}>Logout</button>
            )
          }
        </div>
        <button className={mobileClass} onClick={this.toggleNav} type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        </header>
    );
  }
}

export default Header;
