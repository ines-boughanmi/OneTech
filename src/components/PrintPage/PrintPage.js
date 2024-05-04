import React, { useEffect, useState } from "react";
import "./printPage.css";
import logo from "../../assets/onetechb.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PrintPage = () => {
  const location = useLocation();
  const car = location.state.car;
  const mission = location.state.mission;
  const [users, setUsers] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

    return formattedDate;
  };
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3001/api/mission/getUsersByMission/${mission.id}`
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="printPage">
      <img src={logo} alt="" />
      <div className="firmDetails">
        <div className="firmDetailsLeft">
          <p>Adresse : 16, Rue des Entrepreneurs </p>
          <p>Code postal - Ville : 2035 Charguia ll</p>
          <p>Téléphone : +216 39 140 000</p>
          <p>Adresse mail : contact.onetech@onetech-group.com</p>
        </div>
        <div className="firmDetailsRight">
          <p>Nom de L'entreprise : OneTech Group</p>
        </div>
      </div>
      <div className="pageContent">
        <p>Objet : Ordre de Mission</p>
        <p>
          Par la présente , l'entreprise OneTech Group agissant en Ingénierie et
          fabrication , la mission de {mission.title}
        </p>
        <p>
          Cette mission aura lieu du {formatDate(mission.start_date)} au{" "}
          {formatDate(mission.end_date)}
        </p>
        <p>
          Le déplacement de l'équipe assigné aura lieu entre le lieu de travail
          et le lieu de sa mission, situé au {mission.location}. Pour leur
          voyage aller-retour, l'équipe utilisera les moyens de transport
          suivants :{" "}
          {mission.transport === "Car"
            ? car.brand + " " + car.car_model + " " + car.license_plate
            : mission.transport}
        </p>
          <p>L'équipe :</p>
        <div className="equipeContainer">
          {users.map((user,index) => {
            if(users[index+1]){
              return <p>{user.name + " " + user.lastname + " / "}</p>
            }
            else {
              return <p>{user.name + " " + user.lastname}</p>
            }

          })}
        </div>
        <div className="materiel">
          <p>Materiel</p>
        </div>
        <p>Fait à ................</p>
        <p>Le __/__/__</p>
        <p>Signature</p>
      </div>
      <p onClick={() => window.print()} className="printButton">
        Print
      </p>
    </div>
  );
};

export default PrintPage;
