import {addDoc, collection, deleteDoc, doc, updateDoc} from "@firebase/firestore";
import Swal from "sweetalert2";

import {db} from "../firebase/firebaseConfig";
import {imageUpload} from "../helpers/imageUpload";
import {loadNotes} from "../helpers/loadNotes";
import {types} from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  };
};

export const activeNote = (id, note) => {
  return {
    type: types.notesActiveNote,
    payload: {
      id,
      ...note,
    },
  };
};

export const addNewNote = (id, note) => {
  return {
    type: types.notesNewNote,
    payload: {
      id,
      ...note,
    },
  };
};

export const startSetNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};

export const startSaveNotes = (note) => {
  return async (dispatch, getState) => {
    const {uid} = getState().auth;

    if (!note.imgUrl) {
      delete note.imgUrl;
    }

    const noteToFirestore = {...note};

    delete noteToFirestore.id;

    await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);
    dispatch(refreshNotes(note.id, noteToFirestore));
    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNotes = (id, note) => {
  return {
    type: types.notesRefresh,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};

export const startUploadImage = (file) => {
  return async (dispatch, getState) => {
    const {active: activeNote} = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const imgUrl = await imageUpload(file);

    activeNote.imgUrl = imgUrl;

    dispatch(startSaveNotes(activeNote));

    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    Swal.fire({
      title: "Deleting note...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));

    dispatch(deleteNote(id));
    Swal.fire("Deleted", "Note deleted with success", "info");
  };
};

export const deleteNote = (id) => {
  return {
    type: types.notesDeleteNote,
    payload: id,
  };
};

export const notesLogout = () => {
  return {
    type: types.notesLogoutClean,
  };
};
