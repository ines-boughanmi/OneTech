import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCircleInfo,
  faEdit,
  faInfo,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LowerPlanning from "../AddProject/LowerPlanning";

const OneSchedule = ({project}) => {
  return (
    <div className="OneProject">
      <div className="projectTitle">
        <h2>{project.project_title}</h2>
      </div>
      <LowerPlanning  project={project} start_date={project.start_date}/>
    </div>
  )
}

export default OneSchedule