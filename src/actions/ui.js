import Swal from "sweetalert2";

import {types} from "../types/types";

export const setError = (error) => ({
  type: types.uiSetError,
  payload: error,
});

export const removeError = () => ({
  type: types.uiRemoveError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});

export const startError = (error) => {
  return (dispatch) => {
    Swal.fire("Error", error, "error");
    dispatch(setError(error));
  };
};

export const startRemoveError = () => {
  return (dispatch) => {
    dispatch(removeError());
  };
};
