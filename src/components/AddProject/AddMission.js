import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const AddMission = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setType("");
    setLocation("");
  };

  const handleClose = () => setOpen(false);

  const handleAdd = async (body) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post("http://localhost:3001/api/mission/create", body);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="place">
      <div className="button-rightMission">
        <button className="button-addMission" onClick={handleOpen}>
          + Mission
        </button>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="form">
            <div className="missionLine">
            <p>
              Title<span>*</span>
            </p>
            </div>
            <input
              type="text"
              className="textInputs"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />

            {/* <input
              type="text"
              placeholder="Car Model Name"
              className="textInputs"
              onChange={(e)=>{
                setModel(e.target.value)
              }}
              value={model}
            /> */}
            <div className="missionLine">
            <p>
              Start Date<span>*</span>
            </p>
            </div>
            <input
              type="date"
              className="textInputs"
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              value={startDate}
            />
            <div className="missionLine">
            <p>
              Finish Date<span>*</span>
            </p>
            </div>
            <input
              type="date"
              className="textInputs"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              value={endDate}
            />
            <div className="missionLine">
            <p>
              Description<span>*</span>
            </p>
            </div>
            <textarea
              type="text"
              className="textInputArea"
              placeholder="Enter Description here..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
            <div className="missionLine">
            <p>
              Location<span>*</span>
            </p>
            </div>
            <input
              type="text"
              className="textInputs"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              value={location}
            />
            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();
                  handleAdd({});
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMission;
