import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OneMissionConsultant = ({mission}) => {
  return (
    <div className="ToDoCard">
        <div className="firstPart1">
          <p>{mission.title}</p>
          <p>{mission.start_date.substring(0,10)}</p>
          <p>{mission.end_date.substring(0,10)}</p>
        </div>
        <div className="icons">
        <Link to={`/mission/${mission.id}`}>
          <FontAwesomeIcon className="iconLittle" icon={faShare} />
          </Link>
        </div>
      </div>
  );
};

export default OneMissionConsultant;
