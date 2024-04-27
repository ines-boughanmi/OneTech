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
import DeleteProject from "./DeleteProject";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
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
  const [dates, setDates] = useState([]);




  const formatDateValue = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = year + "-" + formattedMonth + "-" + formattedDay;

    return formattedDate;
  };
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
  const addDate = (date, amount) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  };

  const fillDates = () => {
    let date = new Date(project.start_date);
    let dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push({ label: formatDate(date), value: formatDateValue(date) });
      date = addDate(date, 1);
    }
    setDates(dates);
  };


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
          `http://localhost:3001/api/mission/getByProject/${project.id}`
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
  const  calculatePercentage = (number, total) => {
    if (typeof number !== 'number' || typeof total !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
  
    if (total === 0) {
      return 0
    }
  
    const percentage = ((number / total) * 100).toFixed(2);
    return percentage;
  }

  const data = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        data: [calculatePercentage(filtredToDoMissions.length,missionsList?.length), calculatePercentage(filtredInProgressMissions.length,missionsList?.length), calculatePercentage(filtredDoneMissions.length,missionsList?.length)],

        backgroundColor: ["#44a5c2", "#f08700", "#014b7a"],
        hoverOffset: 4,
      },
    ],
  };
  useEffect(() => {
    fetchMissions();
    fillDates();
  }, [missionsList.length, reload]);
  return (
    <div className="OneProject">
      <div className="projectTitle">
        <h2>{project.project_title}</h2>
        <div className="icons">
        <Link to={`/information/${project.id}`} state={{ project }}>
            <FontAwesomeIcon className="icon1" icon={faCircleInfo} />
          </Link>
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
                  dates={dates}
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
                dates={dates}
                project={project}
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
                dates={dates}
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
