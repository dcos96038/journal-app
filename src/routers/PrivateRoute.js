import React from "react";
import {Redirect, Route} from "react-router";
import PropTypes from "prop-types";

export const PrivateRoute = ({isLoggedIn, component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      component={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/auth/login" />)}
    />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
