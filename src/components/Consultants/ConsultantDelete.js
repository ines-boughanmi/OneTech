import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../ParkingDashBoard/AddModal.css";

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
  

const ConsultantDelete = ({ consultant, open, handleClose , handleDelete}) => {
  return (
<div>
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="form">
          <p>
            {" "}
            Are You sure You want to Delete Consultant{" "}
            <span className='deleteName'>{ consultant.name + " " + consultant.lastname} </span>?
          </p>
          <div className="modalButtons">
            <Button className="modalBtn" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="modalBtn" onClick={(e) => {
              e.preventDefault();
              handleDelete(consultant.id);
            }}>
              Yes
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default ConsultantDelete
