import React from "react";
import {Redirect, Route, Switch} from "react-router";

import {LoginScreen} from "../components/auth/LoginScreen";
import {RegisterScreen} from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Switch>
          <Route component={LoginScreen} path="/auth/login" />
          <Route component={RegisterScreen} path="/auth/register" />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};
