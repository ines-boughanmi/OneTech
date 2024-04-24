import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../ParkingDashBoard/AddModal.css";
import OneConsultantAssign from "./OneConsultantAssign";

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
  const [type, setType] = useState("");
  const [location, setLocation] = useState(mission.location);

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
            <OneConsultantAssign />
            <div className="missionLine">
              <p>Transport</p>
            </div>
            <div class="radio-buttons-container">
              <div class="radio-button">
                <input
                  name="radio-group"
                  id="radio2"
                  class="radio-button__input"
                  type="radio"
                />
                <label for="radio2" class="radio-button__label">
                  <span class="radio-button__custom"></span>
                  Bolt
                </label>
              </div>
              <div class="radio-button">
                <input
                  name="radio-group"
                  id="radio1"
                  class="radio-button__input"
                  type="radio"
                />
                <label for="radio1" class="radio-button__label">
                  <span class="radio-button__custom"></span>
                  Car
                </label>
              </div>
            </div>

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
