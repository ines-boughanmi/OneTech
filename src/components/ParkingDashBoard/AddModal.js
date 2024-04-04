import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./AddModal.css"
import add from "../../assets/4211763.png"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const AddModal = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setImage("");
  };
  const handleClose = () => setOpen(false);

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

            <div className="custom-select">
              <select>
                <option disabled selected value="">
                  Car Brand
                </option>
                <option value="Hyundai">Hyundai</option>
                <option value="Citroen">Citroen</option>
                <option value="Toyota">Toyota</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Car Model Name"
              className="textInputs"
            />
            <input
              type="text"
              placeholder="license plate Number"
              className="textInputs"
            />

            <div className="custom-select">
              <select>
                <option disabled selected value="">
                  Car Category
                </option>
                <option value="HatchBack">HatchBack</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div className="custom-select">
              <select placeholder="Color">
                <option disabled selected value="">
                  Car color
                </option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="gray">gray</option>
                <option value="silver">silver</option>
                <option value="orange">orange</option>
                <option value="blue">blue</option>
              </select>
            </div>
            <input
            className="numberInputs"
              type="number"
              placeholder="Available Seats"
              min="0"
              max="10"
            ></input>

            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="modalBtn">Add</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddModal;
