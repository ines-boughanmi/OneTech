import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const OneCar = () => {
  return (
    <div className="card-car">
      <div className="card-car__image">
        <p className="available">Available</p>
        <img src="https://i.ytimg.com/vi/eM0XTVvWo3c/maxresdefault.jpg" alt="" />
      </div>
      <div className="card-car__content">
        <div className="card-car__title">
            <p className="car-title">Hyundai Gi20 SUV</p>
            <p>123 tun 4568</p>
        </div>
        <p className="card-car__description">
            Car Condition : hhhhhhhhhhhhhhhhhhhhhhh<br/>
            Color : red<br/>
            Seat Available : 2
        </p>
        <div className="card-butons">
            <FontAwesomeIcon icon={faTrash}   className="icon"/>
            <FontAwesomeIcon icon={faEdit}  className="icon"/>
        </div>
      </div>
    </div>
  );
};

export default OneCar;
