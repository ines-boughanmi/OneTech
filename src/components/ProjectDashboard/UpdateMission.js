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

const UpdateMission = ({ handleClose, open, mission, handleUpdateMission }) => {
  const [title, setTitle] = useState(mission.title);
  const [description, setDescription] = useState(mission.description);
  const [startDate, setStartDate] = useState(mission.start_date);
  const [endDate, setEndDate] = useState(mission.end_date);
  const [location, setLocation] = useState(mission.location);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  // const handleUpdatePartition = async (mission) => {
  //     selected.map( async (user)=>{
  //       await axios.put(`http://localhost:3001/api/partition/update/${id}`,{userId: user.value,missionId:mission.id})
  //     })

  //   }
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("http://localhost:3001/api/user/getAll");
        handleOptions(res.data);
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedUsers = async () => {
    try {
      await axios.get(
        `http://localhost:3001/api/partition/getUsersByMission/${mission.id}`
      ).then((data)=>{
        console.log(data.data);
        const selected = handleSelectedOptions(data.data)
        console.log(selected);
        setSelected(selected);
      })

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
    return options
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
              onBlur={(e) => {}}
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
            <input
              type="date"
              className="textInputs"
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              value={startDate}
              onBlur={(e) => {}}
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
              onBlur={(e) => {}}
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
                  handleUpdateMission(mission.id, {
                    title,
                    description,
                    start_date: startDate,
                    end_date: endDate,
                    location,
                  });
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
