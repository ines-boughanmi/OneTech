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
const AddMission = ({projectId,users,dates,reload,setReload}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const[id,setId] = useState(projectId);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("normal");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([])
  const [missions,setMissions] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setLocation("");
  };

  const notifyMissionAdd = () => {
    toast.success("Mission Added", {
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

  const addDate = (date, amount) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

    return formattedDate;
  };
  const extractRange = (start,end) => {
    let arr = []
    let date = start
    while (formatDate(date) !== formatDate(end)){
        arr.push(formatDate(date))
        date = addDate(date,1)
    }
    arr.push(formatDate(end))
    return arr
    
}
 
const checkExistence = async (missions,options) => {
  if(!missions.length){
    setOptions(options)
    return
  }
  if(startDate && endDate){
    let datesToCheck = extractRange(missions[0].start_date,missions[0].end_date)
    let createdDates = extractRange(startDate,endDate)
    let filteredOptions = options
    let i =0 
  
    while(i<datesToCheck.length){
      if(createdDates.includes(datesToCheck[i])){
        const partitions = await axios.get(`http://localhost:3001/api/partition/getPartitionsByMission/${missions[0].id}`).then((partitions)=>{
          partitions.data.forEach((partition)=>{
            console.log(options); 
             filteredOptions = options.filter((option)=>{
              return option.value !== partition.userId
            })
          })
        })
      }
      else{
        setReload(!reload)
      }
    console.log('cross');
      i++
    }
    checkExistence(missions.slice(1),filteredOptions)
  }
}


  const handleClose = () => setOpen(false);

  const handleAdd = async (body) => {
    try {
      if (!body.title || !body.description || !body.location || !body.start_date || !body.end_date || !selected.length) {
        notifyRequired();
        return; 
      }
      const token = localStorage.getItem("token");
      if (token) {
        const mission = await axios.post("http://localhost:3001/api/mission/create", body);
        handleAddPartition(mission.data);
        notifyMissionAdd();
        handleClose();
        setReload(!reload);
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

  function extractLabels(arrayOfObjects) {
    return arrayOfObjects.map(obj => obj.label);
}

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
  const handleHumanResources = async () => {
    try {
      const token = localStorage.getItem('token')
      if(token){
        const missions = await axios.get(`http://localhost:3001/api/mission/getAll`)
        setMissions(missions.data); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    handleHumanResources();
    handleOptions(users)
  },[reload])

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


            <div className="missionLine">
              <p>
                Start Date<span>*</span>
              </p>
            </div>
            <div style={{width : '100%'}}>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dates}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setStartDate(e.value);
                }}
              />
            </div>
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
            <div style={{width : '100%'}}>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dates}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setEndDate(e.value);
                }}
                onBlur={(e)=>{
                  checkExistence(missions,options)
                }}
              />
            </div>
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
                    projectId:id,
                    title,
                    description,
                    start_date:startDate,
                    end_date:endDate,
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
