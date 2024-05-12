import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "../SideNav/SideNav";
import AddMission from "../AddProject/AddMission";
import LowerPlanning from "../AddProject/LowerPlanning";

const UpdateProject = () => {
  const [user, setUser] = useState({});

  const location = useLocation();
  const project = location.state.project;
  const [title, setTitle] = useState(project.project_title);
  const [description, setDescription] = useState(project.description);
  const [budget, setBudget] = useState(project.budget);
  const [startDate, setStartDate] = useState(project.start_date);
  const [dates, setDates] = useState([]);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

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

  useEffect(() => {
    getUser();
    fetchUsers();
  }, [reload]);



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

  const handleTitleError = () => {
    if (!title.length) {
      setErrors({
        ...errors,
        titleError: "Title is required",
      });
    } else if (title.length < 3){
      setErrors({
       ...errors,
        titleError: "Title must be at least 3 characters long",
      });
    } 
    else {
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
    } else if (isNaN(Number(budget))){
      setErrors({
       ...errors,
         budgetError: "Budget must be a number",
      });
    } 
    else if (!(Number(budget) < 20000 && Number(budget) > 5000)){
      setErrors({
       ...errors,
         budgetError: "Budget must be between 5000 and 20000",
      });
    }
    else {
      setErrors({
        ...errors,
         budgetError: "",
      });
    }
  }

  const handleDescriptionError = () => {
    if (!description.length) {
      setErrors({
       ...errors,
        descriptionError: "Description is required",
      });
    } else {
      setErrors({
       ...errors,
        descriptionError: "",
      });
    }
  }

  const addWeekToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    return newDate;
  };

  const notifyRequired = () => { 
    if(!title || !description || !budget || !startDate){
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
    } else if (errors.titleError){
      toast.error(errors.titleError, {
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
    else if (errors.budgetError){
      toast.error(errors.budgetError, {
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
    else if (errors.descriptionError){
      toast.error(errors.descriptionError, {
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
  }

  const handleUpdate = async (body) => {
    try {
      if (!body.project_title || !body.description || !body.budget) {
        notifyRequired();
        return;
      }
      else if (Object.keys(errors).length){
        notifyRequired();
      }
      if(!errors.titleError && !errors.descriptionError && !errors.startDateError && !errors.budgetError){
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
          setTimeout(() => {
            navigate("/dash");
          }, 800);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fillDates();
  },[]);

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
                value={formatDateValue(startDate)}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                onBlur={()=>{
                  handleStartDateError()
                }}
                disabled
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
                  placeholder="5000 - 20000"
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
                onBlur={()=>{
                  handleBudgetError()
                }}
              />
            </div>
          </div>
          <AddMission
            projectId={project.id}
            users={users}
            dates={dates}
            reload={reload}
            setReload={setReload}
            setDates={setDates}
          />

          <div className="consultantTitle">
            <LowerPlanning
              start_date={startDate}
              reload={reload}
              setReload={reload}
            />
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
