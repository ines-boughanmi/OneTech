import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye , faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import oneTech from "../../assets/onetechb.png";
import "./login.css";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show,setShow] = useState(true);



  const handleLogin = async (body)=>{
    try {
      const data = await axios.post("http://localhost:3001/api/user/login",body)
      localStorage.setItem("token",data.data.token)
    } catch (error) {
      console.log(error)
      
    }
  } 





  return (
    <div className="contain">
      <Link to="/home">
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
          <input type="email" className="form-control" id="email" 
              onChange={(e)=> setEmail(e.target.value)}
              value={email}/>
        </div>

        <div className="form-group">
          <label for="password">Password</label>
          <input type={show ? "text" : "password"} className="form-control" id="password"     
          onChange={(e)=> setPassword(e.target.value)}
          value={password}/>

          {
            show ? <FontAwesomeIcon icon={faEye} onClick={(e)=>setShow(!show)} /> : <FontAwesomeIcon icon={faEyeSlash} onClick={(e)=>setShow(!show)} /> 
          }
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e)=>{
            e.preventDefault()
            handleLogin({
               email,password
            })
        }}>
          Login
        </button>
        <div className="account-link">
          <p>you don't have an account? sign up</p>
          <Link to="/register">
            <p className="register-link">here</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
