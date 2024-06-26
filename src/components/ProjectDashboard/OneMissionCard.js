import React, {  useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFile, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./projectDashboard.css";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteMission from "./DeleteMission";
import UpdateMission from "./UpdateMission";

const OneMissionCard = ({ mission, reload, setReload,dates , project , missions  }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("http://localhost:3001/api/user/getAll");
        setUsers(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

    return formattedDate;
  };

  const handleDeleteMission = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(`http://localhost:3001/api/mission/remove/${id}`);
        handleCloseDelete();
        setReload(!reload);
        notify();
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

  const handleUpdateMission = async (id, body) => {
    try {
      if (!body.title || !body.description || !body.start_date || !body.end_date || !body.location.label || !body.users) {
        notifyRequired();
        return;
      }
      const token = localStorage.getItem("token");
      if (token) {
        await axios.put(`http://localhost:3001/api/mission/update/${id}`, {
          title: body.title,
          description: body.description,
          start_date: body.start_date,
          end_date: body.end_date,
          location: body.location.label,
          users: body.users,
        });
        notifyUpdate();
        setReload(!reload);
        handleCloseUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const notify = () => {
    toast.success("Mission Deleted", {
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

  const notifyUpdate = () => {
    toast.success("Mission Updated", {
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
    <div className="ToDoCard">
      <div className="firstPart1">
        <p>{mission.title}</p>
        <p>{formatDate(mission.start_date)}</p>
        <p>{formatDate(mission.end_date)}</p>
      </div>
      <div className="icons">
          {
            mission.progress === "Done" ? 
            <FontAwesomeIcon className="iconLittle"  onClick={(e)=>{
              window.open(mission.file)
            }} icon={faFile} />
            : <></>
          }
        <FontAwesomeIcon className="iconLittle" onClick={handleOpenUpdate} icon={faPen} />
        <FontAwesomeIcon
          className="iconLittle"
          onClick={handleOpenDelete}
          icon={faTrash}
        />
      <DeleteMission
        mission={mission}
        open={openDelete}
        handleClose={handleCloseDelete}
        handleDelete={handleDeleteMission}
      />
      <UpdateMission
        users={users}
        mission={mission}
        open={openUpdate}
        handleClose={handleCloseUpdate}
        handleUpdateMission={handleUpdateMission}
        dates={dates}
        missions={missions}
        reload={reload}
        setReload={setReload}
      />
      </div>

    </div>
  );
};

export default OneMissionCard;
