import React, { useEffect, useState } from "react";
import "./parkingDashBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import OneCar from "./OneCar";
import AddModal from "./AddModal";
import axios from "axios";

const ParkingDashBoard = ({user}) => {
  const [carsList,setCarsList] = useState([])
  const [reload,setReload] = useState(true)


  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        const data = await axios.get("http://localhost:3001/api/car/getAll");
        setCarsList(data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchCars()
  },[carsList.length,reload])

  return (
    <div className="content-container">
    <div className="search-section">
      <div className="container-search">
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
    <div className="card-container">
      <div className="card">
        <p>Total Cars</p>
        <div className="counter">
          <p>100</p>
          <FontAwesomeIcon icon={faCar} />
        </div>
      </div>
      <div className="card">
        <p>Total Cars</p>
        <div className="counter">
          <p>100</p>
          <FontAwesomeIcon icon={faCar} />
        </div>
      </div>
      <div className="card">
        <p>Total Cars</p>
        <div className="counter">
          <p>100</p>
          <FontAwesomeIcon icon={faCar} />
        </div>
      </div>
      <div className="card">
        <p>Total Cars</p>
        <div className="counter">
          <p>100</p>
          <FontAwesomeIcon icon={faCar} />
        </div>
      </div>
      </div>
      <div className="content-section">
        <div className="content-container-header">
            <p className="path">Parking</p>
            <AddModal   reload={reload} setReload={setReload}/>
        </div>

        {
          carsList.length ? <div className="car-container">
          {
            carsList.map((car) => (
              <OneCar key={car.id} car={car} reload={reload} setReload={setReload} />
            ))
          }
      </div> :
       <div className="noCar-container">
       <p className="noCars">No Cars Available</p>
   </div>
        }
      </div>
  </div>
  )
}

export default ParkingDashBoard