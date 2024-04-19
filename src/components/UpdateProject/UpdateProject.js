import { useNavigate, useLocation  } from "react-router-dom";
import "./updateProject.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "../SideNav/SideNav";
import AddMission from "../AddProject/AddMission";

const UpdateProject = () => {
  const [user, setUser] = useState({});

  const location = useLocation();
  const project = location.state.project;
  const[id,setId] = useState(project.projectId);
  const [title, setTitle] = useState(project.project_title);
  const [description, setDescription] = useState(project.description);
  const [budget, setBudget] = useState(project.budget);
  const [startDate, setStartDate] = useState(project.start_date);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    fetchUsers();
    console.log(project.id);
  }, []);

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

  const handleBudgetError = () => {
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
  };

  const addWeekToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    return newDate;
  };

  const handleUpdate = async (body) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.put(
            `http://localhost:3001/api/project/update/${project.id}`,{
                ...body,
                finish_date: addWeekToDate(body.start_date),
              });
              notify();
              navigate("/dash");

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
    toast.success("Project Updated", {
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

  return (
    <div className="addProject">
      <SideNav user={user} />
      <div className="projectContainer">
        <div className="consultantTitle">
          <h1>Update Project</h1>
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
          <AddMission projectId={project.id} users={users} />

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
              handleUpdate({
                project_title: title,
                description,
                budget,
                start_date: startDate,
              });
            }}
          >
        Update
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

export default UpdateProject;
