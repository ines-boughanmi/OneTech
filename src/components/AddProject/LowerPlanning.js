import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import OneMission from "./OneMission";

const LowerPlanning = ({start_date , reload , setReload}) => {
    const [user, setUser] = useState({});
    const projectId = useParams();
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [missions, setMissions] = useState([]);
    const [dates, setDates] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
  
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
  
    const addDate = (date, amount) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + amount);
      return newDate;
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
    const fetchMissions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await axios.get(
            `http://localhost:3001/api/mission/getByProject/${projectId.id}`
          );
          setMissions(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fillDates = () => {
      let date = new Date(start_date);
      let dates = [];
      for (let i = 0; i < 7; i++) {
        dates.push({ label: formatDate(date), value: formatDateValue(date) });
        date = addDate(date, 1);
      }
      setDates(dates);
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
    function dateDiffInDays(date1, date2) {
      const date1MS = new Date(date1);
      const date2MS = new Date(date2);
  
      const differenceMS = Math.abs(date1MS - date2MS);
  
      const differenceDays = Math.ceil(differenceMS / (1000 * 60 * 60 * 24)) + 1;
      return differenceDays;
    }

  
    useEffect(() => {
      getUser();
      fetchUsers();
      fetchMissions();
      fillDates();
    }, [missions.length, reload]);
  return (
    <div className="consultantTitle">
    <h2>Planning</h2>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Missions</th>
          <th scope="col">{formatDate(start_date)}</th>
          <th scope="col">{formatDate(addDate(start_date, 1))}</th>
          <th scope="col">{formatDate(addDate(start_date, 2))}</th>
          <th scope="col">{formatDate(addDate(start_date, 3))}</th>
          <th scope="col">{formatDate(addDate(start_date, 4))}</th>
          <th scope="col">{formatDate(addDate(start_date, 5))}</th>
          <th scope="col">{formatDate(addDate(start_date, 6))}</th>
        </tr>
      </thead>
      <tbody>
        {missions.map((mission, index) => {
          let length = dateDiffInDays(
            mission.start_date,
            mission.end_date
          );
          let start =
            formatDate(mission.start_date) === formatDate(start_date)
              ? 0
              : formatDate(mission.start_date) ===
                formatDate(addDate(start_date, 1))
              ? 1
              : formatDate(mission.start_date) ===
                formatDate(addDate(start_date, 2))
              ? 2
              : formatDate(mission.start_date) ===
                formatDate(addDate(start_date, 3))
              ? 3
              : formatDate(mission.start_date) ===
                formatDate(addDate(start_date, 4))
              ? 4
              : formatDate(mission.start_date) ===
                formatDate(addDate(start_date, 5))
              ? 5
              : formatDate(mission.start_date) ===
                formatDate(addDate(start_date, 6))
              ? 6
              : null;


          return (
            <OneMission
              key={index}
              mission={mission}
              length={length}
              start={start}
              color={"#05316A"}
            />
          );
        })}
      </tbody>
    </table>
  </div>
  )
}

export default LowerPlanning