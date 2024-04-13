import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const AddMission = ({users}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([])
  const handleOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setType("");
    setLocation("");
  };

  const handleAddPartition = async (mission) => {
    selected.map( async (user)=>{
      await axios.post("http://localhost:3001/api/partition/create",{userId: user.value,missionId:mission.id})
    })

  }

  const handleOptions = (users) => {

    const filteredUsers = users.filter((user)=>{
      return user.role === "CONSULTANT" && user.validity === true
    }) 
    const options = filteredUsers.map((user) => {
      return {
        value: user.id,
        label: user.name + " " + user.lastname,
      };
    });
    setOptions(options);
  }


  const handleClose = () => setOpen(false);

  const handleAdd = async (body) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const mission = await axios.post("http://localhost:3001/api/mission/create", body);
        handleAddPartition(mission.data)
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleError = () => {
    if (!title.length) {
      setErrors({
        ...errors,
        titleError: "Title is required",
      });
    } else {
      setErrors({
        ...errors,
        titleError: "",
      });
    }
  };

  const handleStartDateError = () => {
    if (!startDate.length) {
      setErrors({
        ...errors,
        startDateError: "Start Date is required",
      });
    } else {
      setErrors({
        ...errors,
        startDateError: "",
      });
    }
  };

  const handleEndDateError = () => {
    if (!endDate.length) {
      setErrors({
        ...errors,
        endDateError: "Finish Date is required",
      });
    } else {
      setErrors({
        ...errors,
        endDateError: "",
      });
    }
  };

  return (
    <div className="place">
      <div className="button-rightMission">
        <button className="button-addMission" onClick={(e)=>{
          handleOpen()
          handleOptions(users)
        }}>
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
              onBlur={(e) => {
                handleTitleError();
              }}
            />
            <div className="missionLine">
              {errors.titleError ? (
                <small className="text-danger">{errors.titleError}</small>
              ) : (
                <></>
              )}
            </div>

            <div className="radioButtons">
              <div className="radioHolder">
                <input
                  type="radio"
                  className="radio"
                  name="type"
                  value="normal"
                  onChange={(e) => {
                    setDisable(false);
                    setType(e.target.value);
                  }}
                />
                <p>Normal</p>
              </div>
              <div className="radioHolder">
                <input
                  type="radio"
                  className="radio"
                  name="type"
                  value="urgent"
                  onChange={(e) => {
                    setDisable(true);
                    setType(e.target.value);
                  }}
                />
                <p>Urgent</p>
              </div>
            </div>
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
              disabled={disable}
              onBlur={(e) => {
                handleStartDateError();
              }}
            />
            <div className="missionLine">
              {errors.startDateError ? (
                <small className="text-danger">{errors.startDateError}</small>
              ) : (
                <></>
              )}
            </div>
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
              disabled={disable}
              onBlur={(e) => {
                handleEndDateError();
              }}
            />
            <div className="missionLine">
              {errors.endDateError ? (
                <small className="text-danger">{errors.endDateError}</small>
              ) : (
                <></>
              )}
            </div>
            <div className="missionLine">
              <p>
                Consultants<span>*</span>
              </p>
            </div>
            <div style={{width : '100%'}}>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setSelected(e);
                }}
              />
            </div>

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
                  handleAdd({
                    title,
                    description,
                    start_date: startDate,
                    end_date: endDate,
                    location,
                    type,
                  });
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
