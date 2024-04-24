import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./AddModal.css";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from 'react-toastify';
import add from "../../assets/4211763.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const AddModal = ({ reload, setReload }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [license, setLicense] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [seats, setSeats] = useState(0);

  const handleOpen = () => {
    setOpen(true);
    setImage("");
    setBrand("");
    setModel("");
    setLicense("");
    setColor("");
    setCategory("");
    setSeats(0);
  };
  const handleClose = () => setOpen(false);

  const handleAdd = async (body) => {
    try {
      if (!body.image || !body.brand|| !body.car_model|| !body.license_plate || !body.car_category || !body.seat_availability || !body.color) {
        notifyRequired();
        return; 
      }
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post("http://localhost:3001/api/car/create", body);
        setReload(!reload);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div>
      <Button className="button-add" onClick={handleOpen}>
        + Add
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="form">
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
            <div className="label-left">
              <p>
                Brand<span>*</span>
              </p>
            </div>
            <div className="custom-select">
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              >
                <option disabled selected value="">
                  Car Brand
                </option>
                <option value="Hyundai">Hyundai</option>
                <option value="Citroen">Citroen</option>
                <option value="Toyota">Toyota</option>
              </select>
            </div>
            <div className="label-left">
              <p>
                Model<span>*</span>
              </p>
            </div>
            <input
              type="text"
              placeholder="Car Model Name"
              className="textInputs"
              onChange={(e) => {
                setModel(e.target.value);
              }}
              value={model}
            />
            <div className="label-left">
              <p>
                License plate<span>*</span>
              </p>
            </div>
            <input
              type="text"
              placeholder="license plate Number"
              className="textInputs"
              onChange={(e) => {
                setLicense(e.target.value);
              }}
              value={license}
            />
            <div className="label-left">
              <p>
                Car Category<span>*</span>
              </p>
            </div>
            <div className="custom-select">
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
                isMulti
              >
                <option disabled selected value="">
                  Car Category
                </option>
                <option value="HatchBack">HatchBack</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div className="label-left">
              <p>
                Color<span>*</span>
              </p>
            </div>
            <div className="custom-select">
              <select
                placeholder="Color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                
              >
                <option disabled selected value="">
                  Car color
                </option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Gray">Gray</option>
                <option value="Silver">Silver</option>
                <option value="Orange">Orange</option>
                <option value="Blue">Blue</option>
              </select>
            </div>
            <div className="label-left">
              <p>
                Available Seats<span>*</span>
              </p>
            </div>
            <input
              className="numberInputs"
              type="number"
              placeholder="Available Seats"
              min="0"
              max="10"
              value={seats}
              onChange={(e) => {
                setSeats(e.target.value);
              }}
            ></input>

            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();
                  handleAdd({
                    brand,
                    car_model: model,
                    license_plate: license,
                    image,
                    car_category: category,
                    seat_availability: seats,
                    color,
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

export default AddModal;
