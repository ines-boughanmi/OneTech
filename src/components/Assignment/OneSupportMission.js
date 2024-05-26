import React, { useEffect, useState } from "react";
import axios from "axios";
import Assign from "./Assign";

const OneSupportMission = ({ mission,reload, setReload,missions}) => {
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

  useEffect(()=>{
    fetchCars()
  },[])

  return (
    <div className="supportCard">
    <div className="firstPart">
      <p>{mission.title}</p>
      <p>{mission.location}</p>
    </div>
    <div>
    <button className="button-Assign" onClick={handleOpenUpdate}>Assign</button>
    <Assign mission={mission} open={openUpdate} handleClose={handleCloseUpdate} missions={missions} cars={options} setOptions={setOptions} reload={reload} setReload={setReload}  />
    </div>
  </div>
  )
}

export default OneSupportMission
