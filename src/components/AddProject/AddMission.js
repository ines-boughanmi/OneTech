import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";




const animatedComponents = makeAnimated();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const municipalities = [
  { label: "Tunis , Tunis", value: "Tunis" },
  { label: "Tunis , La Marsa", value: "La Marsa" },
  { label: "Tunis , Sidi Bou Said", value: "Sidi Bou Said" },
  { label: "Tunis , Carthage", value: "Carthage" },
  { label: "Tunis , Le Kram", value: "Le Kram" },
  { label: "Ariana , Ariana", value: "Ariana" },
  { label: "Ariana , Raoued", value: "Raoued" },
  { label: "Ariana , Sidi Thabet", value: "Sidi Thabet" },
  { label: "Ariana , Mnihla", value: "Mnihla" },
  { label: "Ariana , Kalaat El Andalous", value: "Kalaat El Andalous" },
  { label: "Ariana , La Soukra", value: "La Soukra" },
  { label: "Ben Arous , Bou Mhel el-Bassatine", value: "Bou Mhel el-Bassatine" },
  { label: "Ben Arous , El Mourouj", value: "El Mourouj" },
  { label: "Ben Arous , Hammam Lif", value: "Hammam Lif" },
  { label: "Ben Arous , Borj El Amri", value: "Borj El Amri" },
  { label: "Manouba , Manouba", value: "Manouba" },
  { label: "Manouba , Douar Hicher", value: "Douar Hicher" },
  { label: "Manouba , Oued Ellil", value: "Oued Ellil" },
  { label: "Nabeul , Dar Chaabane El Fehri", value: "Dar Chaabane El Fehri" },
  { label: "Nabeul , Beni Khiar", value: "Beni Khiar" },
  { label: "Nabeul , El Haouaria", value: "El Haouaria" },
  { label: "Nabeul , Menzel Temime", value: "Menzel Temime" },
  { label: "Nabeul , Takelsa", value: "Takelsa" },
  { label: "Nabeul , Soliman", value: "Soliman" },
  { label: "Zaghouan , Zaghouan", value: "Zaghouan" },
  { label: "Bizerte , Bizerte Nord", value: "Bizerte Nord" },
  { label: "Bizerte , Bizerte Sud", value: "Bizerte Sud" },
  { label: "Bizerte , Mateur", value: "Mateur" },
  { label: "Bizerte , Joumine", value: "Joumine" },
  { label: "Bizerte , Ghezala", value: "Ghezala" },
  { label: "Bizerte , Aousja", value: "Aousja" },
  { label: "Bizerte , Tinja", value: "Tinja" },
  { label: "Bizerte , Menzel Bourguiba", value: "Menzel Bourguiba" },
  { label: "Bizerte , Ras Jebel", value: "Ras Jebel" },
  { label: "Béja , Béja", value: "Béja" },
  { label: "Béja , Medjez el-Bab", value: "Medjez el-Bab" },
  { label: "Béja , Testour", value: "Testour" },
  { label: "Béja , Nefza", value: "Nefza" },
  { label: "Béja , Amdoun", value: "Amdoun" },
  { label: "Jendouba , Jendouba", value: "Jendouba" },
  { label: "Jendouba , Tabarka", value: "Tabarka" },
  { label: "Le Kef , El Kef", value: "El Kef" },
  { label: "Le Kef , Dahmani", value: "Dahmani" },
  { label: "Le Kef , Sakiet Sidi Youssef", value: "Sakiet Sidi Youssef" },
  { label: "Le Kef , Nebeur", value: "Nebeur" },
  { label: "Le Kef , Kalâat Senan", value: "Kalâat Senan" },
  { label: "Siliana , Siliana", value: "Siliana" },
  { label: "Siliana , Makthar", value: "Makthar" },
  { label: "Siliana , Bou Arada", value: "Bou Arada" },
  { label: "Sousse , Sousse", value: "Sousse" },
  { label: "Sousse , Msaken", value: "Msaken" },
  { label: "Sousse , Kalâa Kebira", value: "Kalâa Kebira" },
  { label: "Sousse , Akouda", value: "Akouda" },
  { label: "Sousse , Hammam Sousse", value: "Hammam Sousse" },
  { label: "Monastir , Monastir", value: "Monastir" },
  { label: "Monastir , Moknine", value: "Moknine" },
  { label: "Monastir , Téboulba", value: "Téboulba" },
  { label: "Monastir , Sayada-Lamta-Bou Hajar", value: "Sayada-Lamta-Bou Hajar" },
  { label: "Mahdia , Mahdia", value: "Mahdia" },
  { label: "Mahdia , Chebba", value: "Chebba" },
  { label: "Mahdia , Rejiche", value: "Rejiche" },
  { label: "Mahdia , El Jem", value: "El Jem" },
  { label: "Sfax , Sfax", value: "Sfax" },
  { label: "Sfax , Sakiet Ezzit", value: "Sakiet Ezzit" },
  { label: "Sfax , Sakiet Eddaier", value: "Sakiet Eddaier" },
  { label: "Sfax , Gremda", value: "Gremda" },
  { label: "Sfax , Thyna", value: "Thyna" },
  { label: "Sfax , Agareb", value: "Agareb" },
  { label: "Sfax , El Hencha", value: "El Hencha" },
  { label: "Sfax , Menzel Chaker", value: "Menzel Chaker" },
  { label: "Kairouan , Kairouan", value: "Kairouan" },
  { label: "Kairouan , Sbikha", value: "Sbikha" },
  { label: "Kairouan , Hajeb El Ayoun", value: "Hajeb El Ayoun" },
  { label: "Kairouan , Nasrallah", value: "Nasrallah" },
  { label: "Kairouan , Oueslatia", value: "Oueslatia" },
  { label: "Kairouan , Haffouz", value: "Haffouz" },
  { label: "Kairouan , Bou Hajla", value: "Bou Hajla" },
  { label: "Kasserine , Kasserine", value: "Kasserine" },
  { label: "Kasserine , Fériana", value: "Fériana" },
  { label: "Kasserine , Sbeitla", value: "Sbeitla" },
  { label: "Kasserine , Majel Bel Abbès", value: "Majel Bel Abbès" },
  { label: "Kasserine , Sbiba", value: "Sbiba" },
  { label: "Kasserine , El Ayoun", value: "El Ayoun" },
  { label: "Kasserine , Haidra", value: "Haidra" },
  { label: "Kasserine , Foussana", value: "Foussana" },
  { label: "Kasserine , Sidi Bouzid Est", value: "Sidi Bouzid Est" },
  { label: "Sidi Bouzid , Sidi Bouzid", value: "Sidi Bouzid" },
  { label: "Sidi Bouzid , Menzel Bouzaiane", value: "Menzel Bouzaiane" },
  { label: "Sidi Bouzid , Jilma", value: "Jilma" },
  { label: "Sidi Bouzid , Regueb", value: "Regueb" },
  { label: "Sidi Bouzid , Mezzouna", value: "Mezzouna" },
  { label: "Sidi Bouzid , Bir El Hafey", value: "Bir El Hafey" },
  { label: "Sidi Bouzid , Thala", value: "Thala" },
  { label: "Gabès , Gabès", value: "Gabès" },
  { label: "Gabès , Gabès Médina", value: "Gabès Médina" },
  { label: "Gabès , Gabès Ouest", value: "Gabès Ouest" },
  { label: "Gabès , El Hamma", value: "El Hamma" },
  { label: "Gabès , Mareth", value: "Mareth" },
  { label: "Gabès , Métouia", value: "Métouia" },
  { label: "Gabès , Matmata", value: "Matmata" },
  { label: "Médenine , Médenine", value: "Médenine" },
  { label: "Médenine , Ben Gardane", value: "Ben Gardane" },
  { label: "Médenine , Zarzis", value: "Zarzis" },
  { label: "Médenine , Djerba Houmt Souk", value: "Djerba Houmt Souk" },
  { label: "Médenine , Djerba Midoun", value: "Djerba Midoun" },
  { label: "Médenine , Djerba Ajim", value: "Djerba Ajim" },
  { label: "Médenine , Sidi Makhlouf", value: "Sidi Makhlouf" },
  { label: "Tataouine , Tataouine", value: "Tataouine" },
  { label: "Tataouine , Ghomrassen", value: "Ghomrassen" },
  { label: "Tataouine , Bir Lahmar", value: "Bir Lahmar" },
  { label: "Tataouine , Dehiba", value: "Dehiba" },
  { label: "Gafsa , Gafsa", value: "Gafsa" },
  { label: "Gafsa , Moulares", value: "Moulares" },
  { label: "Gafsa , Mdhila", value: "Mdhila" },
  { label: "Gafsa , Metlaoui", value: "Metlaoui" },
  { label: "Gafsa , El Ksar", value: "El Ksar" },
  { label: "Gafsa , Redeyef", value: "Redeyef" },
  { label: "Gafsa , Sened", value: "Sened" },
  { label: "Tozeur , Tozeur", value: "Tozeur" },
  { label: "Tozeur , Nefta", value: "Nefta" },
  { label: "Tozeur , Degache", value: "Degache" },
  { label: "Tozeur , Hazoua", value: "Hazoua" },
  { label: "Kebili , Kebili", value: "Kebili" },
  { label: "Kebili , Douz", value: "Douz" },
  { label: "Kebili , Souk Lahad", value: "Souk Lahad" },
  { label: "Kebili , El Golâa", value: "El Golâa" },
  { label: "Kebili , Faouar", value: "Faouar" }
];



