import React from 'react';
import { Route } from 'react-router';
import Suggest from '../components/Suggest';
import App from '../App';

module.exports = (
  <div>
    <Route path="/" component={App} />
    <Route path="/suggest" component={Suggest} />
  </div>
);
