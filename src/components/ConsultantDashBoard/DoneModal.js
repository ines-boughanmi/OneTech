import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

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

const DoneModal = ({
  handleClose,
  open,
  file,
  fileUpload,
  description,
  setDescription,
  reload,
}) => {

    useEffect(()=>{

    },[reload])
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="DoneContainer">
            <div className="inputLineLocation2">
              <div className="inputItemLocation2">
                <p>Description</p>
                <textarea
                  className="textarea"
                  placeholder="Enter Description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <label for="file" class="labelFile">
              {!file ? (
                <>
                  <span>
                    <FontAwesomeIcon icon={faUpload} className="iconUpload" />
                  </span>
                  <p>Click to select a File!</p>
                </>
              ) : (
                <>
                  <span>
                    <FontAwesomeIcon icon={faCheck} className="iconUpload" />
                  </span>
                  <p>File Selected!</p>
                </>
              )}
            </label>
            <input
              className="inputUpload"
              name="text"
              id="file"
              type="file"
              onChange={(e) => fileUpload(e)}
            />
          </div>

          <div className="modalButtons">
            <Button className="modalBtn" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="modalBtn"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DoneModal;
