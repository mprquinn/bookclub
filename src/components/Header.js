import React, { Component } from 'react';
import { Link } from 'react-router';
import base from '../base';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleHeader = this.toggleHeader.bind(this);
    this.toggleNav = this.toggleNav.bind(this);

    this.state = {
      toggled: false
    };
  }

  componentDidMount() {
    // console.log(this.props);
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

  toggleNav() {
    this.setState({
      toggled: !this.state.toggled
    });
  }

  render() {
    let mobileClass = 'hamburger hamburger--elastic mobile-toggle ';
    let menuClass = 'header__menu';
    if (this.state.toggled) {
      mobileClass = 'hamburger hamburger--elastic mobile-toggle  is-active';
      menuClass = 'header__menu header__menu--open';
    } else {
      mobileClass = 'hamburger hamburger--elastic mobile-toggle';
      menuClass = 'header__menu';
    }

    return (
      <header>
        <h1>Prestige Worldwide Literary Society</h1>
        <h1 className="toggled">PWLS</h1>

        <div className={menuClass}>
          <Link className="button" to="/suggest">
            Suggest a Book
          </Link>
        </div>

        {this.props.authenticated === false
          ? <button onClick={() => this.props.authenticate()}>Login</button>
          : <button onClick={() => this.props.logout()}>Logout</button>}

        <button className={mobileClass} onClick={this.toggleNav} type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </header>
    );
  }
}

export default Header;
