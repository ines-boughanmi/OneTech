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
import axios from "axios";
import ConsultantDelete from "./ConsultantDelete";
import ConsultantUpdate from "./ConsultantUpdate";

const OneConsultant = ({ consultant,reload, setReload }) => {
  const [openDelete,setOpenDelete] = useState(false)
  const [openUpdate,setOpenUpdate] = useState(false)


  const handleOpenDelete = ()=> setOpenDelete(true)
  const handleCloseDelete = ()=> setOpenDelete(false)
  const handleOpenUpdate = ()=> setOpenUpdate(true)
  const handleCloseUpdate = ()=> setOpenUpdate(false)


  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        await axios.delete(`http://localhost:3001/api/user/remove/${id}`)
        handleCloseDelete()
        setReload(!reload)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (id,body) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
          await axios.put(
          `http://localhost:3001/api/user/update/${id}`,
          body
        );
        setReload(!reload)
        handleCloseUpdate()
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="oneCard">
      {consultant.role === "CONSULTANT" ? (
        <div className="consultantCard">
          <div className="imageCircleConsultant">
            <img src={consultant.image} alt="" />
          </div>
          <div className="consultant-layout">
            <p>{consultant.name+" " + consultant.lastname }</p>
            <div className="icons">
              <FontAwesomeIcon icon={faHourglass1} className="icon1" />
              <FontAwesomeIcon icon={faCheck} className="icon1" />
              <FontAwesomeIcon icon={faPen} onClick={handleOpenUpdate} className="icon1" />
              <FontAwesomeIcon icon={faTrash} onClick={handleOpenDelete} className="icon2" />
            </div>
          </div>
          <ConsultantDelete consultant={consultant} open={openDelete} handleClose={handleCloseDelete} handleDelete={handleDelete}  />
          <ConsultantUpdate consultant={consultant} open={openUpdate} handleClose={handleCloseUpdate} handleUpdate={handleUpdate} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OneConsultant;