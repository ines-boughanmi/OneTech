import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const OneMissionConsultant = () => {
  return (
    <div className="ToDoCard">
        <div className="firstPart1">
          <p>Mission title</p>
          <p>Mission start_date</p>
          <p>Mission end_date</p>
        </div>
        <div className="icons">
        <Link to={`/mission/2`}>
          <FontAwesomeIcon className="iconLittle" icon={faShare} />
          </Link>
        </div>
      </div>
  );
};

export default OneMissionConsultant;
