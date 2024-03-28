import { Link, useNavigate } from "react-router-dom";
import oneTech from "../../assets/onetechb.png";
import "./register.css";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();

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
    if (!confirmPassword.length) {
      setErrors({
        ...errors,
        confirmPasswordError: "Confirm Password is required",
      });
    } else if (password !== confirmPassword) {
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
  
}

  const handleRegister = async (body) => {
    try {
      await axios.post("http://localhost:3001/api/user/register", body);
      navigate("/login");
    } catch (error) {
      console.log(error);
      notify()
    }
  };

  return (
    <div className="contain">
      <Link to="/home">
        <div className="pos">
          <img className="image" src={oneTech} alt="OneTech" />
        </div>
      </Link>
      <div className="title">
        <h2>Register</h2>
      </div>
      <div className="line"></div>
      <form className="input-group">
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

        <div className="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div className="input-section">
            <input
              type={show2 ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => handlePasswordConfirm()}
              value={confirmPassword}
            />

            {show2 ? (
              <FontAwesomeIcon icon={faEye} onClick={(e) => setShow2(!show2)} />
            ) : (
              <FontAwesomeIcon
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

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            handleRegister({
              name,
              lastname: lastName,
              email,
              phone,
              location,
              password,
              confirmPassword,
            });
          }}
        >
          Register
        </button>
        <ToastContainer  bodyClassName="toast-container" progressClassName="progress-toast" />
        <div className="account-link">
          <p>you have an account? try logging in</p>
          <Link to="/login">
            <p className="register-link"> here</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
