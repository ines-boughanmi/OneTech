import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./projectDashboard.css"

const OneMissionCard = () => {
  return (
    <div className="ToDoCard">
    <div className="firstPart1">
      <p>title</p>
      <p>jj/mm/aaaa</p>
      <p>jj/mm/aaaa</p>
    </div>
    <div className="icons">
      <FontAwesomeIcon className="iconLittle" icon={faPen} />
      <FontAwesomeIcon
        className="iconLittle"
        icon={faTrash}
      />
    </div>
  </div>
  )
}

export default OneMissionCard
