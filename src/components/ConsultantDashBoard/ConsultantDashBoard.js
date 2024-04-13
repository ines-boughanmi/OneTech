import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileArrowDown,
  faKey,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./consultantDashBoard.css";

const ConsultantDashBoard = ({ user }) => {
  return (
    <div className="Mission">
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
