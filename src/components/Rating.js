import React, { Component } from 'react';
import base from '../base';

class Rating extends Component {
  constructor(props) {
    super(props);
    
    this.checkRated = this.checkRated.bind(this);
    this.handleRating = this.handleRating.bind(this);

    this.state = {
      book: null,
      ratings: '',
      rated: false,
    }
  }

  componentWillMount() {
    this.setState({
      book: this.props.bookToRate
    });
    this.checkRated();
  }

  checkRated() {
    const user = base.auth().currentUser;

    if (user) {
      const checkString = `Books/${this.props.bookToRate}/rated/${user.displayName}`;
      base.fetch(checkString, {
        context: this,
        asArray: true,
        then (rated) {
          console.log(rated[0]);
          if (rated[0] !== null && rated[0] === true) {
            this.setState({
              rated: true
            });
          }
        }
      });
    }
    
  }

  handleRating(e) {
    e.preventDefault();
    console.log(e, this.refs.rating.value);

    const user = base.auth().currentUser.displayName;
    const pushString = `Books/${this.props.bookToRate}/rated/${user}`;

    base.push(pushString, {
      data: true,
      then(err) {
        console.log(err);
      }
    });
  }

  render() {
     return (
      <div>
        
          <label>Your Rating</label>
          { this.state.rated ? (
            <p>Youve Rated this book!</p>) : (
            <form>
              <select name="rating" ref="rating">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button onClick={this.handleRating}>Rate!</button>
            </form>
            )
          }
      </div>
    );
  }
}

export default Rating;
