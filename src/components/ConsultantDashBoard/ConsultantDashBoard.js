import React from 'react'
import SideNav from "../SideNav/SideNav";
import "./consultantDashBoard.css"

const ConsultantDashBoard = ({user}) => {
  return (
    <div className="side-nav">
    <SideNav user={user}/>
  </div>
  )
}

export default ConsultantDashBoard