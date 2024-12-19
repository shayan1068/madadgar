import React, { useState } from 'react';
import {Text,Group} from '@mantine/core';
import "./../../css/style.css";
import Header from "./../includes/header";
import {linkss} from "./../includes/commons";
import Loginside from "./../../images/user-fun/loginImage.svg";
import Footer from "./../includes/footerLogin";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
function Login() {
  async function loginUser(Credential){
      return fetch("https://madadgar.onrender.com/api/auth/signin",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Credential)
      }).then(data=>data.json())
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userName,setuserName] = useState();
  const [password,setPassword] = useState();
  const handleSubmit = async e =>{
    e.preventDefault();
    const response = await loginUser({
      userName,
      password
    });
    if('token' in response){
      swal({
        title: "Success",
        text: "Login Succefully", 
        icon: "success",
        buttons: false,
        timer:3000,
      }).then((value)=>{
        sessionStorage.setItem('token',response['token']);
        sessionStorage.setItem('user',response['user']);
        sessionStorage.setItem('userName',response['userName']);
        window.location.href="/";
      })
    }else{
      swal({
        title: "Error",
        text: response.message, 
        icon: "error",
        buttons: false,
        dangerMode: true,
        timer:3000,
      });
    }
  };
  return (
  <>
  <Header links={linkss} />
  <div className="container">
  
      <form onSubmit={handleSubmit}>
        <div className="row login-side">
          <div className="col-lg-6 col-md-12 col-sm-12 col-padding">
            <div className="from-group pt-4">
             <input type="text" name="userName" placeholder="Enter your e-mail address or username" className="form-control txt" onChange={e => setuserName(e.target.value)}/>
            </div>
            <div className="from-group pt-5">
              <input type="password" name="password" placeholder="Password" className="form-control txt" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="form-group pt-5 pb-4">
              <Group className="forget-side">
                <input type="checkbox" name="checked" value="One" className="form-check-input"/> Keep me login
                <Text className="forget-pasword"><Link to="/resetPassword">Forget Password</Link></Text>
              </Group>
            </div>
            <button type="submit" className="btn  w-100 btn-style">Sign in</button>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 login-right">
            <p className="text-welcome">Welcome to our Helper Community</p>
            <p>Your helping journey starts here</p>
            <img src={Loginside} alt="login side image" className="img img-fluid w-75 mb-3"/>
          </div>
        </div>
      </form>
      
  </div>
  
     <Footer />
  </>
  )
}

export default Login