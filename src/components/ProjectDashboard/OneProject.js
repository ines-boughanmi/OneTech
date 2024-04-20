import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faEdit,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DeleteProject from "./DeleteProject";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OneMissionCard from "./OneMissionCard";

Chart.register(ArcElement, Tooltip, Legend, Title);

const OneProject = ({ project, reload, setReload }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const [missionsList, setMissionsList] = useState([]);




  const handleDeleteByProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(`http://localhost:3001/api/mission/removeByProject/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get(
          "http://localhost:3001/api/mission/getAll"
        );
        setMissionsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtredToDoMissions = missionsList.filter((mission) => {
    return mission.projectId === project.id && mission.progress === "To Do";
  });
  const filtredInProgressMissions = missionsList.filter((mission) => {
    return (
      mission.projectId === project.id && mission.progress === "In Progress"
    );
  });
  const filtredDoneMissions = missionsList.filter((mission) => {
    return mission.projectId === project.id && mission.progress === "Done";
  });

  useEffect(() => {
    fetchMissions();
  }, [missionsList.length, reload]);

  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await handleDeleteByProject(id);
        await axios.delete(`http://localhost:3001/api/project/remove/${id}`);
        handleCloseDelete();
        setReload(!reload);
        notify();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notify = () => {
    toast.success("Project Deleted", {
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
      const token = localStorage.getItem("token");
      if (token) {
        await axios.put(`http://localhost:3001/api/project/update/${id}`, body);
        setReload(!reload);
        handleCloseUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        data: [filtredToDoMissions.length, filtredInProgressMissions.length, filtredDoneMissions.length],
        backgroundColor: ["#44a5c2", "#f08700", "#014b7a"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="OneProject">
      <div className="projectTitle">
        <h2>{project.project_title}</h2>
        <div className="icons">
          <Link to={`/update/${project.id}`} state={{ project }}>
            <FontAwesomeIcon className="icon1" icon={faEdit} />
          </Link>
          <FontAwesomeIcon
            className="icon2"
            onClick={handleOpenDelete}
            icon={faTrash}
          />
        </div>
      </div>
      <div className="ProjectLayout">
        <div className="chart">
          <Doughnut data={data} />
        </div>
        <div className="missionsTable">
          <div className="ToDoSection">
            <h2 className="titleMissions">To Do</h2>
            <div className="missionList">
              {filtredToDoMissions.map((mission) => (
                <OneMissionCard
                  key={mission.id}
                  mission={mission}
                  reload={reload}
                  setReload={setReload}
                />
              ))}
            </div>
          </div>
          <div className="InProgressSection">
            <h2 className="titleMissions">In Progress</h2>
            {filtredInProgressMissions.map((mission) => (
              <OneMissionCard
                key={mission.id}
                mission={mission}
                reload={reload}
                setReload={setReload}
              />
            ))}
          </div>
          <div className="DoneSection">
            <h2 className="titleMissions">Done</h2>
            {filtredDoneMissions.map((mission) => (
              <OneMissionCard
                key={mission.id}
                mission={mission}
                reload={reload}
                setReload={setReload}
              />
            ))}
          </div>
        </div>
      </div>
      <DeleteProject
        project={project}
        open={openDelete}
        handleClose={handleCloseDelete}
        handleDelete={handleDeleteProject}
      />
      
    </div>
  );
};

export default OneProject;
