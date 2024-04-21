import React, { useEffect, useState } from 'react'
import SideNav from '../SideNav/SideNav'
import axios from 'axios';

const Schedule = () => {
    const [user, setUser] = useState({});
    const [missions,setMissions] = useState([])
    const [reload, setReload] = useState(true);


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

      const getMissionsByUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const data = await axios.get(`http://localhost:3001/api/partition/getPatitionsByUserId/${user?.id}`)
            console.log(data.data);
            setMissions(data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      const getProjectsByMission = async (arr) => {
        try {
            const body = prepBody(arr);
            console.log(body);
        //   const token = localStorage.getItem("token");
        //   if (token) {
        //     const data = await axios.get(`http://localhost:3001/api/user/getProjectsByMission/${user.id}`)
        //     setUser(data.data);
        //     console.log(data.data);
        //   }
        } catch (error) {
          console.log(error);
        }
      }

      const prepBody = (arr) => {
        let body = {};
        arr?.forEach((user) => {
          body[user.label] = user.value;
        });
        return body;
      };

      useEffect(()=>{
        getUser().then(()=>{

            getMissionsByUser().then(()=>{
                getProjectsByMission(missions)
            })
        })
        
      },[])

  return (
    <div className='dash'>
        <SideNav user={user}/>

    </div>
  )
}

export default Schedule