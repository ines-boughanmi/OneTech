import { useNavigate } from "react-router-dom";
import "./assignment.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "../SideNav/SideNav";
import OneNormalMission from "./OneNormalMission";
import OneSupportMission from "./OneSupportMission";

const Assignment = () => {
  const [user, setUser] = useState({});
  const [missionsList, setMissionsList] = useState([]);
  const [reload, setReload] = useState(true);

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

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get(
          "http://localhost:3001/api/mission/getAll"
        );
        setMissionsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtredSupportMissions = missionsList.filter((mission) => {
    return mission.type === "support" && mission.progress === "To Do" && mission.transport === "None" ;
  });

  const filtredNormalMissions = missionsList.filter((mission) => {
    return mission.type === "normal" && mission.progress === "To Do" && mission.transport === "None" ;
  });

  useEffect(() => {
    getUser();
    fetchMissions();
  }, [missionsList.length, reload]);
  return (
    <div  className="assignment">
      <SideNav user={user} />
      <div className="searchGroup1">
        <div className="search-section2">
          <div className="container-search2">
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Search"
            />
            <button className="search__btn">
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
      <div className="assignmentContainer">
        <div className="consultantTitle">
          <p>Pages /Assignments</p>
          <h1>Assignments</h1>
        </div>
        <div className="cards-container">
          <div className="Supportcards-container">
            <div className="SupportTitle">
              <h1>Support Missions</h1>
            </div>
            {filtredSupportMissions.length ? (
              <div className="Missioncards-container">
                {filtredSupportMissions.map((mission) => (
                  <OneSupportMission
                    key={mission.id}
                    mission={mission}
                    reload={reload}
                    setReload={setReload}
                  />
                ))}
              </div>
            ) : (
              <div className="noSupport-container">
                <p className="noSupports">No Support Missions Available</p>
              </div>
            )}
          </div>

          <div className="Normalcards-container">
            <div className="NormalTitle">
              <h1>Normal Missions</h1>
            </div>
            {filtredNormalMissions.length ? (
              <div className="Missioncards-container">
                {filtredNormalMissions.map((mission) => (
                  <OneNormalMission
                    key={mission.id}
                    mission={mission}
                    reload={reload}
                    setReload={setReload}
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
      </div>
    </div>
  );
};

export default Assignment;
