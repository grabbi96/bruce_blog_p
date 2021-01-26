import React from 'react';

import { Redirect, Route } from 'react-router-dom';

export const UserPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Redirect
          to={{
            pathname: '/admin',
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);
