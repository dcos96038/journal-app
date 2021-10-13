import React from "react";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";

import {startSaveNotes, startUploadImage} from "../../actions/notes";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const NotesAppBar = () => {
  const {active} = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const time = dayjs();

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(startSaveNotes(active));
  };

  const handlePictureAdd = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      dispatch(startUploadImage(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>{`${months[time.get("month")]} ${time.get("date")}, ${time.get("year")}`}</span>
      <input
        id="fileSelector"
        name="file"
        style={{display: "none"}}
        type="file"
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureAdd}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
