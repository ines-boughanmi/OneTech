import { useLocation,Link, useNavigate } from "react-router-dom";
import "./profile.css";
import React, {useEffect,useState } from "react";
import add from "../../assets/4211763.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  useEffect(()=>{
    getUser()
  },[])
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.get("http://localhost:3001/api/user/getOne", {
        headers: {
          authorization: `Bearer ${token}`,
        }, 
      });
      console.log(data.data);
      setUser(data.data);
      console.log(data.data);
      setUser(data.data);
      setName(data.data.name);
      setLastName(data.data.lastname);
      setEmail(data.data.email);
      setLocation(data.data.location);
      setPhone(data.data.phone);
      setPassword(data.data.password);
      setImage(data.data.image);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleEmailError = () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(regex.test(email));
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
    } else {
      setErrors({
        ...errors,
        emailError: "",
      });
    }
  };
  const handlePhoneError = () => {
    if (!phone.length) {
      setErrors({
        ...errors,
        phoneError: "Phone is required",
      });
    } else {
      setErrors({
        ...errors,
        phoneError: "",
      });
    }
  };

  const handleLocationError = () => {
    if (!location.length) {
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
    } else {
      setErrors({
        ...errors,
        nameError: "",
      });
    }
  };

  const handlePasswordError = () => {
    if (!password.length) {
      setErrors({
        ...errors,
        passwordError: "Password is required",
      });
    } else if (password.length < 6) {
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
  const notify = () => {
    toast.error("Check Info", {
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

  const handleEdit = async (body) => {
    try {
      await axios.post("http://localhost:3001/api/user/update", body);
    } catch (error) {
      console.log(error);
      notify();
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
    <div className="container1">
      <form className="input-group">
        <label className="custum-file-upload" htmlFor="file">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
              {/* SVG code */}
            </svg>
          </div>
          <div className="text">
            <img src={image || add} alt="" className="addImage" />
          </div>
          <input type="file" id="file" onChange={(e) => profileUpload(e)} />
        </label>
        {/* End of custom file upload label */}

        <div className="form-group">
          <label for="name">Name</label>
          <div className="input-section">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="example"
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => handleNameError()}
              value={name}
            />
          </div>
          {errors.nameError ? (
            <small className="text-danger">{errors.nameError}</small>
          ) : (
            <></>
          )}
        </div>

        <div className="form-group">
          <label for="lastname">LastName</label>
          <div className="input-section">
            <input
              type="text"
              className="form-control"
              id="lastname"
              placeholder="example"
              onChange={(e) => setLastName(e.target.value)}
              onBlur={(e) => handleLastNameError()}
              value={lastName}
            />
          </div>
          {errors.lastNameError ? (
            <small className="text-danger">{errors.lastNameError}</small>
          ) : (
            <></>
          )}
        </div>

        <div className="form-group">
          <label for="email">Email</label>
          <div className="input-section">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleEmailError()}
              value={email}
            />
          </div>
          {errors.emailError ? (
            <small className="text-danger">{errors.emailError}</small>
          ) : (
            <></>
          )}
        </div>
        <div className="form-group">
          <label for="location">Location</label>
          <div className="input-section">
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="state,city"
              onChange={(e) => setLocation(e.target.value)}
              onBlur={(e) => handleLocationError()}
              value={location}
            />
          </div>
          {errors.locationError ? (
            <small className="text-danger">{errors.locationError}</small>
          ) : (
            <></>
          )}
        </div>

        <div className="form-group">
          <label for="phone">Phone</label>
          <div className="input-section">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="+216 ********"
              onChange={(e) => setPhone(e.target.value)}
              onBlur={(e) => handlePhoneError()}
              value={phone}
            />
          </div>
          {errors.phoneError ? (
            <small className="text-danger">{errors.phoneError}</small>
          ) : (
            <></>
          )}
        </div>

        <div className="form-group">
          <label for="password">Password</label>
          <div className="input-section">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              id="password"
              onBlur={(e) => {
                handlePasswordError();
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            {show ? (
              <FontAwesomeIcon icon={faEye} onClick={(e) => setShow(!show)} />
            ) : (
              <FontAwesomeIcon
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
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            handleEdit({
              name,
              lastname: lastName,
              email,
              phone,
              location,
              password,
            });
          }}
        >
          Edit
        </button>
        <ToastContainer
          bodyClassName="toast-container"
          progressClassName="progress-toast"
        />
      </form>
    </div>
  );
};

export default Profile;
