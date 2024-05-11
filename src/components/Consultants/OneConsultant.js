import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHourglass1,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ConsultantDelete from "./ConsultantDelete";
import UpdateConsultant from "./UpdateConsultant";

const OneConsultant = ({ consultant, reload, setReload }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(`http://localhost:3001/api/user/remove/${id}`);
        handleCloseDelete();
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notifyRequired = () => {
    toast.error("Please fill all required fields", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleUpdate = async (id, body) => {
    try {
      if (!body.name || !body.lastName || !body.email || !body.phone || !body.image || !body.location) {
        notifyRequired();
        return;
      }
      const token = localStorage.getItem("token");
      if (token) {
        if(body.password){
          await axios.put(`http://localhost:3001/api/user/update/${id}`, {
            name : body.name ,
            lastname : body.lastName ,
            email : body.email,
            phone : body.phone ,
            image : body.image,
            location : body.location.label,
            password:body.password
          });
          notifyConsultantUpdate();
          setReload(!reload);
          handleCloseUpdate();
        }
        else{
          await axios.put(`http://localhost:3001/api/user/update/${id}`, {
            name : body.name ,
            lastname : body.lastName ,
            email : body.email,
            phone : body.phone ,
            image : body.image,
            location : body.location.label
          });
          notifyConsultantUpdate();
          setReload(!reload);
          handleCloseUpdate();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateValidity = async (id, body) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.put(`http://localhost:3001/api/user/update/${id}`, body);
        setReload(!reload);
        handleCloseUpdate();
        if(body.validity){
          notifyValidityUpdate();
        }
        else{
          notifyValidityUpdate2();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notifyConsultantUpdate = () => {
    toast.success("Consultant Updated", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyValidityUpdate = () => {
    toast.success("User is Now Valid", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyValidityUpdate2 = () => {
    toast.success("User is Now Not Valid", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="oneCard">
      {consultant.role === "CONSULTANT" ? (
        <div className="consultantCard">
          <div className="imageCircleConsultant">
            <img src={consultant.image} alt="" />
          </div>
          <div className="consultant-layout">
            <p>{consultant.name + " " + consultant.lastname}</p>
            <div className="icons">
              {consultant.validity ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="check-green"
                  onClick={(e) => {
                    handleUpdateValidity(consultant.id, {
                      validity: !consultant.validity,
                    });
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHourglass1}
                  className="wait-yellow"
                  onClick={(e) => {
                    handleUpdateValidity(consultant.id, {
                      validity: !consultant.validity,
                    })
                  }}
                />
              )}

              <FontAwesomeIcon
                icon={faPen}
                onClick={handleOpenUpdate}
                className="icon1"
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleOpenDelete}
                className="icon2"
              />
            </div>
          </div>
          <ConsultantDelete
            consultant={consultant}
            open={openDelete}
            handleClose={handleCloseDelete}
            handleDelete={handleDelete}
          />
          <UpdateConsultant
            consultant={consultant}
            open={openUpdate}
            handleClose={handleCloseUpdate}
            handleUpdate={handleUpdate}
          />
          <ToastContainer
            bodyClassName="toast-container"
            progressClassName="progress-toast"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OneConsultant;
