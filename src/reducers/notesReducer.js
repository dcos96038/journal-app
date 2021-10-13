// {
//   notes: [],
//   active: null,
//   active: {
//     id: '1234567',
//     title: 'Title',
//     body: 'Content',
//     imageUrl: 'url',
//     date: 1234567,
//   }
// }

import {types} from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  if (action.type === types.notesActiveNote) {
    return {
      ...state,
      active: {
        ...action.payload,
      },
    };
  }

  if (action.type === types.notesNewNote) {
    return {
      ...state,
      notes: [action.payload, ...state.notes],
    };
  }

  if (action.type === types.notesLoad) {
    return {
      ...state,
      notes: [...action.payload],
    };
  }

  if (action.type === types.notesRefresh) {
    return {
      ...state,
      notes: state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload.note;
        }

        return note;
      }),
    };
  }

  if (action.type === types.notesDeleteNote) {
    return {
      ...state,
      active: null,
      notes: state.notes.filter((note) => note.id !== action.payload),
    };
  }

  if (action.type === types.notesLogoutClean) {
    return {
      ...state,
      active: null,
      notes: [],
    };
  }

  return state;
};
