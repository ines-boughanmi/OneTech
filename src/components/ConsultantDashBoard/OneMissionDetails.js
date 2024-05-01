import React, { useEffect, useState }  from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileArrowDown,
  faKey,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SideNav from "../SideNav/SideNav";
import { useParams } from "react-router-dom";
const OneMissionDetails = () => {
const [user, setUser] = useState({});
const missionId = useParams();
const [mission,setMission] = useState({});
const [car,setCar] = useState({});


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

  const getMission = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        console.log(missionId.id);
        const data = await axios.get(
          `http://localhost:3001/api/mission/getOne/${missionId.id}`
        );
        if(data.data.carId){
          const car = await axios.get(`http://localhost:3001/api/car/getOne/${data.data.carId}`)
          setCar(car.data)
        }
        setMission(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    getUser();
    getMission();
  }, []);
  return (
    <div className="addProject">
      <SideNav user={user} />
      <div className="containerMission">
        <div className="oneMission">
          <div className="oneMissionTitle">
            <h2>Mission Informations</h2>
            <FontAwesomeIcon icon={faFileArrowDown} className="iconDownload" />
          </div>
          <div className="MissionContent">
            <p>Title: {mission?.title}</p>
            <p>description: {mission?.description}</p>
            <p>Start Date: {formatDate(mission?.start_date)}</p>
            <p>End Date: {formatDate(mission?.end_date)}</p>
            <p>Location: {mission?.location}</p>

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
                    <span>{car?.brand + " " + car?.car_model}</span> {car?.license_plate}
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

export default OneMissionDetails;
