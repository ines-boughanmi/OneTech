import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConsultantDashBoard from "../ConsultantDashBoard/ConsultantDashBoard";
import ProjectDashBoard from "../ProjectDashboard/ProjectDashBoard";

import SideNav from "../SideNav/SideNav";
import "./dashboard.css";
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
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="dash">
      <div className="side-nav">
        <SideNav user={user} />
      </div>
      {user.role === "CONSULTANT" ? (
        <ConsultantDashBoard user={user} />
      ) : user.role === "PROJECT_MANAGER" ? (
        <ProjectDashBoard user={user} />
      ) : user.role === "PARKING_MANAGER" ? (
        <ParkingDashBoard user={user} />
      ) : (
        <></>
      )}

      <ToastContainer
        bodyClassName="toast-container"
        progressClassName="progress-toast"
      />
    </div>
  );
};

export default DashBoard;
