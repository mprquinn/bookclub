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
          if (rated[0] !== undefined && rated[0] === true) {
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

    const rating = this.refs.rating.value;

    const user = base.auth().currentUser.displayName;
    const pushStringFlag = `Books/${this.props.bookToRate}/rated/${user}`;
    const pushStringRate = `Books/${this.props.bookToRate}/ratings/`

    base.push(pushStringFlag, {
      data: true,
      then(err) {
        console.log(err);
      }
    });

    base.push(pushStringRate, {
      data: rating,
      then(err) {
        console.log(err);
      }
    });

    this.setState({
      rated: true
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
