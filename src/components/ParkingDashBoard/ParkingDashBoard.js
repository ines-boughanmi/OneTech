import React, { useEffect, useState } from "react";
import "./parkingDashBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import OneCar from "./OneCar";
import AddModal from "./AddModal";
import axios from "axios";

const ParkingDashBoard = ({user}) => {
  const [carsList,setCarsList] = useState([])
  const [search,setSearch] = useState('')
  const [all,setAll] = useState(0)
  const [availableCars,setAvailableCars] = useState(0)
  const [unavailableCars,setUnavailableCars] = useState(0)
  const [reload,setReload] = useState(true)



  const handleSearch = async (searchTerm) => {
    try {
      if(searchTerm){
        const data = await axios.get(`http://localhost:3001/api/car/search/${searchTerm}`)
        data.data.reverse()
      setCarsList(data.data);
      }else{
        setReload(!reload)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = async (filter) => {
    try {
      const data = await axios.post('http://localhost:3001/api/car/filterCar',{
        available : filter
      })
      setCarsList(data.data)
    } catch (error) {
      console.log(error);
    }
  }


  const fetchCars = async () => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        const data = await axios.get("http://localhost:3001/api/car/getAll");
        setCarsList(data.data)
        setAll(data.data.length)
        setAvailableCars(data.data.filter(car=>car.car_availability).length)
        setUnavailableCars(data.data.filter(car=>!car.car_availability).length)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchCars()
  },[reload])

  return (
    <div className="content-container">
          <div className="searchGroup1">
        <div className="search-section3">
          <div className="container-search3">
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="search__btn" onClick={(e)=>{
              e.preventDefault()
              handleSearch(search)
            }}>
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
    <div className="card-container">
      <div className="card" onClick={(e)=>{
        e.preventDefault();
        setReload(!reload)
      }}>
        <p>Total Cars</p>
        <div className="counter">
          <p>{all}</p>
          <FontAwesomeIcon icon={faCar} />
        </div>
      </div>
      <div className="card" onClick={(e)=>{
        e.preventDefault();
        handleFilter(true)
      }}>
        <p>Available Cars</p>
        <div className="counter">
          <p>{availableCars}</p>
          <FontAwesomeIcon icon={faCar} />
        </div>
      </div>
      <div className="card" onClick={(e)=>{
        e.preventDefault();
        handleFilter(false)
      }}>
        <p>Unavailable Cars</p>
        <div className="counter">
          <p>{unavailableCars}</p>
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