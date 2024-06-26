import React, { useEffect, useState } from "react";
import axios from "axios";
import Assign from "./Assign";

const OneNormalMission = ({ mission,reload, setReload,missions }) => {
  const [openUpdate,setOpenUpdate] = useState(false)
  const [options, setOptions] = useState([])

  const handleOpenUpdate = ()=> setOpenUpdate(true)
  const handleCloseUpdate = ()=> setOpenUpdate(false)


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
        const filter = data.data.filter((car)=>{
          return car.car_condition === "In service"
        })
        handleOptions(filter)
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
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    const formattedDate = formattedDay + '/' + formattedMonth + '/' + year;
  
    return formattedDate;
  };

  useEffect(()=>{
    fetchCars()
  },[])

  return (
    <div className="normalCard">
    <div className="firstPart1">
      <p>{mission.title}</p>
      <p>{formatDate(mission.start_date)}</p>
      <p>{formatDate(mission.end_date)}</p>
      <p>{mission.location}</p>
    </div>
    <div>
    <button className="button-Assign" onClick={handleOpenUpdate}>Assign</button>
    <Assign mission={mission} open={openUpdate} handleClose={handleCloseUpdate} cars={options} setOptions={setOptions} missions={missions} reload={reload} setReload={setReload} />
    </div>
  </div>
  )
}

export default OneNormalMission
