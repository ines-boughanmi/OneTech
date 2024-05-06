import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import "./analytics.css"
import { BarChart } from "@mui/x-charts";

const Analytics = () => {
  const [user, setUser] = useState({});
  const [projectsList, setProjectsList] = useState([]);
  const [missionsList, setMissionsList] = useState([]);


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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get(
          `http://localhost:3001/api/mission/getAll`
        );
        setMissionsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await axios.get(
          "http://localhost:3001/api/project/getAll"
        );
        data.data.reverse();
        setProjectsList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDoneProjects = projectsList.filter((project)=>{
    return project.status === "Done"  ;
  })

  const filtredSupportMissions = missionsList?.filter((mission) => {
    return mission.type === "support"  ;
  });

  const filtredNormalMissions = missionsList?.filter((mission) => {
    return mission.type === "normal"  ;
  });
  const filtredSupportMissionsDone = missionsList?.filter((mission) => {
    return mission.type === "support" && mission.progress === "Done" ;
  });

  const filtredNormalMissionsDone = missionsList?.filter((mission) => {
    return mission.type === "normal" && mission.progress === "Done" ;
  });




  useEffect(() => {
    getUser();
    fetchMissions()
    fetchProjects()
  }, []);

  return (
    <div className="addProject">
      <SideNav user={user} />
      <div className="analyticsContainer">
      <div className='table-section' >
                <table className="table caption-top">
                    <thead >
                        <tr>
                            <th scope="col" >Type</th>
                            <th scope="col">Total</th>
                            <th scope="col">Done</th>
                            <th scope="col">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >Normal Missions</td>
                            <td>{filtredNormalMissions.length}</td>
                            <td>{filtredNormalMissionsDone.length}</td>
                            <td>
                                <div className='average'>
                                    {
                                        filtredNormalMissions.length === 0 ? <span>0%</span> : <span>{(filtredNormalMissionsDone.length/filtredNormalMissions.length).toFixed(2)*100}%</span>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td >Support Missions</td>
                            <td>{filtredSupportMissions.length}</td>
                            <td>{filtredSupportMissionsDone.length}</td>
                            <td>
                                <div className='average'>
                                     {
                                        filtredSupportMissions.length === 0 ? <span>0%</span> : <span>{(filtredSupportMissionsDone.length/filtredSupportMissions.length).toFixed(2)*100}%</span>
                                     }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='charts-container' >

                <div className='progress-charts' >
                    <h3>Projects Progress</h3>
                    <div className='one-progress'>
                        <ProgressBar completed={(filteredDoneProjects.length/projectsList.length).toFixed(2)} bgColor='#44A5C2' className='progress-bars'/>
                    </div>
                </div>
                <div className='bar-charts'>
                    <h3>Monthly Consultant Deployment</h3>
                    <BarChart className='bar'
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: ['Aluminum', 'Plastic', 'CardBox', 'Glass', 'Copper'],
                                scaleType: 'band',
                            },
                        ]}  
                        series={[
                            {
                                data: [6,6 ,6 ,6 , 6],
                            },
                        ]}
                        width={800}
                        height={400}
                        colors={['#00396b']}
                        axisHighlight={{
                            x : 'none',
                            y : 'none'
                        }}
                    /> 
                </div>
            </div>
      </div>
    </div>
  );
};

export default Analytics;
