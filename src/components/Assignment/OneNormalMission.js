import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Assign from "./Assign";

const OneNormalMission = ({ mission,reload, setReload }) => {
  const [openDelete,setOpenDelete] = useState(false)
  const [openUpdate,setOpenUpdate] = useState(false)

  const handleOpenUpdate = ()=> setOpenUpdate(true)
  const handleCloseUpdate = ()=> setOpenUpdate(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    const formattedDate = formattedDay + '/' + formattedMonth + '/' + year;
  
    return formattedDate;
  };

  return (
    <div className="normalCard">
    <div className="firstPart1">
      <p>{mission.title}</p>
      <p>{formatDate(mission.start_date)}</p>
      <p>{formatDate(mission.end_date)}</p>
      <p>{mission.location}</p>
    </div>
    <div>
    <button className="button-Assign" onClick={handleOpenUpdate}>Assign</button>
    <Assign mission={mission} open={openUpdate} handleClose={handleCloseUpdate}/>
    </div>
  </div>
  )
}

export default OneNormalMission
