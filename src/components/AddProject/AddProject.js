import { useNavigate } from "react-router-dom";
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

const AddProject = () => {
  const [user, setUser] = useState({});

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
    toast.success("Profile Updated", {
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
  }, []);

  return (
    <div className="addProject">
      <SideNav user={user} />
      <div className="projectContainer">
        <div className="consultantTitle">
          <h1>Add New Project</h1>
        </div>
        <div className="inputSection2">
          <div className="inputLineLocation2">
            <div className="inputItemLocation2">
              <p>
                Title<span>*</span>
              </p>
              <input type="text" />
            </div>
          </div>
          <div className="inputLineLocation2">
            <div className="inputItemLocation2">
              <p>
                Start Date<span>*</span>
              </p>
              <input type="date" />
            </div>
          </div>
          <div className="inputLineLocationBudget">
            <div className="inputItemLocation2">
              <p>
                Budget<span>*</span>
              </p>
              <div className="budget">
                <input type="text" />
                <h4>TND</h4>
              </div>
            </div>
          </div>
          <div className="inputLineLocation2">
            <div className="inputItemLocation2">
              <p>
                Description<span>*</span>
              </p>
              <textarea
                className="textarea"
                placeholder="Enter Description here..."
              />
            </div>
          </div>
          <AddMission/>


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
            }}
          >
            Add
          </button>
        </div>
        <ToastContainer
          bodyClassName="toast-container"
          progressClassName="progress-toast"
        />
      </div>
    </div>
  );
};

export default AddProject;
