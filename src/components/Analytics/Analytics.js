import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import "./analytics.css";
import { BarChart } from "@mui/x-charts";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const options = [
  { label: "All Year", value: null },
  { label: "January", value: "Jan" },
  { label: "February", value: "Feb" },
  { label: "March", value: "Mar" },
  { label: "April", value: "Apr" },
  { label: "May", value: "May" },
  { label: "June", value: "Jun" },
  { label: "July", value: "Jul" },
  { label: "August", value: "Aug" },
  { label: "September", value: "Sep" },
  { label: "October", value: "Oct" },
  { label: "November", value: "Nov" },
  { label: "December", value: "Dec" },
];

const Analytics = () => {
  const [user, setUser] = useState({});
  const [projectsList, setProjectsList] = useState([]);
  const [missionsList, setMissionsList] = useState([]);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState([]);
  const [selected,setSelected] = useState({ label: "All Year", value: null })
  const [reload,setReload] = useState(false)
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

  const splitData = (response) => {
    let data1 = [];
    let data2 = [];
    response.forEach((item) => {
      data1.push(item.user);
      data2.push(item.stats);
    });
    setUsers(data1);
    setValues(data2);
  };

  const fetchStats = async () => {
    try {
      const stats = await axios.post(
        "http://localhost:3001/api/user/prepUserStat",{
          month : selected.value
        }
      );
      splitData(stats.data);
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

  const filteredDoneProjects = projectsList.filter((project) => {
    return project.status === "Done";
  });

  const filtredSupportMissions = missionsList?.filter((mission) => {
    return mission.type === "support";
  });

  const filtredNormalMissions = missionsList?.filter((mission) => {
    return mission.type === "normal";
  });
  const filtredSupportMissionsDone = missionsList?.filter((mission) => {
    return mission.type === "support" && mission.progress === "Done";
  });

  const filtredNormalMissionsDone = missionsList?.filter((mission) => {
    return mission.type === "normal" && mission.progress === "Done";
  });

  useEffect(() => {
    getUser();
    fetchMissions();
    fetchProjects();
    fetchStats();
  }, [reload]);

  return (
    <div className="addProject">
      <SideNav user={user} />
      <div className="analyticsContainer">
      <div className="consultantTitle" style={{paddingLeft : "6rem" , paddingTop :"2rem"}}>
          <p>Pages / Analytics</p>
          <h1>Analytics</h1>
        </div>
        <div className="table-section">
          <table className="table caption-top">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Total</th>
                <th scope="col">Done</th>
                <th scope="col">Progress</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Normal Missions</td>
                <td>{filtredNormalMissions.length}</td>
                <td>{filtredNormalMissionsDone.length}</td>
                <td>
                  <div className="average">
                    {filtredNormalMissions.length === 0 ? (
                      <span>0%</span>
                    ) : (
                      <span>
                        {((
                          filtredNormalMissionsDone.length /
                          filtredNormalMissions.length
                        ) * 100).toFixed(2)}
                        %
                      </span>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Support Missions</td>
                <td>{filtredSupportMissions.length}</td>
                <td>{filtredSupportMissionsDone.length}</td>
                <td>
                  <div className="average">
                    {filtredSupportMissions.length === 0 ? (
                      <span>0%</span>
                    ) : (
                      <span>
                        {((
                          filtredSupportMissionsDone.length /
                          filtredSupportMissions.length
                        )* 100).toFixed(2) }
                        %
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="charts-container">
          <div className="progress-charts">
            <h3>Projects Progress</h3>
            <div className="one-progress">
              <ProgressBar
                completed={isNaN(
                  filteredDoneProjects.length / projectsList.length
                ) ? 0 : (
                  filteredDoneProjects.length / projectsList.length
                ).toFixed(2)*100  }
                bgColor="#44A5C2"
                className="progress-bars"
              />
            </div>
          </div>
          <div className="bar-charts">
            <div className="monthSelect">
              <h3>Monthly Consultant Deployment</h3>
                <div style={{width : "20%"}}>
                <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={options}
                styles={{ width: "100%" }}
                onChange={(e)=>{
                  setSelected(e)
                  setReload(!reload)
                }}
                value={selected}
              />
                </div>
            </div>
            <BarChart
              className="bar"
              xAxis={[
                {
                  id: "barCategories",
                  data: users,
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: values,
                },
              ]}
              width={1200}
              height={400}
              colors={["#00396b"]}
              axisHighlight={{
                x: "none",
                y: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
