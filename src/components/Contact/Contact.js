import React, { useEffect, useState } from "react";
import axios from "axios";
import "./contact.css";
import SideNav from "../SideNav/SideNav";

const Contact = () => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get("http://localhost:3001/api/user/getOne", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="Contact">
      <SideNav user={user} />
    </div>
  );
};

export default Contact;
