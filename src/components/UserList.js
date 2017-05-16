import React, { Component } from 'react';

class UserList extends Component {
  render() {
    return (
      <ul className="user-list">
      	<li className="user-list__user">
      		<span className="user-list__name">
      			Mike Quinn
      		</span>
      	</li>
      	<li className="user-list__user">
      		<span className="user-list__name">
      			Sara Taylor
      		</span>
      	</li>
      </ul>
    );
  }
}

export default UserList;
