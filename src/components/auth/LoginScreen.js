import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import validator from "validator";

import {useForm} from "../../hooks/useForm";
import {startGoogleLogin, startLogin} from "../../actions/auth";
import {startError, startRemoveError} from "../../actions/ui";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "diego@gmail.com",
    password: "123456",
  });

  const {email, password} = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startLogin(email, password));
      dispatch(startRemoveError());
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(startError("Email is required"));

      return false;
    }

    if (password.length < 6) {
      dispatch(startError("Password is required, it must contain at least 6 characters"));

      return false;
    }

    return true;
  };

  return (
    <>
      <h3 className="auth__title">LoginScreen</h3>
      <form className="animate__animated animate__fadeIn animate__faster" onSubmit={handleLogin}>
        <input
          autoComplete="off"
          className="auth__input"
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary pointer" disabled={loading} type="submit">
          Login
        </button>
        <hr />
        <div className="auth__login-google">
          <p>Login with Google:</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                alt="google button"
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>

          <Link className="mt-5 link" to="/auth/register">
            Create a new account
          </Link>
        </div>
      </form>
    </>
  );
};
