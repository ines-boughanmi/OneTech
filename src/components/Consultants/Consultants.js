import { useNavigate } from "react-router-dom";
import "./consultants.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPen,
  faTrash,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "../SideNav/SideNav";
import OneConsultant from "./OneConsultant";

const Consultants = () => {
  const [user, setUser] = useState({});
  const [consultantsList, setConsultantsList] = useState([]);
  const [reload, setReload] = useState(true);

  const fetchConsultants = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get("http://localhost:3001/api/user/getAll");
        setConsultantsList(data.data);

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    fetchConsultants();
  }, [consultantsList.length, reload]);

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
    <div className="consultants">
      <SideNav user={user} />
      <div className="search-group">
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
      </div>
      <div className="consultantsContainer">
        <div className="consultantTitle">
          <p>Pages / Consultants</p>
          <h1>Consultants</h1>
        </div>
        {consultantsList.length ? (
          <div className="cards-container">
            {consultantsList.map((consultant) => (
              <OneConsultant
                key={consultant.id}
                consultant={consultant}
                reload={reload}
                setReload={setReload}
              />
            ))}
          </div>
        ) : (
          <div className="noCar-container">
            <p className="noCars">No Consultants Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultants;
