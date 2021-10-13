import {types} from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, action) => {
  if (action.type === types.uiSetError) {
    return {
      ...state,
      msgError: action.payload,
    };
  }

  if (action.type === types.uiRemoveError) {
    return {
      ...state,
      msgError: null,
    };
  }

  if (action.type === types.uiStartLoading) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === types.uiFinishLoading) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
