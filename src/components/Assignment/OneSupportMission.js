import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Assign from "./Assign";

const OneSupportMission = ({ mission,reload, setReload }) => {
  const [openUpdate,setOpenUpdate] = useState(false)

  const handleOpenUpdate = ()=> setOpenUpdate(true)
  const handleCloseUpdate = ()=> setOpenUpdate(false)
  return (
    <div className="supportCard">
    <div className="firstPart">
      <p>{mission.title}</p>
      <p>{mission.location}</p>
    </div>
    <div>
    <button className="button-Assign" onClick={handleOpenUpdate}>Assign</button>
    <Assign mission={mission} open={openUpdate} handleClose={handleCloseUpdate}/>
    </div>
  </div>
  )
}

export default OneSupportMission
