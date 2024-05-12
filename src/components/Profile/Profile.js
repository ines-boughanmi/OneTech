import { useNavigate } from "react-router-dom";
import "./profile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNav from "../SideNav/SideNav";
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
  {
    label: "Ben Arous , Bou Mhel el-Bassatine",
    value: "Bou Mhel el-Bassatine",
  },
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
  {
    label: "Monastir , Sayada-Lamta-Bou Hajar",
    value: "Sayada-Lamta-Bou Hajar",
  },
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
  { label: "Kebili , Faouar", value: "Faouar" },
];

const Profile = () => {
  useEffect(() => {
    getUser();
  }, []);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState({});
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const notifyError = () => {
    toast.error("check your Credentials", {
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
  const notify = () => {
    toast.success("Profile Edited", {
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

  const notifyPassError = () => {
    toast.error("check your Password", {
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
  const checkPass = async (body) => {
    try {
      if (password) {
        const data = await axios.post(
          "http://localhost:3001/api/user/passCheck",
          body
        );
        if (data.data.message) {
          setErrors({
            ...errors,
            passwordError: "Password is incorrect",
          });
        } else {
          setErrors({
            ...errors,
            passwordError: "",
          });
        }
      } else {
        setErrors({
          ...errors,
          passwordError: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        setName(data.data.name);
        setLastName(data.data.lastname);
        setEmail(data.data.email);
        setLocation({
          label: data.data.location,
          value: data.data.location.split(",")[1].slice(1),
        });
        setPhone(data.data.phone);
        setImage(data.data.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailExistence = async (email) => {
    try {
      const users = await axios.get("http://localhost:3001/api/user/getAll");
      for (let userToCheck of users.data) {
        if (userToCheck.id !== user.id) {
          if (userToCheck.email === email) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.log(error);
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
    } else {
      setErrors({
        ...errors,
        emailError: "",
      });
    }
  };
  const handlePhoneError = () => {
    let regex = /^\d+$/;
    if (!phone.length) {
      setErrors({
        ...errors,
        phoneError: "Phone is required",
      });
    } else if (!regex.test(phone)) {
      setErrors({
        ...errors,
        phoneError: "Phone is not a valid phone number",
      });
    } else {
      setErrors({
        ...errors,
        phoneError: "",
      });
    }
  };

  const handleLastNameError = () => {
    if (!lastName.length) {
      setErrors({
        ...errors,
        lastNameError: "Last Name is required",
      });
    } else if (lastName.length < 3) {
      setErrors({
        ...errors,
        lastNameError: "Last Name must be at least 3 characters",
      });
    } else {
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
    } else if (name.length < 3) {
      setErrors({
        ...errors,
        nameError: "Name must be at least 3 characters",
      });
    } else {
      setErrors({
        ...errors,
        nameError: "",
      });
    }
  };
  const handlePasswordConfirm = () => {
    if (newPassword !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPasswordError: "Password doesn't match",
      });
    } else {
      setErrors({
        ...errors,
        confirmPasswordError: "",
      });
    }
  };

  const handleNewPasswordError = () => {
    if (newPassword.length !== 0 && newPassword.length < 6) {
      setErrors({
        ...errors,
        newPasswordError: "Password should be at least 6 charachters",
      });
    } else {
      setErrors({
        ...errors,
        newPasswordError: "",
      });
    }
  };

  const notifyRequired = () => {
    if (!name || !lastName || !email || !location.label || !phone) {
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
    } else if (errors.nameError) {
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
    } else if (errors.lastNameError) {
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
    } else if (errors.emailError) {
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
    } else if (errors.phoneError) {
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
    } else if (errors.passwordError) {
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
    } else if (errors.newPasswordError) {
      toast.error(errors.newPasswordError, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (errors.confirmPasswordError) {
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
  };

  const handleEdit = async (body) => {
    try {
      if (!body.name || !body.lastName || !body.email || !body.location.label) {
        notifyRequired();
        return;
      }
      else if (Object.keys(errors).length){
        notifyRequired();
      }
      if (newPassword.length) {
        if (newPassword !== confirmPassword) {
          notifyRequired()
        } else {
          if(!errors.nameError && !errors.emailError && !errors.phoneError && !errors.confirmPassword && !errors.newPasswordError && !errors.lastNameError && !errors.passwordError){
            await axios.put(`http://localhost:3001/api/user/update/${user.id}`, {
              name: body.name,
              lastname: body.lastName,
              email: body.email,
              location: body.location.label,
              phone: body.phone,
              password: newPassword,
            });
            notify();
          }
        }
      } else {
        if(!errors.nameError && !errors.emailError && !errors.phoneError && !errors.confirmPassword && !errors.newPasswordError && !errors.lastNameError && !errors.passwordError){
          await axios.put(`http://localhost:3001/api/user/update/${user.id}`, {
            name: body.name,
            lastname: body.lastName,
            email: body.email,
            location: body.location.label,
            phone: body.phone,
          });
          notify();
        }
      }
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

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

  return (
    <div className="profile">
      <SideNav user={user} />
      <div className="profileContainer">
        <div className=" imageLeft">
          <div className="imageCircle">
            <img src={image} alt="" />
          </div>
          <div className="changeImage">
            <p style={{ color: "#00396b", fontWeight: "bold" }}>{user.role}</p>
            <label for="file-upload" class="custom-file-upload">
              <i class="fas fa-cloud-upload-alt"></i> Change Image
              <input
                id="file-upload"
                type="file"
                onChange={(e) => profileUpload(e)}
              />
            </label>
          </div>
        </div>
        <div className="inputSection">
          <div className="inputLine">
            <div className="inputItem">
              <p>
                First Name<span>*</span>
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onBlur={(e) => {
                  handleNameError();
                }}
              />
              {errors.nameError ? (
                <small className="text-danger">{errors.nameError}</small>
              ) : (
                <></>
              )}
            </div>
            <div className="inputItem">
              <p>
                Last Name<span>*</span>
              </p>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                onBlur={(e) => {
                  handleLastNameError();
                }}
              />
              {errors.lastNameError ? (
                <small className="text-danger">{errors.lastNameError}</small>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="inputLine">
            <div className="inputItem">
              <p>
                Email<span>*</span>
              </p>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={(e) => {
                  handleEmailError();
                }}
              />
              {errors.emailError ? (
                <small className="text-danger">{errors.emailError}</small>
              ) : (
                <></>
              )}
            </div>
            <div className="inputItem">
              <p>
                Phone Number<span>*</span>
              </p>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                onBlur={(e) => {
                  handlePhoneError();
                }}
              />
              {errors.phoneError ? (
                <small className="text-danger">{errors.phoneError}</small>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="inputLineLocation">
            <div className="inputItemLocation">
              <div className="missionLine">
                <p>
                  Location<span>*</span>
                </p>
              </div>
              <div style={{ width: "100%" }}>
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={municipalities}
                  styles={{ width: "100%" }}
                  onChange={(e) => {
                    setLocation(e);
                  }}
                  value={location}
                />
              </div>
              {errors.locationError ? (
                <small className="text-danger">{errors.locationError}</small>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="passwordChange">
          <p>Change Password</p>
          <p className="passwordLabel">
            Current Password<span>*</span>
          </p>
          <div className="inputPassword">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onBlur={(e) => {
                checkPass({ email: user.email, password });
              }}
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
          {errors.passwordError ? (
            <small className="text-danger">{errors.passwordError}</small>
          ) : (
            <></>
          )}
          <p className="passwordLabel">
            New Password<span>*</span>
          </p>
          <div className="inputPassword">
            <input
              type={show1 ? "text" : "password"}
              className="form-control"
              id="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              onBlur={(e) => {
                handleNewPasswordError();
              }}
            />

            {show1 ? (
              <FontAwesomeIcon
                className="iconPassword"
                icon={faEye}
                onClick={(e) => setShow1(!show1)}
              />
            ) : (
              <FontAwesomeIcon
                className="iconPassword"
                icon={faEyeSlash}
                onClick={(e) => setShow1(!show1)}
              />
            )}
          </div>
          {errors.newPasswordError ? (
            <small className="text-danger">{errors.newPasswordError}</small>
          ) : (
            <></>
          )}
          <p className="passwordLabel">
            Confirm Password<span>*</span>
          </p>
          <div className="inputPassword">
            <input
              type={show2 ? "text" : "password"}
              className="form-control"
              id="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              onBlur={(e) => {
                handlePasswordConfirm();
              }}
            />

            {show2 ? (
              <FontAwesomeIcon
                className="iconPassword"
                icon={faEye}
                onClick={(e) => setShow2(!show2)}
              />
            ) : (
              <FontAwesomeIcon
                className="iconPassword"
                icon={faEyeSlash}
                onClick={(e) => setShow2(!show2)}
              />
            )}
          </div>
          {errors.confirmPasswordError ? (
            <small className="text-danger">{errors.confirmPasswordError}</small>
          ) : (
            <></>
          )}
        </div>
        <div className="confirm">
          <button
            type="submit"
            className="button-addProject"
            onClick={(e) => {
              e.preventDefault();
              handleEdit({ email, name, lastName, location, phone, image });
            }}
          >
            Edit
          </button>
        </div>
        <ToastContainer
          bodyClassName="toast-container"
          progressClassName="progress-toast"
        />
      </div>
    </div>
  );
};

export default Profile;
