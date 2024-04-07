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

const Profile = () => {
  useEffect(() => {
    getUser();
  }, []);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
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
    toast.success("Profile Updated", {
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
      if(password){
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
      }else{
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
        console.log(data.data);
        setName(data.data.name);
        setLastName(data.data.lastname);
        setEmail(data.data.email);
        setLocation(data.data.location);
        setPhone(data.data.phone);
        setImage(data.data.image);
      }
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

  const handleEdit = async (body) => {
    try {
      if (newPassword.length) {
        if (newPassword !== confirmPassword) {
          notifyPassError();
        } else {
          await axios.put(`http://localhost:3001/api/user/update/${user.id}`, {
            ...body,
            password: newPassword,
          });
          notify();
        }
      } else {
        await axios.put(
          `http://localhost:3001/api/user/update/${user.id}`,
          body
        );
        notify();
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
              <i class="fas fa-cloud-upload-alt"></i> Choose File
              <input id="file-upload" type="file"  onChange={(e) => profileUpload(e)}  />
            </label>
          </div>
        </div>
        <div className="inputSection">
          <div className="inputLine">
            <div className="inputItem">
              <p>First Name<span >*</span></p>
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
              <p>Last Name<span >*</span></p>
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
              <p>Email<span >*</span></p>
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
              <p>Phone Number<span >*</span></p>
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
              <p>Location<span >*</span></p>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                onBlur={(e) => {
                  handleLocationError();
                }}
              />
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
          <p className="passwordLabel">Current Password<span >*</span></p>
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
          <p className="passwordLabel">New Password<span >*</span></p>
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
          <p className="passwordLabel">Confirm Password<span >*</span></p>
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
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleEdit({ email, name, lastName, location, phone , image});
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
