import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Branch from '../pages/Branch';
import Location from '../pages/Location';
import Product from '../pages/Product';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Moviments from '../pages/Moviments';
import WareHouse from '../pages/WareHouse';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <PrivateRoute exact path="/branch" component={Branch} />
      <PrivateRoute exact path="/location" component={Location} />
      <PrivateRoute exact path="/product" component={Product} />
      <PrivateRoute exact path="/moviments" component={Moviments} />
      <PrivateRoute exact path="/ware-house" component={WareHouse} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
