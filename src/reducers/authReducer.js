// {
//   uid: "asdajksdkjasd",
//   name: 'diego',
// }

import {types} from "../types/types";

export const authReducer = (state = {}, action) => {
  if (action.type === types.login) {
    return {
      uid: action.payload.uid,
      name: action.payload.displayName,
    };
  }
  if (action.type === types.logout) {
    return {};
  }

  return state;
};
