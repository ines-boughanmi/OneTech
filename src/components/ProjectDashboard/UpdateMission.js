import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
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

const UpdateMission = ({
  handleClose,
  open,
  mission,
  handleUpdateMission,
  dates,
  reload,
  setReload,
  missions
}) => {
  const [title, setTitle] = useState(mission.title);
  const [description, setDescription] = useState(mission.description);
  const [startDate, setStartDate] = useState(mission.start_date);
  const [endDate, setEndDate] = useState(mission.end_date);
  const [location, setLocation] = useState(mission.location);
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    
    const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;
    return { label: formattedDate, value: dateString.substring(0,10) };
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

    return formattedDate;
  };

  const [dateToCut, setDateToCut] = useState(formatDate(mission.start_date))
  const [dateToCutEnd, setDateToCutEnd] = useState(formatDate(mission.end_date))

  const [index, setIndex] = useState(0)
  const [indexEnd, setIndexEnd] = useState(dates.length)

  const extractRange = (start,end) => {
    let arr = []
    let date = start
    while (formatDate2(date) !== formatDate2(end)){
        arr.push(formatDate2(date))
        date = addDate(date,1)
    }
    arr.push(formatDate2(end))
    return arr
    
}


const addDate = (date, amount) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};

  const prepBody = (arr) => {
    let body = {};
    arr.forEach((user) => {
      body[user.label] = user.value;
    });
    body.endDate = endDate;
    return body;
  };


  const handleUpdateUsers = async () => {
    try {
      if (!selected.length ) {
        return;
      }
      const body = prepBody(selected);
      const token = localStorage.getItem("token");
      if(token){
        await axios.post(
          `http://localhost:3001/api/partition/updateUsers/${mission.id}`,
          body
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("http://localhost:3001/api/user/getAll");
        handleOptions(res.data);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedUsers = async () => {
    try {
      await axios
        .get(
          `http://localhost:3001/api/partition/getUsersByMission/${mission.id}`
        )
        .then((data) => {
          const selected = handleSelectedOptions(data.data);
          setSelected(selected);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectedOptions = (users) => {
    const filteredUsers = users.filter((user) => {
      return user.role === "CONSULTANT" && user.validity === true;
    });
    const options = filteredUsers.map((user) => {
      return {
        value: user.id,
        label: user.name + " " + user.lastname,
      };
    });
    return options;
  };

  const handleOptions = (users) => {
    const filteredUsers = users.filter((user) => {
      return user.role === "CONSULTANT" && user.validity === true;
    });
    const options = filteredUsers.map((user) => {
      return {
        value: user.id,
        label: user.name + " " + user.lastname,
      };
    });
    setOptions(options);
  };

  useEffect(() => {
    fetchUsers();
    handleSelectedUsers();
  }, []);

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

  const handleDescriptionError = () => {
    if (!description.length) {
      setErrors({
       ...errors,
        descriptionError: "Description is required",
      });
    } else {
      setErrors({
       ...errors,
        descriptionError: "",
      });
    }
  };

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
               filteredOptions = options.filter((option)=>{
                return option.value !== partition.userId
              })
            })
          })
        }
        else{
          setReload(!reload)
        }
        i++
      }
      checkExistence(missions.slice(1),filteredOptions)
    }
  }
  

  function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
  
const extractIndex = ()=>{
  dates.forEach((date , i)=>{
      if(compareObjects(date,dateToCut)){
          setIndex(i)
      }
  }) 
}
const extractIndexEnd = ()=>{
  dates.forEach((date , i)=>{
    if(compareObjects(date,dateToCutEnd)){
          setIndexEnd(i+1)
      }
  }) 
}

useEffect(()=>{
  extractIndex()
  extractIndexEnd()
  checkExistence(missions,options)
},[])

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
            <div style={{ width: "100%" }}>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dates.slice(0, indexEnd || dates.length)}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setStartDate(e.value);
                  setDateToCut(e)
                }}
                onBlur={(e)=>{
                  extractIndex()
                }}
                value={formatDate(startDate)}
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
            <div style={{ width: "100%" }}>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dates.slice(index,dates.length)}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setEndDate(e.value);
                  setDateToCutEnd(e)
                }}
                onBlur={(e)=>{
                  checkExistence(missions,options)
                  extractIndexEnd()
                }}
                value={formatDate(endDate)}
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
            <div style={{ width: "100%" }}>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                styles={{ width: "100%" }}
                onChange={(e) => {
                  setSelected(e);
                }}
                value={selected}
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
              onBlur={(e) => {
                handleDescriptionError();
              }}
              value={description}
            />
             <div className="missionLine">
              {errors.descriptionError ? (
                <small className="text-danger">{errors.descriptionError}</small>
              ) : (
                <></>
              )}
            </div>
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
                  handleUpdateMission(mission.id, {
                    title,
                    description,
                    start_date: startDate,
                    end_date: endDate,
                    location,
                    users : selected.length
                  });
                  handleUpdateUsers()
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateMission;
