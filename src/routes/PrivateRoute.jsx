import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = async () => {
  const loggedUser = await localStorage.getItem('auth-estoque');
  if (!loggedUser) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
