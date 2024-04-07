import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import UpdateModal from "./UpdateModal";


const OneCar = ({car, reload , setReload}) => {
  const [openDelete,setOpenDelete] = useState(false)
  const [openUpdate,setOpenUpdate] = useState(false)


  const handleOpenDelete = ()=> setOpenDelete(true)
  const handleCloseDelete = ()=> setOpenDelete(false)
  const handleOpenUpdate = ()=> setOpenUpdate(true)
  const handleCloseUpdate = ()=> setOpenUpdate(false)

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        await axios.delete(`http://localhost:3001/api/car/remove/${id}`)
        handleCloseDelete()
        setReload(!reload)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (id,body) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
          await axios.put(
          `http://localhost:3001/api/car/update/${id}`,
          body
        );
        setReload(!reload)
        handleCloseUpdate()
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="card-car">
      <div className="card-car__image">
        {
          car.car_availability? <p className="available">Available</p> : <p className="unavailable">Not Available</p>
        }
        <img src={car.image} alt="" />
      </div>
      <div className="card-car__content">
        <div className="card-car__title">
            <p className="car-title">{car.brand+" " + car.car_model +" "+car.car_category}</p>
            <p>{car.license_plate}</p>
        </div>
        <div className="line"></div>
        <p className="card-car__description">
            Car Condition : {car.car_condition}<br/>
            Color : {car.color}<br/>
            Seat Available : {car.seat_availability}
        </p>
        <div className="card-butons">
            <FontAwesomeIcon icon={faEdit} onClick={handleOpenUpdate} className="icon1"/>
            <FontAwesomeIcon icon={faTrash}  onClick={handleOpenDelete} className="icon2"/>
        </div>
      </div>
      <ModalDelete car={car} open={openDelete} handleClose={handleCloseDelete} handleDelete={handleDelete}  />
      <UpdateModal car={car} open={openUpdate} handleClose={handleCloseUpdate} handleUpdate={handleUpdate} />
    </div>
  );
};

export default OneCar;
