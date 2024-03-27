import { Link } from "react-router-dom";
import oneTech from "../../assets/onetechb.png";
import "./register.css";
import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [name,setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [location,setLocation] = useState("")
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [error,setError] = useState(false)





    const handleRegister = async (body)=>{
        try {
            if(body.password !== body.confirmPassword){
                setError(true)
            }else{
                await axios.post("http://localhost:3001/api/user/register",body)
            }
            
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
      <h2>Register</h2>
      </div>
      <div className="line"></div>
      <form className="input-group">
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="example"
            onChange={(e)=> setName(e.target.value)}
            value={name}/>
        </div>

        <div className="form-group">
          <label for="lastname">LastName</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="example"            
            onChange={(e)=> setLastName(e.target.value)}
            value={lastName}
          />
        </div>

        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label for="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="state,city"
            onChange={(e)=> setLocation(e.target.value)}
            value={location}
          />
        </div>

        <div className="form-group">
          <label for="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="+216 ********"
            onChange={(e)=> setPhone(e.target.value)}
            value={phone}
          />
        </div>

        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" 
          
          onChange={(e)=> setPassword(e.target.value)}
          value={password}/>
        </div>

        <div className="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" 
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    value={confirmPassword}/>
        {
            error ? <small className="text-danger" >*Password doesn't match</small> : <></>
        }
        </div>

        <button type="submit" className="btn btn-primary" onClick={(e)=>{
            e.preventDefault()
            handleRegister({
                name,lastname:lastName,email,phone,location,password,confirmPassword
            })
        }}>
          Register
        </button>


        <div className="account-link">
        <p>
          you have an account? try logging in
          <Link to="/login">
            <p className="register-link"> here</p>
          </Link>
        </p>
        </div>
        
      </form>
    </div>
  );
}

export default Register;
