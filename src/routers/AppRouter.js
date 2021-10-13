import {BrowserRouter as Router, Switch} from "react-router-dom";
import React from "react";
import {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import {useDispatch} from "react-redux";
import {useState} from "react";

import {JournalScreen} from "../components/journal/JournalScreen";
import {login} from "../actions/auth";
import {startSetNotes} from "../actions/notes";

import {AuthRouter} from "./AuthRouter";
import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startSetNotes(user.uid));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (checking) {
    return <h1>Cargando aplicacion...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute component={AuthRouter} isLoggedIn={isLoggedIn} path="/auth" />
          <PrivateRoute component={JournalScreen} isLoggedIn={isLoggedIn} path="/" />
        </Switch>
      </div>
    </Router>
  );
};
