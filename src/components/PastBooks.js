import React, { Component } from 'react';

class PastBooks extends Component {
  render() {
    return (
      <ul className="past-books">

        <li className="past-book">
          <p className="past-book__title">
            <strong>
              Inherent Vice
            </strong>
          </p>
          <p class="past-book__author">
            Thomas Pynchon
          </p>
          <img src="https://images.gr-assets.com/books/1347697574l/5933841.jpg" alt="" className="past-book__cover"/>
        </li>

      	<li className="past-book">
      		<p className="past-book__title">
            <strong>
              The Underground Railroad
            </strong>
          </p>
          <p className="past-book__author">
            Colson Whitehead
          </p>
          <img src="https://images.gr-assets.com/books/1493178362l/30555488.jpg" alt="" className="past-book__cover"/>
      	</li>
      	
      </ul>
    );
  }
}

export default PastBooks;
