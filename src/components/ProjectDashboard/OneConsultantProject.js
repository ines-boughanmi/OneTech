import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faEyeSlash,
  faHourglass,
  faHourglass1,
  faPen,
  faTrash,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UpdateConsultant from "../Consultants/UpdateConsultant";

const OneConsultantProject = ({user}) => {
  return (
<div className="oneCard">
     
        <div className="consultantProject">
          <div className="imageCircleConsultant1">
            <img src={user.image} alt="https://static.thenounproject.com/png/1876981-200.png" />
          </div>
          <div className="consultant-layout">
            <p>{user.name + " " + user.lastname}</p>
          </div>
        </div>
    </div>
  )
}

export default OneConsultantProject
