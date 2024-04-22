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

const OneConsultantProject = () => {
  return (
<div className="oneCard">
     
        <div className="consultantProject">
          <div className="imageCircleConsultant1">
            <img src="https://static.thenounproject.com/png/1876981-200.png" alt="" />
          </div>
          <div className="consultant-layout">
            <p>Test test</p>
          </div>
        </div>
    </div>
  )
}

export default OneConsultantProject
