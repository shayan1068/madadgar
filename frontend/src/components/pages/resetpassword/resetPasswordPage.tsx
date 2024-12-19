import React, { useState } from 'react'
import Header from "../../includes/header";
import { linkss } from "../../includes/commons";
import Loginside from "./../../../images/user-fun/loginImage.svg";
import Footer from "../../includes/footerLogin";
import { Button, Group, Text } from "@mantine/core";
import "./../../../css/style.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { changepasswordFinalPage } from "./resetPasswordHandler";
import swal from 'sweetalert';
function ResetpasswordPage() {
    const { userName } = useParams();
    const Navigate = useNavigate();
    const [password, setPassword] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [passwordsMatch, setPasswordMatched] = useState<any>(true);
    const handlePasswordChange = (e:any) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordMatched(confirmPassword === value);
      };
    
      const handleConfirmPasswordChange = (e:any) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setPasswordMatched(value === password);
      };
    
      const handleResetPassword = async() => {
        if (password !== confirmPassword) {
          swal('Error', 'Passwords do not match', 'error');
          return;
        }else{
            await changepasswordFinalPage(userName!,password).then((response:any)=>{
                swal("Password has been changed successfully",{
                    icon:"success",
                    buttons:{},
                    timer:3000,
                }).then(()=>Navigate('/signin'));
            })
        }
    }
        return (
            <>
                <Header links={linkss} />
                <div className="container">
                    <div className="row login-side">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-padding">
                            <h3 className="forgetheading">Forget Password</h3>
                            <div className="from-group pt-5">
                                <input type="password" name="password" placeholder="Enter your Password" className="form-control txt" onChange={handlePasswordChange} />
                            </div>
                            <div className="from-group pt-5">
                                <input type="password" name="conform password" placeholder="Enter Conform your entered password" className="form-control txt" onChange={handleConfirmPasswordChange} />
                            </div>
                            {!passwordsMatch && (
                                <Text color="red" size="sm" style={{ marginTop: '0.5rem' }}>
                                    Passwords do not match
                                </Text>
                            )}
                            <div className="form-group pt-5 pb-4">
                                <Group className="forget-side">
                                    <button className="btn btn-style" onClick={handleResetPassword}>Conform Reset</button>
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

    export default ResetpasswordPage