import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import validator from "validator";

import {startRegister} from "../../actions/auth";
import {startError, startRemoveError} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [{name, email, password, confirmPassword}, handleInputChange] = useForm({
    name: "diego",
    email: "diego@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegister(email, password, name));
      dispatch(startRemoveError());
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(startError("Name is required"));

      return false;
    }
    if (!validator.isEmail(email)) {
      dispatch(startError("Email is required"));

      return false;
    }

    if (password.length < 6) {
      dispatch(startError("The password must contain at least 6 characters"));

      return false;
    }

    if (password !== confirmPassword) {
      dispatch(startError("Passwords don't match"));

      return false;
    }

    return true;
  };

  return (
    <>
      <h3 className="auth__title">RegisterScreen</h3>
      <form className="animate__animated animate__fadeIn animate__faster" onSubmit={handleRegister}>
        <input
          autoComplete="off"
          className="auth__input"
          name="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          className="auth__input"
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary pointer mt-1" type="submit">
          Register
        </button>
        <hr />
        <div className="mt-5 auth__already-registered">
          <Link className="link" to="/auth/login">
            Already registered?
          </Link>
        </div>
      </form>
    </>
  );
};
