import React from "react";

import LowerPlanning from "../AddProject/LowerPlanning";

const OneSchedule = ({project}) => {
  return (
    <div className="OneProject">
      <div className="projectTitle">
        <h2>{project.project_title}</h2>
      </div>
      <LowerPlanning  project={project} start_date={project.start_date}/>
    </div>
  )
}

export default OneSchedule