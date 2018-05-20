import React from 'react';
import decode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';
import HomePage from "../components/HomePage";

// If jwt is not able to decode token, then user is redirected to login
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    decode(token);
    decode(refreshToken);
    return true;
  }
  catch (err) {
    return false;
  }
};

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={ props =>
      isAuthenticated() ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <HomePage/>
      )
    }
  />
);

export default PrivateRoute;