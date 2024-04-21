import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./projectDashboard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faEyeSlash,
  faPen,
  faTrash,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OneProject from "./OneProject";
import AddMission from "../AddProject/AddMission";
import AddSupportMission from "../AddProject/AddSupportMission";

const ProjectDashBoard = () => {
  const [project, setProject] = useState({});
  const [user, setUser] = useState({});
  const [projectsList, setProjectsList] = useState([]);
  const [reload, setReload] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');


  const handleSearch = async (searchTerm) => {
    try {
      if(searchTerm){
        const data = await axios.get(`http://localhost:3001/api/project/search/${searchTerm}`)
        data.data.reverse()
      setProjectsList(data.data);
      }else{
        setReload(!reload)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get(
          "http://localhost:3001/api/project/getAll"
        );
        console.log(data.data);
        data.data.reverse();
        setProjectsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // getProject();
    fetchProjects();
    fetchUsers();
  }, [reload]);

  // const getProject = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const data = await axios.get(
  //         "http://localhost:3001/api/project/getOne",
  //         {
  //           headers: {
  //             authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setProject(data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get("http://localhost:3001/api/user/getOne", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("http://localhost:3001/api/user/getAll");
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="projects">
      <div className="searchGroup">
        <div className="search-section3">
          <div className="container-search3">
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="search__btn" onClick={(e)=>{
              e.preventDefault()
              handleSearch(search)
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#efeff1"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="userLayout">
          <FontAwesomeIcon className="iconBell" icon={faBell} />
          <div className="imageCircleUser">
            <img src={user.image} alt="" />
          </div>
        </div>
      </div>
      <div className="projectsContainer">
        <div className="consultantTitle">
          <p>Pages / Projects</p>
          <h1>Projects</h1>
        </div>
        <div className="button-right">
          <AddSupportMission users={users} />
          <Link to="/add">
            <button className="button-addProject1">+ Project</button>
          </Link>
        </div>
        <div className="projectContent">

          {projectsList.slice(0,5).map((project) => (
            <OneProject
              key={project.id}
              project={project}
              reload={reload}
              setReload={setReload}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashBoard;
