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
      userRating: null
    };
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
      const checkString = `Books/${this.props.bookToRate}/rated/`;
      base.fetch(checkString, {
        context: this,
        asArray: false,
        then(rated) {
          if (rated[user.displayName] !== undefined) {
            this.setState({
              userRating: rated[user.displayName]
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
    const pushString = `Books/${this.props.bookToRate}/rated/${user}`;
    // const pushStringRate = `Books/${this.props.bookToRate}/ratings/`

    base.post(pushString, {
      data: rating,
      then(err) {
        // console.log(err);
      }
    });

    this.setState({
      rated: true,
      userRating: rating
    });
  }

  render() {
    return (
      <div className="rate-book">
        <label>
          Your Rating:{' '}
          <span className="user-rating">{this.state.userRating}</span>
        </label>
        {this.state.rated
          ? <p>Youve Rated this book!</p>
          : <form>
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
              <button
                className="button button--fill"
                onClick={this.handleRating}
              >
                Rate!
              </button>
            </form>}
      </div>
    );
  }
}

export default Rating;
