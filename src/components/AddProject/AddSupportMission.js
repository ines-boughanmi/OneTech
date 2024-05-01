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

const AddSupportMission = ({users}) => {
    
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("support");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([])
  const handleOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setLocation("");
  };
  
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
  
  const [startDate, setStartDate] = useState(formatDateValue(new Date()))
  const [endDate, setEndDate] = useState(formatDateValue(new Date()))

  const handleAddPartition = async (mission) => {
    selected.map( async (user)=>{
      await axios.post("http://localhost:3001/api/partition/create",{userId: user.value,missionId:mission.id})
    })

  }

  const notifySupportMissionAdd = () => {
    toast.success("Support Mission Added", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyRequired = () => { 
    toast.error("Please fill all required fields", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
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
      if (!body.title || !body.description || !body.location) {
        notifyRequired();
        return; 
      }
      const token = localStorage.getItem("token");
      if (token) {
        const mission = await axios.post("http://localhost:3001/api/mission/create", body);
        handleAddPartition(mission.data);
        notifySupportMissionAdd();
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

 
  return (
<div className="place">
      <div className="button-rightMission">
        <button className="button-addSupportMission" onClick={(e)=>{
          handleOpen()
          handleOptions(users)
        }}>
          + Support Mission
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
                    location,
                    type,
                    start_date : startDate ,
                    end_date : endDate
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
  )
}

export default AddSupportMission
