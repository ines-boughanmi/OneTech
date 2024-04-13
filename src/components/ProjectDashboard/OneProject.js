import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DeleteProject from "./DeleteProject";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


Chart.register(ArcElement, Tooltip, Legend, Title);

const OneProject = ({project, reload , setReload}) => {
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
        await axios.delete(`http://localhost:3001/api/project/remove/${id}`)
        handleCloseDelete()
        setReload(!reload)
        notify()
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  const handleUpdate = async (id,body) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
          await axios.put(
          `http://localhost:3001/api/project/update/${id}`,
          body
        );
        setReload(!reload)
        handleCloseUpdate()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const data = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "My First Dataset",
        data: [100, 100, 100],
        backgroundColor: ["rgb(250, 55, 55)", "#f08700", "green"],
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
        <FontAwesomeIcon className="icon1"icon={faEdit} />
        </Link>
        <FontAwesomeIcon className="icon2" onClick={handleOpenDelete} icon={faTrash} />
        </div>
      </div>
      <div className="ProjectLayout">
      <div className="chart">
        <Doughnut data={data} />
      </div>
      </div>
      <DeleteProject project={project} open={openDelete} handleClose={handleCloseDelete} handleDelete={handleDelete}  />
    </div>
  );
};

export default OneProject;
