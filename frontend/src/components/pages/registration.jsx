import React, { useState } from 'react';
import { Text, Grid } from '@mantine/core';
import "./../../css/style.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Header from "./../includes/header";
import { linkss } from "./../includes/commons";
import Loginside from "./../../images/user-fun/loginImage.svg";
import Footer from "./../includes/footerLogin";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import * as Yup from "yup";
import FormData from 'form-data';
import swal from 'sweetalert';
function registration() {
  const RegistrationSchema = Yup.object().shape({
    fname: Yup.string()
      .required("full Name required"),
    name: Yup.string()
      .required("required"),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    dd: Yup.string()
      .required('Please enter your birth date'),
    mm: Yup.string()
      .required('Please enter your birth month'),
    yy: Yup.string()
      .required('Please enter your birth year'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  return (
    <>
      <Header links={linkss} />
      <div className="container">
        <Formik
          initialValues={{ fname: '', name: '', email: '', password: '', confirmPassword: '',dd:'',mm:'',yy:'' }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            var data = new FormData();
            data.append('fullName', values.fname);
            data.append('userName', values.name);
            data.append('email', values.email);
            data.append('password', values.password);
            data.append('day', values.dd);
            data.append('month', values.mm);
            data.append('year', values.yy);
            var config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://madadgar.onrender.com/api/auth/signup',
              data: data
            };
            await axios(config)
              .then(response => {
                if (response.data.status === "success") {
                  swal(response.data.message, {
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                  }).then(()=>{
                    window.location.href="/signin";
                  })
                } 
                setSubmitting(false);
              })
              .catch(error => {
                console.log(error);
                swal({
                  title: "Error",
                  text: error.response.data.error,
                  icon: "error",
                  buttons: false,
                  dangerMode: true,
                  timer: 3000,
                });
                setSubmitting(false);
              });
          }}
          
        >{({ isSubmitting }) => (
          <Form>
            <div className="row registration-side">
              <div className="col-lg-6 col-md-12 col-sm-12 col-padding">
                <div className="from-group pt-4">
                  <Field type="text" name="fname" placeholder="Full Name" className="form-control txt" />
                  <ErrorMessage name="fname" />
                </div>
                <div className="from-group pt-4">
                  <Field type="text" name="name" placeholder="User Name" className="form-control txt" />
                  <ErrorMessage name="name" />
                </div>
                <div className="from-group pt-4">
                  <Field type="email" name="email" placeholder="Email" className="form-control txt" />
                </div>
                <div className="from-group pt-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <Field type="text" name="dd"  className="form-control txt" placeholder="dd" />
                      <ErrorMessage name="dd" />
                    </div>
                    <div className="col-lg-4">
                      <Field type="text" name="mm"  className="form-control txt" placeholder="mm" />
                      <ErrorMessage name="mm" />
                    </div>
                    <div className="col-lg-4">
                      <Field type="text" name="yy"  className="form-control txt" placeholder="yy" />
                      <ErrorMessage name="yy" />
                    </div>
                  </div>
                </div>
                <div className="from-group pt-4">
                  <Field type="password" name="password" placeholder="Password" className="form-control txt" />
                  <ErrorMessage name="password" />
                </div>
                <div className="from-group pt-4">
                  <Field type="password" name="confirmPassword" placeholder="Conform Password" className="form-control txt" />
                  <ErrorMessage name="confirmPassword" />
                </div>
                <div className="form-group pt-5 ">
                  <button type="submit" className="btn  w-100 btn-style" disabled={isSubmitting}>Registration</button>
                </div>

              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 registration-right">
                <p className="text-heading">Register to help or be helped</p>
                <p>Register to get started</p>
                <img src={Loginside} alt="login side image" className="img img-fluid w-75 mb-3" />
              </div>
            </div>
          </Form>

        )

          }
        </Formik>
      </div>

      <Footer />
    </>
  )
}

export default registration