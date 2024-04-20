import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import oneTech from "../../assets/onetechb.png";
import "./login.css";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginPic from "../../assets/Login.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const notify = () => {
    toast.success("Welcome", {
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

  const notifyError = () => {
    toast.error("Email or Password are Wrong", {
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

  const notifyValidity = () => {
    toast.error("Your Account is Still Not Valid", {
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

  const handleLogin = async (body) => {
    try {
      const user = await axios.post(
        "http://localhost:3001/api/user/getByEmail",
        body
      );
      if (user.data.validity) {
        const data = await axios.post(
          "http://localhost:3001/api/user/login",
          body
        );
        localStorage.setItem("token", data.data.token);
        notify();
        setTimeout(() => {
          navigate("/dash");
        }, 800);
      } else {
        notifyValidity();
      }
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  return (
    <div className="loginContainer">
    <div className="contain">
      <Link to="/">
        <div className="pos">
          <img className="image" src={oneTech} alt="OneTech" />
        </div>
      </Link>
      <div className="title">
        <h2>Login</h2>
      </div>
      <div className="line"></div>
      <form className="input-group">
        <div className="form-group">
          <label for="email">Email</label>
          <div className="input-section">
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>

        <div className="form-group">
          <label for="password">Password</label>
          <div className="input-section">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
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
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            handleLogin({
              email,
              password,
            });
          }}
        >
          Login
        </button>
        <ToastContainer
          bodyClassName="toast-container"
          progressClassName="progress-toast"
        />
        <div className="account-link">
          <p>you don't have an account? sign up</p>
          <Link to="/register">
            <p className="register-link">here</p>
          </Link>
        </div>
      </form>
    </div>
    <div className="loginPic">
      <img src={loginPic} alt="" />

    </div>
    </div>
  );
}

export default Login;
