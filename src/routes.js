import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Pokemons from './components/Pokemons';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Pokemons}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
