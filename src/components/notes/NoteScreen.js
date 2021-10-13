import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {activeNote, startDeleting} from "../../actions/notes";
import {useForm} from "../../hooks/useForm";

import {NotesAppBar} from "./NotesAppBar";

export const NoteScreen = () => {
  const {active: note} = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [formValues, handleInputChange, reset] = useForm(note);

  const {title, body, id} = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (activeId.current !== note.id) {
      reset(note);
      activeId.current = note.id;
    }
  }, [reset, note]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, {...formValues}));
  }, [dispatch, formValues]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          className="notes__input-title"
          name="title"
          placeholder="Enter a title"
          type="text"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          className="notes__textarea"
          name="body"
          placeholder="Enter some journal description"
          value={body}
          onChange={handleInputChange}
        />
        {note.imgUrl && (
          <div className="notes__image">
            <img alt="persona" src={note.imgUrl} />
          </div>
        )}
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
