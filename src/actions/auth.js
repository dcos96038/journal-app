import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import Swal from "sweetalert2";

import {googleAuthProvider} from "../firebase/firebaseConfig";
import {types} from "../types/types";

import {notesLogout} from "./notes";
import {finishLoading, startError, startLoading} from "./ui";

export const startLogin = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        dispatch(finishLoading());
        if (err.message.includes("auth/user-not-found")) {
          dispatch(startError("User not found"));
        }
        if (err.message.includes("auth/wrong-password")) {
          dispatch(startError("Invalid password"));
        }
      });
  };
};

export const startRegister = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({user}) => {
        await updateProfile(user, {displayName: name});

        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        if (err.message.includes("auth/email-already-in-use")) {
          Swal.fire("Error", "Email is already in use", "error");
        }
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();

    signInWithPopup(auth, googleAuthProvider).then(({user}) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();

    await signOut(auth);
    dispatch(logout());
    dispatch(notesLogout());
  };
};
