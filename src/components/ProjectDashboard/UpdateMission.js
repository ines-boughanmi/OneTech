import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();


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

const UpdateMission = ({
  handleClose,
  open,
  mission,
  handleUpdateMission,
  dates,
  reload,
  setReload,
  missions
}) => {
  const [title, setTitle] = useState(mission.title);
  const [description, setDescription] = useState(mission.description);
  const [startDate, setStartDate] = useState(mission.start_date);
  const [endDate, setEndDate] = useState(mission.end_date);
  const [location, setLocation] = useState({label : mission.location , value : mission.location.split(',')[1].slice(1) });
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    
    const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;
    return { label: formattedDate, value: dateString.substring(0,10) };
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

    return formattedDate;
  };

  const [dateToCut, setDateToCut] = useState(formatDate(mission.start_date))
  const [dateToCutEnd, setDateToCutEnd] = useState(formatDate(mission.end_date))

  const [index, setIndex] = useState(0)
  const [indexEnd, setIndexEnd] = useState(dates.length)

  const extractRange = (start,end) => {
    let arr = []
    let date = start
    while (formatDate2(date) !== formatDate2(end)){
        arr.push(formatDate2(date))
        date = addDate(date,1)
    }
    arr.push(formatDate2(end))
    return arr
    
}


const addDate = (date, amount) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};

  const prepBody = (arr) => {
    let body = {};
    arr.forEach((user) => {
      body[user.label] = user.value;
    });
    body.endDate = endDate;
    return body;
  };


  const handleUpdateUsers = async () => {
    try {
      if (!selected.length ) {
        return;
      }
      const body = prepBody(selected);
      const token = localStorage.getItem("token");
      if(token){
        await axios.post(
          `http://localhost:3001/api/partition/updateUsers/${mission.id}`,
          body
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("http://localhost:3001/api/user/getAll");
        handleOptions(res.data);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedUsers = async () => {
    try {
      await axios
        .get(
          `http://localhost:3001/api/partition/getUsersByMission/${mission.id}`
        )
        .then((data) => {
          const selected = handleSelectedOptions(data.data);
          setSelected(selected);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectedOptions = (users) => {
    const filteredUsers = users.filter((user) => {
      return user.role === "CONSULTANT" && user.validity === true;
    });
    const options = filteredUsers.map((user) => {
      return {
        value: user.id,
        label: user.name + " " + user.lastname,
      };
    });
    return options;
  };

  const handleOptions = (users) => {
    const filteredUsers = users.filter((user) => {
      return user.role === "CONSULTANT" && user.validity === true;
    });
    const options = filteredUsers.map((user) => {
      return {
        value: user.id,
        label: user.name + " " + user.lastname,
      };
    });
    setOptions(options);
  };

  useEffect(() => {
    fetchUsers();
    handleSelectedUsers();
  }, []);

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

  const handleDescriptionError = () => {
    if (!description.length) {
      setErrors({
       ...errors,
        descriptionError: "Description is required",
      });
    } else {
      setErrors({
       ...errors,
        descriptionError: "",
      });
    }
  };

  const checkExistence = async (missions,options) => {
    if(!missions.length){
      setOptions(options)
      return
    }
    if(startDate && endDate){
      let datesToCheck = extractRange(missions[0].start_date,missions[0].end_date)
      let createdDates = extractRange(startDate,endDate)
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
  extractIndex()
  extractIndexEnd()
  checkExistence(missions,options)
},[])

  return (
    <div className="place">
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
            <div style={{ width: "100%" }}>
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
                }}
                value={formatDate(startDate)}
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
            <div style={{ width: "100%" }}>
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
                value={formatDate(endDate)}
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
            <div style={{ width: "100%" }}>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                styles={{ width: "100%" }}
                onChange={(e) => {
                  setSelected(e);
                }}
                value={selected}
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
                value={location}
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
              onBlur={(e) => {
                handleDescriptionError();
              }}
              value={description}
            />
             <div className="missionLine">
              {errors.descriptionError ? (
                <small className="text-danger">{errors.descriptionError}</small>
              ) : (
                <></>
              )}
            </div>
            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateMission(mission.id, {
                    title,
                    description,
                    start_date: startDate,
                    end_date: endDate,
                    location,
                    users : selected.length
                  });
                  handleUpdateUsers()
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateMission;
