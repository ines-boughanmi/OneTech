import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConsultantDashBoard from "../ConsultantDashBoard/ConsultantDashBoard";
import ProjectDashBoard from "../ProjectDashboard/ProjectDashBoard";
import ParkingDashBoard from "../ParkingDashBoard/ParkingDashBoard";

const DashBoard = () => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.get("http://localhost:3001/api/user/getOne", {
        headers: {
          authorization: `Bearer ${token}`,
        }, 
      });
      console.log(data.data);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const notify = () => {
    
    
    toast.success("Welcome", {
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


  useEffect(()=>{
    getUser()
    notify()
  },[])

  return (
    <div>
        {
            user.role === "CONSULTANT" ? <ConsultantDashBoard/> : user.role === "PROJECT_MANAGER" ? <ProjectDashBoard/> : <ParkingDashBoard/>
        }

        <ToastContainer  bodyClassName="toast-container" progressClassName="progress-toast" />
    </div>
  );
};

export default DashBoard;
