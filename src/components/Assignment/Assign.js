import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../ParkingDashBoard/AddModal.css";
import OneConsultantAssign from "./OneConsultantAssign";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const Assign = ({ handleClose, open, mission }) => {
  const [title, setTitle] = useState(mission.title);
  const [description, setDescription] = useState(mission.description);
  const [startDate, setStartDate] = useState(mission.start_date);
  const [endDate, setEndDate] = useState(mission.end_date);
  const [transport, setTransport] = useState("bolt");
  const [consultant, setConsultant] = useState([]);
  const [location, setLocation] = useState(mission.location);
  const [options, setOptions] = useState([])
  const [cars,setCars] = useState([])
  const [missions,setMissions] = useState([]);


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
  const prepBodyPartition = (arr) => {
    let body = {};
    arr?.forEach((partition) => {
      body[partition.userId] = partition.userId;
    });
    return body;
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
  const extractRange = (start,end) => {
    let arr = []
    let date = start
    while (formatDate(date) !== formatDate(end)){
        arr.push(formatDate(date))
        date = addDate(date,1)
    }
    arr.push(formatDate(end))
    return arr
    
}


const checkExistence = async (missions,options) => {
  if(!missions.length){
    setOptions(options)
    return
  }
  let datesToCheck = extractRange(missions[0].start_date,missions[0].end_date)
  let createdDates = extractRange(startDate,endDate)
  let filteredOptions = []
  let i = 0 
  
  while(i<datesToCheck.length){
    if(createdDates.includes(datesToCheck[i])){
           filteredOptions = options.filter((option)=>{
            return option.value !== missions[0].carId
          }) 
          console.log(i);
      }
      i++
    }
    checkExistence(missions.slice(1),filteredOptions)
  }



  const handleOptions = (cars) => {

    const filteredCars = cars.filter((car)=>{
      return car.car_availability === true 
    }) 
    const options = filteredCars.map((car) => {
      return {
        value: car.id,
        label: car.car_model + " " + car.license_plate,
      };
    });
    setOptions(options);
  }
  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        const data = await axios.get("http://localhost:3001/api/car/getAll");
        handleOptions(data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleHumanResources = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const partition = await axios.get(
          `http://localhost:3001/api/partition/getPartitionsByMission/${mission.id}`
        );
        const users = await axios.post(
          "http://localhost:3001/api/partition/getAllUserByPartition",
          prepBodyPartition(partition.data)
        );
        setConsultant(users.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem('token')
      if(token){
        const missions = await axios.get(`http://localhost:3001/api/mission/getAll`)
        setMissions(missions.data.filter((mission)=>{
          return mission.type === 'normal'
        })); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleHumanResources();
    fetchCars()
    fetchMissions()
  }, []);

  return (
    <div className="place">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="form">
            <div className="missionLine">
              <p>Title</p>
            </div>
            <input type="text" className="textInputs" value={title} disabled />

            {mission.type === "normal" ? (
              <div className="DateLayout">
                <div className="missionLine">
                  <p>Start Date</p>
                </div>
                <input
                  type="date"
                  className="textInputs"
                  value={formatDateValue(startDate)}
                  disabled
                />

                <div className="missionLine">
                  <p>Finish Date</p>
                </div>
                <input
                  type="date"
                  className="textInputs"
                  value={formatDateValue(endDate)}
                  disabled
                />
              </div>
            ) : (
              <></>
            )}

            <div className="missionLine">
              <p>Location</p>
            </div>
            <input
              type="text"
              className="textInputs"
              value={location}
              disabled
            />

            <div className="missionLine">
              <p>Consultants</p>
            </div>
            {consultant.map((consultant, index) => (
              <OneConsultantAssign consultant={consultant} key={index} />
            ))}
            <div className="missionLine">
              <p>Transport</p>
            </div>
            <div className="radio-buttons-container">
              <div className="radio-button">
                <input
                  name="radio-group"
                  id="radio2"
                  className="radio-button__input"
                  type="radio"
                  onChange={(e) => {
                    setTransport(e.target.value);
                  }}
                  value="bolt"
                />
                <label htmlFor="radio2" className="radio-button__label">
                  <span className="radio-button__custom"></span>
                  Bolt
                </label>
              </div>
              <div className="radio-button">
                <input
                  name="radio-group"
                  id="radio1"
                  className="radio-button__input"
                  type="radio"
                  onChange={(e) => {
                    setTransport(e.target.value);
                    checkExistence(missions,options)
                  }}
                  value="car"
                />
                <label htmlFor="radio1" className="radio-button__label">
                  <span className="radio-button__custom"></span>
                  Car
                </label>
              </div>
            </div>
            {transport === "bolt" ? (
              <></>
            ) : (
              <div style={{ width: "100%" }}>
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  styles={{ width: "100%" }}
                  options={options}
                />
              </div>
            )}

            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Assign
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Assign;
