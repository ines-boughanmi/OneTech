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

const OneConsultantAssign = ({consultant}) => {
  return (
    <div className="oneCard">
        <div className="consultantProject">
          <div className="imageCircleConsultant1">
            <img src={consultant.image} alt="" />
          </div>
          <div className="consultant-layout">
            <p>{consultant.name + " " + consultant.lastname}</p>
            <p>{consultant.location}</p>
          </div>
        </div>
    </div>
  )
}

export default OneConsultantAssign
