import React, { useState } from 'react'
import Header from "../../includes/header";
import { linkss } from "../../includes/commons";
import Loginside from "./../../../images/user-fun/loginImage.svg";
import Footer from "../../includes/footerLogin";
import { Button, Group, Text } from "@mantine/core";
import "./../../../css/style.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import {checkTheBirthdayOfUser} from "./resetPasswordHandler";
import swal from 'sweetalert';
function ValidBirthdate() {
    const navigate = useNavigate();
    const { userName } = useParams();
    const [getDay,setDay]=useState<any>();
    const [getMonth,setMonth]=useState<any>();
    const [getYear,setYear]=useState<any>();
    const getTheDetail = async(userName:string,day:string,month:string,year:string)=>{
        await checkTheBirthdayOfUser(userName,day,month,year).then((response:any)=>{
            if(response.status ==="error"){
                swal(response.message,{
                    icon:"error",
                    buttons:{},
                    timer:3000,
                })
            }else{
                swal(response.status,{
                    icon:"success",
                    buttons:{},
                    timer:3000,
                }).then(()=>navigate(`/resetPasswordPage/${userName}`));
            }
        })
    }
    return (
        <>
            <Header links={linkss} />
            <div className="container">
                <div className="row login-side">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-padding">
                        <h3 className="forgetheading">Forget Password</h3>
                        <Text>hy {userName}! You need to enter you birthday to get your new password.</Text>
                        <div className="from-group pt-4">
                            <div className="row">
                                <div className="col-lg-4">
                                    <input type="text" name="dd" className="form-control txt" placeholder="dd" required onChange={e=>setDay(e.target.value)}/>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" name="mm" className="form-control txt" placeholder="mm" required onChange={e=>setMonth(e.target.value)}/>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" name="yy" className="form-control txt" placeholder="yy" required onChange={e=>setYear(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group pt-5 pb-4">
                            <Group className="forget-side">
                                <Link to="/signin"><button className='btn btn-style'>BACK TO LOGIN</button></Link>
                                <button className="btn btn-style" onClick={e=>getTheDetail(userName!,getDay,getMonth,getYear)}>RESET PASSWORD</button>
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

export default ValidBirthdate