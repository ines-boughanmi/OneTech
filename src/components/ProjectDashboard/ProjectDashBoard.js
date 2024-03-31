import React from "react";
import SideNav from "../SideNav/SideNav";
import "./projectDashboard.css"

const ProjectDashBoard = ({ user }) => {
  return (
      <div className="side-nav">
        <SideNav user={user}/>
      </div>
  )
}

export default ProjectDashBoard;
