import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../ParkingDashBoard/AddModal.css";
import add from "../../assets/4211763.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const UpdateConsultant = ({ handleClose, open, consultant, handleUpdate }) => {
  const [name, setName] = useState(consultant.name);
  const [lastName, setLastName] = useState(consultant.lastname);
  const [email, setEmail] = useState(consultant.email);
  const [location, setLocation] = useState(consultant.location);
  const [phone, setPhone] = useState(consultant.phone);
  const [password, setPassword] = useState("");
  const [validity, setValidity] = useState(consultant.validity);
  const [image, setImage] = useState(consultant.image);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const profileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    await axios
      .post("https://api.cloudinary.com/v1_1/dl4qexes8/upload", formData)
      .then((response) => {
        setImage(response.data["secure_url"]);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="formContainer">
            {/* Replacing the input with the custom file upload label */}
            <label className="custum-file-upload" htmlFor="file">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  viewBox="0 0 24 24"
                >
                  {/* SVG code */}
                </svg>
              </div>
              <div className="text">
                <img src={image || add} alt="" className="addImage" />
              </div>
              <input type="file" id="file" onChange={(e) => profileUpload(e)} />
            </label>
            {/* End of custom file upload label */}

            <div className="formContent">
              <div className="formContainerLeft">
              <div className="label-left">
                <p>
                  First Name<span>*</span>
                </p>
                </div>
                <input
                  type="text"
                  placeholder="Consultant Name"
                  className="textInputs"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
                <div className="label-left">
                <p>
                  Email<span>*</span>
                </p>
                </div>

                <input
                  type="email"
                  placeholder="Consultant Email"
                  className="textInputs"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <div className="label-left">
                <p>
                  Phone<span>*</span>
                </p>
                </div>
                <input
                  type="text"
                  placeholder="Consultant Phone"
                  className="textInputs"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                />
              </div>

              <div className="formContainerRight">
                <div className="label-left">
                  <p>
                    Last Name<span>*</span>
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Consultant LastName"
                  className="textInputs"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
                <div className="label-left">
                  <p>
                    Password<span>*</span>
                  </p>
                </div>
                <div className="passwordLayout">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Consultant Password"
                    className="textInputs1"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                  {show ? (
                    <FontAwesomeIcon
                      className="iconPassword"
                      icon={faEye}
                      onClick={(e) => setShow(!show)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="iconPassword"
                      icon={faEyeSlash}
                      onClick={(e) => setShow(!show)}
                    />
                  )}
                </div>
                <div className="label-left">
                <p>
                  Location<span>*</span>
                </p>
                </div>
                <input
                  type="text"
                  placeholder="state,city"
                  className="textInputs"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  value={location}
                />


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
                  handleUpdate(consultant.id, {name,lastName,password,email,phone,image,location});
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateConsultant;
