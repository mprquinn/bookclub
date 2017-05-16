import React, { Component } from 'react';

class Rating extends Component {
  constructor(props) {
    super(props);
    
    this.handleRating = this.handleRating.bind(this);
  }

  handleRating(e) {
    e.preventDefault();
    console.log(e, this.refs.rating.value);
  }

  render() {
     return (
      <div>
        <form>
          <label>Your Rating</label>
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
      </div>
    );
  }
}

export default Rating;
