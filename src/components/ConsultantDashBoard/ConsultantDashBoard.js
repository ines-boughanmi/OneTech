import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileArrowDown,
  faKey,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./consultantDashBoard.css";
import OneMissionConsultant from "./OneMissionConsultant";
import OneMissionSupport from "./OneMissionSupport";

const ConsultantDashBoard = ({ user }) => {
  const [missionsList, setMissionsList] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(true);



  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm) {
        const data = await axios.get(
          `http://localhost:3001/api/mission/searchRecords/${searchTerm}`
        );
        data.data.reverse();
        setMissionsList(data.data);
      } else {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get(
          `http://localhost:3001/api/mission/getMissionsByUser/${user.id}`
        );
        setMissionsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtredSupportMissions = missionsList?.filter((mission) => {
    return mission.type === "support" && mission.progress !== "Done" && (mission.transport === "Bolt" || mission.transport === "Car") ;
  });

  const filtredNormalMissions = missionsList?.filter((mission) => {
    return mission.type === "normal" && mission.progress !== "Done" && (mission.transport === "Bolt" || mission.transport === "Car") ;
  });


  useEffect(()=>{
    fetchMissions()
  },[reload])
  return (
    <div className="Mission">
      <div className="searchGroup2">
        <div className="search-section3">
          <div className="container-search3">
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="search__btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                onClick={(e)=>{
                  e.preventDefault()
                  handleSearch(search)
                }}
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
      <div className="missionTitle">
        <p>Pages / Mission</p>
        <h1>Mission</h1>
      </div>
      <div className="Supportcards-container-consultant">
            <div className="SupportTitle">
              <h1>Support Missions</h1>
            </div>
            {filtredSupportMissions.length ? (
              <div className="Missioncards-container">
                {filtredSupportMissions.map((mission) => (
                  <OneMissionSupport
                    key={mission.id}
                    mission={mission}
                  />
                ))}
              </div>
            ) : (
              <div className="noSupport-container">
                <p className="noSupports">No Support Missions Available</p>
              </div>
            )}
          </div>


          <div className="Normalcards-container-consultant">
            <div className="NormalTitle">
              <h1>Normal Missions</h1>
            </div>
            {filtredNormalMissions.length ? (
              <div className="Missioncards-container">
                {filtredNormalMissions.map((mission) => (
                  <OneMissionConsultant
                    key={mission.id}
                    mission={mission}
                  />
                ))}
              </div>
            ) : (
              <div className="noSupport-container">
                <p className="noSupports">No Normal Missions Available</p>
              </div>
            )}
      </div>
    </div>
  );
};

export default ConsultantDashBoard;
