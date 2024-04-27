import React, { useEffect, useState } from "react";

const OneMission = ({mission , length , start,color}) => {
    const [cells,setCells] = useState([])


      const handleCells = () => {
        const newCells = []
        for(let i = start; i < start+length; i++){
          newCells.push(i)
        }
        setCells(newCells)
      }

      useEffect(() => {
        handleCells()
      },[])

  return (
    <tr>
      <th scope="row">{mission.title}</th>
      <td style={cells.includes(0) ? {backgroundColor : color} : {backgroundColor : "transparent"} }></td>
      <td style={cells.includes(1) ? {backgroundColor : color} : {backgroundColor : "transparent"} }></td>
      <td style={cells.includes(2) ? {backgroundColor : color} : {backgroundColor : "transparent"} }></td>
      <td style={cells.includes(3) ? {backgroundColor : color} : {backgroundColor : "transparent"} }></td>
      <td style={cells.includes(4) ? {backgroundColor : color} : {backgroundColor : "transparent"} }></td>
      <td style={cells.includes(5) ? {backgroundColor : color} : {backgroundColor : "transparent"} }></td>
      <td style={cells.includes(6) ? {backgroundColor : color} : {backgroundColor : "transparent"} }></td>
    </tr>
  );
};

export default OneMission;