const AddMission = ({projectId,users,dates,reload,setReload }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const[id,setId] = useState(projectId);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("normal");
  const [location, setLocation] = useState({});
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([])
  const [missions,setMissions] = useState([]);
  const [dateToCut, setDateToCut] = useState({})
  const [dateToCutEnd, setDateToCutEnd] = useState({})
  const [index, setIndex] = useState(0)
  const [indexEnd, setIndexEnd] = useState(dates.length)
  const [permission,setPermission] = useState(true)

  const handleOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setDateToCut({});
    setDateToCutEnd({});
    setIndex(0);
    setIndexEnd(dates.length);
    setPermission(true);
  };

  const notifyMissionAdd = () => {
    toast.success("Mission Added", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleAddPartition = async (mission) => {
    selected.map( async (user)=>{
      await axios.post("http://localhost:3001/api/partition/create",{userId: user.value,missionId:mission.id , end_date : mission.end_date})
    })

  }

  const handleOptions = (users) => {

    const filteredUsers = users.filter((user)=>{
      return user.role === "CONSULTANT" && user.validity === true
    }) 
    const options = filteredUsers.map((user) => {
      return {
        value: user.id,
        label: user.name + " " + user.lastname,
      };
    });
    setOptions(options);
  }

  const notifyRequired = () => { 
    toast.error("Please fill all required fields", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
  }

  const addDate = (date, amount) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  };

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
  const extractRange = (start,end) => {
    let arr = []
    let date = start
    while (formatDate(date) !== formatDate(end)){
        arr.push(formatDate(date))
        date = addDate(date,1)
    }
    arr.push(formatDate(end))
    return arr
    
}
 
const checkExistence = async (missions,options) => {
  if(!missions.length){
    setOptions(options)
    // console.log(options);
    return
  }
  if(startDate && endDate){
    let datesToCheck = extractRange(missions[0].start_date,missions[0].end_date)
    let createdDates = extractRange(startDate,endDate)
    console.log("1", datesToCheck,"2",createdDates);
    let filteredOptions = options
    let i =0 
  
    while(i<datesToCheck.length){
      if(createdDates.includes(datesToCheck[i])){
        const partitions = await axios.get(`http://localhost:3001/api/partition/getPartitionsByMission/${missions[0].id}`).then((partitions)=>{
          partitions.data.forEach((partition)=>{
            filteredOptions = options.filter((option)=>{
              return option.value !== partition.userId
            })
          })
          // console.log(filteredOptions);
        })
      }
      else{
        setReload(!reload)
      }
      i++
    }
    checkExistence(missions.slice(1),filteredOptions)
  }
}


  const handleClose = () => setOpen(false);

  const handleAdd = async (body) => {
    try {
      if (!body.title || !body.description || !body.location || !body.start_date || !body.end_date || !selected.length) {
        notifyRequired();
        return; 
      }
      const token = localStorage.getItem("token");
      if (token) {
        const mission = await axios.post("http://localhost:3001/api/mission/create", {
          title: body.title,
          description: body.description,
          start_date: body.start_date,
          end_date: body.end_date,
          type: body.type,
          location: body.location.label,
          projectId: body.projectId,
        });
        handleAddPartition(mission.data);
        notifyMissionAdd();
        handleClose();
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitleError = () => {
    if (!title.length) {
      setErrors({
        ...errors,
        titleError: "Title is required",
      });
    } else {
      setErrors({
        ...errors,
        titleError: "",
      });
    }
  };

  const handleHumanResources = async () => {
    try {
      const token = localStorage.getItem('token')
      if(token){
        const missions = await axios.get(`http://localhost:3001/api/mission/getAll`)
        setMissions(missions.data); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePermission = () => {
    if(dateToCut.value){
      setPermission(false)
    }
  }

  function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
  
const extractIndex = ()=>{
  dates.forEach((date , i)=>{
      if(compareObjects(date,dateToCut)){
          setIndex(i)
      }
  }) 
}
const extractIndexEnd = ()=>{
  dates.forEach((date , i)=>{
      if(compareObjects(date,dateToCutEnd)){
          setIndexEnd(i+1)
      }
  }) 
}


  useEffect(()=>{
    handleHumanResources();
    handleOptions(users)
  },[reload])

  return (
    <div className="place">
      <div className="button-rightMission">
        <button className="button-addMission" onClick={(e)=>{
          handleOpen()
          handleOptions(users)
        }}>
          + Mission
        </button>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="form">
            <div className="missionLine">
              <p>
                Title<span>*</span>
              </p>
            </div>
            <input
              type="text"
              className="textInputs"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              onBlur={(e) => {
                handleTitleError();
              }}
            />
            <div className="missionLine">
              {errors.titleError ? (
                <small className="text-danger">{errors.titleError}</small>
              ) : (
                <></>
              )}
            </div>


            <div className="missionLine">
              <p>
                Start Date<span>*</span>
              </p>
            </div>
            <div style={{width : '100%'}}>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dates.slice(0, indexEnd || dates.length)}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setStartDate(e.value);
                  setDateToCut(e)
                }}
                onBlur={(e)=>{
                  extractIndex()
                  handlePermission()
                }}
              />
            </div>
            <div className="missionLine">
              {errors.startDateError ? (
                <small className="text-danger">{errors.startDateError}</small>
              ) : (
                <></>
              )}
            </div>
            <div className="missionLine">
              <p>
                Finish Date<span>*</span>
              </p>
            </div>
            <div style={{width : '100%'}}>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dates.slice(index,dates.length)}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setEndDate(e.value);
                  setDateToCutEnd(e)
                }}
                onBlur={(e)=>{
                  checkExistence(missions,options)
                  extractIndexEnd()
                }}
                isDisabled = {permission}
              />
            </div>
            <div className="missionLine">
              {errors.endDateError ? (
                <small className="text-danger">{errors.endDateError}</small>
              ) : (
                <></>
              )}
            </div>
            <div className="missionLine">
              <p>
                Consultants<span>*</span>
              </p>
            </div>
            <div style={{width : '100%'}}>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setSelected(e);
                }}
              />
            </div>

            
            <div className="missionLine">
              <p>
                Location<span>*</span>
              </p>
            </div>
            <div style={{width : '100%'}}>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={municipalities}
                styles={{width: '100%'}}
                onChange={(e)=>{
                  setLocation(e);
                }}
              />
            </div>
            <div className="missionLine">
              <p>
                Description<span>*</span>
              </p>
            </div>
            <textarea
              type="text"
              className="textInputArea"
              placeholder="Enter Description here..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();
                  handleAdd({
                    projectId:id,
                    title,
                    description,
                    start_date:startDate,
                    end_date:endDate,
                    location,
                    type,
                  });
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMission;
