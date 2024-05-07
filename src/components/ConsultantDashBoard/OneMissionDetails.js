import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faFileArrowDown,
  faKey,

} from "@fortawesome/free-solid-svg-icons";
import SideNav from "../SideNav/SideNav";
import { useNavigate, useParams } from "react-router-dom";
import bolt from "../../assets/bolt.gif";
import { ToastContainer, toast } from "react-toastify";
import DoneModal from "./DoneModal";

const OneMissionDetails = () => {
  const [user, setUser] = useState({});
  const missionId = useParams();
  const [mission, setMission] = useState({});
  const [car, setCar] = useState({});
  const [reload, setReload] = useState(false);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    if(!mission.carId){
      setOpenUpdate(true);
    }
    else if (!car?.car_availability) {
      notifyCarReturnedError();
    } 
    else{
      setOpenUpdate(true);
    }
  }
  const handleCloseUpdate = () => setOpenUpdate(false);

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

  const fileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "egcei9t8");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnt4cy2mb/upload`,
        formData
      );
      setFile(response.data["secure_url"]);
      setReload(!reload)
    } catch (error) {
      throw error;
    }
  };

  const getMission = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get(
          `http://localhost:3001/api/mission/getOne/${missionId.id}`
        );
        if (data.data.carId) {
          const car = await axios.get(
            `http://localhost:3001/api/car/getOne/${data.data.carId}`
          );
          setCar(car.data);
        }
        setMission(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const notifyCarTaken = () => {
    toast.success("Car Taken", {
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
  const notifyCarReturned = () => {
    toast.success("Car Returned", {
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
  const notifyCarReturnedError = () => {
    toast.error("Return Car First", {
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
  const notifyCarTakeError = () => {
    toast.error("Take Car First", {
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
  const notifyMissionStarted = () => {
    toast.success("Mission Started", {
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
  const notifyMissionDone = () => {
    toast.success("Mission Completed", {
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

  const handleStart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (mission?.carId) {
          if (car?.car_availability) {
            notifyCarTakeError();
          } else {
            const data = await axios.put(
              `http://localhost:3001/api/mission/update/${missionId.id}`,
              {
                progress: "In Progress",
              }
            );
            notifyMissionStarted();
            setReload(!reload);
          }
        }
        else {
          const data = await axios.put(
            `http://localhost:3001/api/mission/update/${missionId.id}`,
            {
              progress: "In Progress",
            }
          );
          notifyMissionStarted();
          setReload(!reload);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDone = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (mission?.carId) {
          if (!car?.car_availability) {
            notifyCarReturnedError();
          } else if(!file || !description){
            handleOpenUpdate();
          }
          else {
            const data = await axios.put(
              `http://localhost:3001/api/mission/update/${missionId.id}`,
              {
                progress: "Done",
                file,
                summary : description
              }
            );
            notifyMissionDone();
            setReload(!reload);
          }
        }
        else{
          const data = await axios.put(
            `http://localhost:3001/api/mission/update/${missionId.id}`,
            {
              progress: "Done",
              file,
              summary : description
            }
          );
          notifyMissionDone();
          setReload(!reload);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTakeCar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.put(
          `http://localhost:3001/api/car/update/${car?.id}`,
          {
            car_availability: false,
          }
        );
        notifyCarTaken();
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReturnCar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.put(
          `http://localhost:3001/api/car/update/${car?.id}`,
          {
            car_availability: true,
          }
        );
        notifyCarReturned();
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getUser();
    getMission();
  }, [reload]);

  return (
    <div className="addProject">
      <SideNav user={user} />
      <div className="containerMission">
        <div className="oneMission">
          <div className="oneMissionTitle">
            <h2>Mission Informations</h2>
            <FontAwesomeIcon icon={faFileArrowDown} className="iconDownload"  onClick={(e)=>{
              navigate('/printPage', {state : {mission : mission , car : car} })
            }}  />
          </div>
          <div className="MissionContent">
            <div className="MissionDetailsContainer">
              <div className="MissionLine">
                <p className="missionLabel">Title: </p>
                <p className="mission-value">{mission?.title}</p>
              </div>
              <div className="MissionLine">
                <p className="missionLabel">Description: </p>
                <p className="mission-value">{mission?.description}</p>
              </div>
              <div className="MissionLine">
                <p className="missionLabel">Start Date: </p>
                <p className="mission-value">
                  {formatDate(mission?.start_date)}
                </p>
              </div>
              <div className="MissionLine">
                <p className="missionLabel">End Date: </p>
                <p className="mission-value">{formatDate(mission?.end_date)}</p>
              </div>
              <div className="MissionLine">
                <p className="missionLabel">Location: </p>
                <p className="mission-value">{mission?.location}</p>
              </div>
            </div>
            {car.id ? (
              <div className="carMission">
                <div className="carPos">
                  <div className="imageCircleCar">
                    <img src={car?.image} alt="" />
                  </div>
                  <div className="consultant-layout">
                    <p>
                      <span>{car?.brand + " " + car?.car_model}</span>{" "}
                      {car?.license_plate}
                    </p>

                    {car?.car_availability ? (
                      <button
                        className="GreenButton"
                        onClick={(e) => {
                          e.preventDefault();
                          handleTakeCar();
                        }}
                      >
                        <FontAwesomeIcon icon={faKey} /> Take Car
                      </button>
                    ) : (
                      <button
                        className="GreenButton"
                        onClick={(e) => {
                          e.preventDefault();
                          handleReturnCar();
                        }}
                      >
                        <FontAwesomeIcon icon={faKey} /> Return Car
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="boltMission">
                <img src={bolt} alt="" />
                <p>Request a Taxi</p>
              </div>
            )}

            <div className="confirm1">
              {mission?.progress === "To Do" ? (
                <button
                  type="submit"
                  className="button-addProject"
                  onClick={(e) => {
                    handleStart();
                  }}
                >
                  START
                </button>
              ) : description && file ?  (
                <button
                  type="submit"
                  className="button-addProject"
                  onClick={handleDone}
                >
                  Done
                </button>
              ) : <button
              type="submit"
              className="button-addProject"
              onClick={handleOpenUpdate}
            >
              Upload
            </button>   }
            </div>
            <DoneModal
              mission={mission}
              open={openUpdate}
              handleClose={handleCloseUpdate}
              handleDone={handleDone}
              file={file}
              fileUpload={fileUpload}
              description={description}
              setDescription={setDescription}
              reload={reload}
              setReload={setReload}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OneMissionDetails;
