import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "../SideNav/SideNav";
import AddMission from "../AddProject/AddMission";
import Planning from "../AddProject/Planning";
import LowerPlanning from "../AddProject/LowerPlanning";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import OneConsultantProject from "./OneConsultantProject";
Chart.register(ArcElement, Tooltip, Legend, Title);

const InformationProject = () => {
  const [user, setUser] = useState({});

  const location = useLocation();
  const project = location.state.project;
  const [id, setId] = useState(project.projectId);
  const [title, setTitle] = useState(project.project_title);
  const [description, setDescription] = useState(project.description);
  const [budget, setBudget] = useState(project.budget);
  const [startDate, setStartDate] = useState(project.start_date);
  const [finishDate, setFinishDate] = useState(project.finish_date);

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [missionsList, setMissionsList] = useState([]);

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
          `http://localhost:3001/api/project/update/${project.id}`,
          {
            ...body,
            finish_date: addWeekToDate(body.start_date),
          }
        );
        notify();
        navigate("/dash");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const calculatePercentage = (number, total) => {
    if (typeof number !== "number" || typeof total !== "number") {
      throw new Error("Both arguments must be numbers");
    }

    if (total === 0) {
      return 0;
    }

    const percentage = ((number / total) * 100).toFixed(2);
    return percentage;
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
  const data = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        data: [
          calculatePercentage(filtredToDoMissions.length, missionsList.length),
          calculatePercentage(
            filtredInProgressMissions.length,
            missionsList.length
          ),
          calculatePercentage(filtredDoneMissions.length, missionsList.length),
        ],
        backgroundColor: ["#44a5c2", "#f08700", "#014b7a"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <div className="addProject">
      <SideNav user={user} />
      <div className="informationContainer">
        <div className="consultantTitle">
          <h1>Project Details</h1>
        </div>
        <div className="informationLayout">
          <div className="chart">
            <Doughnut data={data} />
          </div>
          <div className="inputSection2">
            <div className="inputLineLocation2">
              <div className="inputItemLocation2">
                <p>
                  Title :
                </p>
                <input
                  type="text"
                  value={title}
                  disabled/>
              </div>
            </div>

            <div className="inputLineLocation2">
              <div className="inputItemLocation2">
                <p>
                  Start Date :
                </p>
                <input
                  type="date"
                  value={formatDateValue(startDate)}
                  disabled/>
              </div>
            </div>

            <div className="inputLineLocation2">
              <div className="inputItemLocation2">
                <p>
                  Finish Date :
                </p>
                <input
                  type="date"
                  value={formatDateValue(finishDate)}
                  disabled/>
              </div>
            </div>
            <div className="inputLineLocationBudget">
              <div className="inputItemLocation2">
                <p>
                  Budget:
                </p>
                <div className="budget">
                  <input
                    type="text"
                    value={budget}
                    disabled/>
                  <h4>TND</h4>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="inputLineLocation2">
              <div className="inputItemLocation2">
                <p>
                  Description :
                </p>
                <textarea
                  className="textarea"
                  placeholder="Enter Description here..."
                  value={description}
                  disabled/>
              </div>
            </div>
            <div className="inputLineLocation2">
              <div className="inputItemLocation2">
                <p>
                  Human Resources :
                </p>
                <OneConsultantProject/>
              </div>
            </div>

          <div className="consultantTitle">
            <LowerPlanning start_date={startDate} />
          </div>
      </div>
    </div>
  );
};

export default InformationProject;
