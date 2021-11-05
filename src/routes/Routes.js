import React from 'react';
import { Route, Switch } from 'react-router';
import Login from '../pages/Login';
import Foods from '../pages/Foods';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
    </Switch>
  );
}

export default Routes;
