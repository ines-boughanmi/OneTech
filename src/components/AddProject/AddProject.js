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
  const [projectId, setId] = useState(generateRandomInteger());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function generateRandomInteger() {
    return Math.floor(Math.random() * 1000000000);
  };
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

  const handleTitleError = () => {
    if (!title.length) {
      setErrors({
        ...errors,
        titleError: "Title is required",
      });
    } else {
      setErrors({
        ...errors,
        titleError: "",
      });
    }
  };

  const handleStartDateError = () => {
    if (!startDate.length) {
      setErrors({
        ...errors,
        startDateError: "Start Date is required",
      });
    } else {
      setErrors({
        ...errors,
        startDateError: "",
      });
    }
  };

  const handleBudgetError = () =>{
    if (!budget.length) {
      setErrors({
        ...errors,
         budgetError: "Budget is required",
      });
    } else {
      setErrors({
        ...errors,
         budgetError: "",
      });
    }
  }

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
  
  }

  const addWeekToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    console.log(newDate);
    return newDate;
  };

  const handleAdd = async (body) => {
    try {
      if (!body.project_title || !body.description || !body.budget || !body.start_date) {
        notifyRequired();
        return; 
      }
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post("http://localhost:3001/api/project/create", {
          ...body,
          finish_date: addWeekToDate(body.start_date),
        });
        notify();
        navigate(`/planning/${projectId}`,{state : {start_date : startDate}});
        
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="AddContainer">
        <div className="consultantTitle">
          <h1>Add New Project</h1>
        </div>
        <div className="inputSection2">
          <div className="inputLineLocation2">
            <div className="inputItemLocation2">
              <p>
                Title<span>*</span>
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                onBlur={(e) => {
                  handleTitleError();
                }}
              />
              {errors.titleError ? (
                <small className="text-danger">{errors.titleError}</small>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="inputLineLocation2">
            <div className="inputItemLocation2">
              <p>
                Start Date<span>*</span>
              </p>
              <input
                type="date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                value={startDate}
                onBlur={(e) => {
                  handleStartDateError();
                }}
              />
              {errors.startDateError ? (
                <small className="text-danger">{errors.startDateError}</small>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="inputLineLocationBudget">
            <div className="inputItemLocation2">
              <p>
                Budget<span>*</span>
              </p>
              <div className="budget">
                <input
                  type="text"
                  onChange={(e) => {
                    setBudget(e.target.value);
                  }}
                  value={budget}
                  onBlur={(e) => {
                    handleBudgetError();
                  }}
                />
                <h4>TND</h4>
              </div>
              {errors.budgetError ? (
                <small className="text-danger">{errors.budgetError}</small>
              ) : (
                <></>
              )}
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
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
          </div>
        </div>

        <div className="confirm">
          <button
            type="submit"
            className="button-addProject"
            onClick={(e) => {
              e.preventDefault();
              handleAdd({
                id:projectId,
                project_title: title,
                description,
                budget,
                start_date: startDate,
              });
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
