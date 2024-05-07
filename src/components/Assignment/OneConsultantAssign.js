import React from "react";

const OneConsultantAssign = ({consultant}) => {
  return (
    <div className="oneCard">
        <div className="consultantProject">
          <div className="imageCircleConsultant1">
            <img src={consultant.image} alt="" />
          </div>
          <div className="consultant-layout">
            <p>{consultant.name + " " + consultant.lastname}</p>
            <p>{consultant.location}</p>
          </div>
        </div>
    </div>
  )
}

export default OneConsultantAssign
