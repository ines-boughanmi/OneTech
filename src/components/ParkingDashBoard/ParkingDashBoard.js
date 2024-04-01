import React from "react";
import SideNav from "../SideNav/SideNav";
import "./parkingDashBoard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

const ParkingDashBoard = ({ user }) => {
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
              <p className="button-add">+ Add</p>
          </div>
        <div className="car-container">
        <div  className="card-car">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path></svg>
  <div  className="card-car__content">
    <p  className="card-car__title">Project Name</p>
    <p  className="card-car__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <div className="card-butons">
    <button  className="card-car__button">Live</button>
    <button  className="card-car__button secondary">Source</button>
    </div>
  </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default ParkingDashBoard;
