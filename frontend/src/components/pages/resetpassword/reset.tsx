import React, { useState } from 'react'
import Header from "../../includes/header";
import { linkss } from "../../includes/commons";
import Loginside from "./../../../images/user-fun/loginImage.svg";
import Footer from "../../includes/footerLogin";
import {Button, Group, Text} from "@mantine/core";
import "./../../../css/style.css";
import { Link, useNavigate } from 'react-router-dom';
import {getCheckTheUserName} from "./resetPasswordHandler";
import swal from 'sweetalert';
function Resetpassword() {
    const [getuserName,setUserName]=useState<any>();
    const navigate = useNavigate();
    const getUserName = async(userName:string)=>{
        console.log(userName);
        await getCheckTheUserName(userName).then((response:any)=>{
            if(response.status == "success"){
                swal("found", {
                    icon: "success",
                    buttons: {},
                    timer: 3000,
                }).then(()=>navigate(`/birthdayCheck/${userName}`));
            }else{
                 swal(response.message, {
                    icon: "error",
                    buttons: {},
                    timer: 3000,
                });
            }
           
        })
        .catch(function (error: any) {
            swal(error.message, {
                icon: "error",
                buttons: {},
                timer: 3000,
            });
    });
    }
    return (
        <>
            <Header links={linkss} />
            <div className="container">

               
                    <div className="row login-side">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-padding">
                            <h3 className="forgetheading">Forget Password</h3>
                            <Text>Please enter your username to reset password</Text>
                            <div className="from-group pt-5">
                                <input type="text" name="username" placeholder="Enter your username" className="form-control txt"  onChange={e=>setUserName(e.target.value)}/>
                            </div>
                            <div className="form-group pt-5 pb-4">
                                <Group className="forget-side">
                                    <Link to="/signin"><button className='btn btn-style'>BACK TO LOGIN</button></Link>
                                    <button className="btn btn-style" onClick={e=>getUserName(getuserName)}>RESET PASSWORD</button>
                                </Group>
                            </div>
                           
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 login-right">
                            <p className="text-welcome">Welcome to our Helper Community</p>
                            <p>Your helping journey starts here</p>
                            <img src={Loginside} alt="login side image" className="img img-fluid w-75 mb-3" />
                        </div>
                    </div>
              

            </div>

            <Footer />
        </>
    )
}

export default Resetpassword