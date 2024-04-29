import React, { useEffect, useState } from 'react'
import SideNav from '../SideNav/SideNav'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import OneSchedule from './OneSchedule';
import { useLocation } from 'react-router-dom';

const Schedule = () => {
    const [missions,setMissions] = useState([])
    const [reload, setReload] = useState(true);
    const [partitions,setPartitions] = useState([])
    const [projects,setProjects] = useState([])
    const location = useLocation()
    const user = location.state.user

    const getUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const data = await axios.get("http://localhost:3001/api/user/getOne", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            // setUser(data.data);
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
            setMissions(data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }

      function removeDuplicatesByKey(arr, key) {
        return arr.filter((obj, index, self) =>
          index === self.findIndex((t) => (
            t[key] === obj[key]
          ))
        );
      }
      const getProjects = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const data = await axios.get(`http://localhost:3001/api/project/getProjectsByUser/${user.id}`)
            setProjects(removeDuplicatesByKey(data.data,'id'));
          }
        } catch (error) {
          console.log(error);
        }
      }


        

      useEffect(()=>{
        getProjects()
      },[])

  return (
    <div className='dash'>
        <SideNav user={user}/>
        <div className="projects">
      <div className="searchGroup">
        <div className="search-section3">
          <div className="container-search3">
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Search"

            />
            <button className="search__btn" onClick={(e)=>{
              e.preventDefault()
              
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#efeff1"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="userLayout">
          <FontAwesomeIcon className="iconBell" icon={faBell} />
          <div className="imageCircleUser">
            <img src={user.image} alt="" />
          </div>
        </div>
      </div> 
      <div className="projectsContainer">
        <div className="consultantTitle">
          <p>Pages / Schedule</p>
          <h1>Schedule</h1>
        </div>
        {projects.length ? (
        <div className="projectContent">
        {
          projects?.map((project,index)=>{
            return <OneSchedule key={index} project={project} />
          })
        }
        

    </div>
        ) : (
          <div className="noCar-container">
            <p className="noCars">No Projects Available For You</p>
          </div>
        )}

      </div>
    </div>
    </div>
  )
}

export default Schedule