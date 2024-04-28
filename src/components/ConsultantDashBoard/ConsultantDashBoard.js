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

const ConsultantDashBoard = ({ user }) => {

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
      <div className="missionTitle">
        <p>Pages / Mission</p>
        <h1>Mission</h1>
      </div>
      <div className="containerMission">
        <div className="oneMission">
          <div className="oneMissionTitle">
            <h2>Mission Informations</h2>
            <FontAwesomeIcon icon={faFileArrowDown} className="iconDownload" />
          </div>
          <div className="MissionContent">
            <p>Title: Mission1</p>
            <p>description: long Description</p>
            <p>Start Date: jj/mm/aaaa</p>
            <p>End Date: jj/mm/aaaa</p>
            <p>Location: Tunis, zahrouni</p>

            <div className="carMission">
              <div className="carPos">
                <div className="imageCircleCar">
                  <img
                    src="https://cdn.wheel-size.com/thumbs/bf/a9/bfa92b8d31951e863214ab88599e0ffc.jpg"
                    alt=""
                  />
                </div>
                <div className="consultant-layout">
                  <p>
                    <span>Hyundai i20</span> 198 TUN 5432
                  </p>

                  <button className="GreenButton">
                    <FontAwesomeIcon icon={faKey} /> Take Car
                  </button>
                </div>
              </div>
            </div>
            <div className="confirm1">
            <button type="submit" className="button-addProject">
              START
            </button>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConsultantDashBoard;
