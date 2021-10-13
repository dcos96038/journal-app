import React from "react";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";

import {activeNote} from "../../actions/notes";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const JournalEntry = ({id, title, body, imgUrl, date}) => {
  const dispatch = useDispatch();
  const noteDate = dayjs(date);

  const handleEntryClick = (id) => {
    dispatch(activeNote(id, {title, body, imgUrl, date}));
  };

  return (
    <div
      className="journal__entry animate__animated animate__fadeIn animate__faster"
      onClick={() => handleEntryClick(id)}
    >
      <div className="journal__entry-left">
        {imgUrl && (
          <div
            className="journal__entry-picture"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${imgUrl})`,
            }}
          />
        )}
        <div className="journal__entry-body">
          <p className="journal__entry-title">{title}</p>
          <p
            className="journal__entry-content"
            style={{whiteSpace: "nowrap", overflow: "hidden", width: "200px", wordSpacing: "-1px"}}
          >
            {body}
          </p>
        </div>
      </div>

      <div className="journal__entry-date-box">
        <span>{days[noteDate.get("d")]}</span>
        <h4>{noteDate.get("D")}</h4>
      </div>
    </div>
  );
};
