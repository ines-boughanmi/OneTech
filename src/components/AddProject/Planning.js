import { useNavigate,useParams } from "react-router-dom";
import "./addProject.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "../SideNav/SideNav";
import AddMission from "./AddMission";

const Planning = () => {
    const [user, setUser] = useState({});
    const projectId  = useParams();
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
  

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
  
    const notifyError = () => {
      toast.error("check your Credentials", {
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
    const notify = () => {
      toast.success("Project Created Successfully", {
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
  
    useEffect(() => {
      getUser();
      fetchUsers();

    }, []);
  
    return (
      <div className="addProject">
        <SideNav user={user} />
        <div className="planningContainer">
          <div className="consultantTitle">
            <h1>Add Missions</h1>
          </div>
          <div className="inputSection2">
           
            <AddMission  projectId={projectId.id} users={users} />
  
            <div className="consultantTitle">
              <h2>Planning</h2>
            </div>
          </div>
  
          <div className="confirm">
            <button
              type="submit"
              className="button-addProject"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dash");
              }}
            >
              Done
            </button>
          </div>
          <ToastContainer
            bodyClassName="toast-container"
            progressClassName="progress-toast"
          />
        </div>
      </div>
    );
}

export default Planning
