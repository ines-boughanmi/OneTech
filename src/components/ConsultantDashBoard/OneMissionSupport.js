import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
const OneMissionSupport = ({mission}) => {
  return (
        <div className="supportCard">
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
}

export default OneMissionSupport