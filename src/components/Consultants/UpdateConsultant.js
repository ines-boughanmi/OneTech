import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../ParkingDashBoard/AddModal.css";
import add from "../../assets/4211763.png";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";




const animatedComponents = makeAnimated();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
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


const UpdateConsultant = ({ handleClose, open, consultant , reload ,setReload }) => {
  const [name, setName] = useState(consultant.name);
  const [lastName, setLastName] = useState(consultant.lastname);
  const [email, setEmail] = useState(consultant.email);
  const [location, setLocation] = useState({label : consultant.location , value : consultant.location.split(',')[1].slice(1)});
  const [phone, setPhone] = useState(consultant.phone);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(consultant.image);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const profileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "oztadvnr");
    await axios
      .post("https://api.cloudinary.com/v1_1/dl4qexes8/upload", formData)
      .then((response) => {
        setImage(response.data["secure_url"]);
      })
      .catch((error) => {
        throw error;
      });
  };

  const checkEmailExistence = async (email) => {
    try {
      const users = await axios.get("http://localhost:3001/api/user/getAll")
      for (let user of users.data) {
        if(user.id !== consultant.id){
          if (user.email === email) {
            return true;
          }
        }
      }
      return false
    } catch (error) {
      console.log(error);
    }
  }

  const handlePasswordError = () => {
 if (password.length < 6) {
      setErrors({
        ...errors,
        passwordError: "Password should be at least 6 charachters",
      });
    } else {
      setErrors({
        ...errors,
        passwordError: "",
      });
    }
  };

  const handleEmailError = async () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.length) {
      setErrors({
        ...errors,
        emailError: "Email is required",
      });
    } else if (!regex.test(email)) {
      setErrors({
        ...errors,
        emailError: "Email is not a valid email",
      });
    } else if (await checkEmailExistence(email)) {
      setErrors({
       ...errors,
        emailError: "Email already exists",
      });
    }    
    else {
      setErrors({
        ...errors,
        emailError: "",
      });
    }
  };
  const handlePhoneError = () => {
    let regex = /^\d+$/
    if (!phone.length) {
      setErrors({
        ...errors,
        phoneError: "Phone is required",
      });
    } else if (!regex.test(phone)){
      setErrors({
        ...errors,
        phoneError: "Phone is not a valid phone number",
      });
    }  
    else {
      setErrors({
        ...errors,
        phoneError: "",
      });
    }
  };

  const handleLocationError = () => {
    if (!location.label) {
      setErrors({
        ...errors,
        locationError: "Location is required",
      });
    } else {
      setErrors({
        ...errors,
        locationError: "",
      });
    }
  };

  const handleLastNameError = () => {
    if (!lastName.length) {
      setErrors({
        ...errors,
        lastNameError: "Last Name is required",
      });
    } else if (lastName.length <3){
      setErrors({
        ...errors,
        lastNameError: "Last Name must be at least 3 characters",
      });
    }
     else {
      setErrors({
        ...errors,
        lastNameError: "",
      });
    }
  };

  const handleNameError = () => {
    if (!name.length) {
      setErrors({
        ...errors,
        nameError: "Name is required",
      });
    } else if(name.length < 3){
      setErrors({
        ...errors,
        nameError: "Name must be at least 3 characters",
      });
    } 
    else {
      setErrors({
        ...errors,
        nameError: "",
      });
    }
  };
  const notifyRequired = () => { 
    if(!name || !lastName || !email || !location.label || !phone  ){
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
    else if (errors.nameError) {
      toast.error(errors.nameError, {
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
    else if (errors.lastNameError) {
      toast.error(errors.lastNameError, {
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
    else if (errors.emailError){
      toast.error(errors.emailError, {
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
    else if (errors.locationError){
      toast.error(errors.locationError, {
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
    else if (errors.phoneError){
      toast.error(errors.phoneError, {
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
    else if (errors.passwordError){
      toast.error(errors.passwordError, {
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
    else if (errors.confirmPasswordError){
      toast.error(errors.confirmPasswordError, {
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
  }
  const notifyConsultantUpdate = () => {
    toast.success("Consultant Updated", {
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

  const handleUpdate = async (id, body) => {
    try {
      if (!body.name || !body.lastName || !body.email || !body.phone || !body.image || !body.location) {
        notifyRequired();
        return;
      }
      else if (Object.keys(errors).length) {
        notifyRequired();
      }
      if(!errors.nameError && !errors.lastNameError && !errors.passwordError && !errors.emailError && !errors.locationError && !errors.phoneError ){
        const token = localStorage.getItem("token");
        if (token) {
          if(body.password){
            await axios.put(`http://localhost:3001/api/user/update/${id}`, {
              name : body.name ,
              lastname : body.lastName ,
              email : body.email,
              phone : body.phone ,
              image : body.image,
              location : body.location.label,
              password:body.password
            });
            notifyConsultantUpdate();
            setReload(!reload);
            handleClose();
          }
          else{
            await axios.put(`http://localhost:3001/api/user/update/${id}`, {
              name : body.name ,
              lastname : body.lastName ,
              email : body.email,
              phone : body.phone ,
              image : body.image,
              location : body.location.label
            });
            notifyConsultantUpdate();
            setReload(!reload);
            handleClose();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="formContainer">
            {/* Replacing the input with the custom file upload label */}
            <label className="custum-file-upload" htmlFor="file">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  viewBox="0 0 24 24"
                >
                  {/* SVG code */}
                </svg>
              </div>
              <div className="text">
                <img src={image || add} alt="" className="addImage" />
              </div>
              <input type="file" id="file" onChange={(e) => profileUpload(e)} />
            </label>
            {/* End of custom file upload label */}

            <div className="formContent">
              <div className="formContainerLeft">
                <div className="label-left">
                  <p>
                    First Name<span>*</span>
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Consultant Name"
                  className="textInputs"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleNameError();
                  }}
                  value={name}
                />
                <div className="missionLine">
                  {errors.nameError ? (
                    <small className="text-danger">{errors.nameError}</small>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="label-left">
                  <p>
                    Email<span>*</span>
                  </p>
                </div>

                <input
                  type="email"
                  placeholder="Consultant Email"
                  className="textInputs"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleEmailError();
                  }}
                  value={email}
                />
                <div className="missionLine">
                  {errors.emailError ? (
                    <small className="text-danger">{errors.emailError}</small>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="label-left">
                  <p>
                    Phone<span>*</span>
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Consultant Phone"
                  className="textInputs"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  onBlur={(e) => {
                    handlePhoneError();
                  }}
                  value={phone}
                />
                <div className="missionLine">
                  {errors.phoneError ? (
                    <small className="text-danger">{errors.phoneError}</small>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="formContainerRight">
                <div className="label-left">
                  <p>
                    Last Name<span>*</span>
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Consultant LastName"
                  className="textInputs"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  onBlur={(e) => {
                    handleLastNameError();
                  }}
                  value={lastName}
                />
                <div className="missionLine">
                  {errors.lastNameError ? (
                    <small className="text-danger">
                      {errors.lastNameError}
                    </small>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="label-left">
                  <p>
                    Password<span>*</span>
                  </p>
                </div>
                <div className="passwordLayout">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Consultant Password"
                    className="textInputs1"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={(e) => {
                      handlePasswordError();
                    }}
                    value={password}
                  />
                  {show ? (
                    <FontAwesomeIcon
                      className="iconPassword"
                      icon={faEye}
                      onClick={(e) => setShow(!show)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="iconPassword"
                      icon={faEyeSlash}
                      onClick={(e) => setShow(!show)}
                    />
                  )}
                </div>
                <div className="missionLine">
                  {errors.passwordError ? (
                    <small className="text-danger">
                      {errors.passwordError}
                    </small>
                  ) : (
                    <></>
                  )}
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

              </div>
            </div>

            <div className="modalButtons">
              <Button className="modalBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                className="modalBtn"
                onClick={(e) => {
                  e.preventDefault();

                  handleUpdate(consultant.id, {
                    name,
                    lastName,
                    email,
                    password,
                    phone,
                    image,
                    location,
                  });
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateConsultant;
