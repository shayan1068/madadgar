import React, { useState } from 'react'
import { Button, Container, Grid, Group, Text } from '@mantine/core';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import "./../../css/style.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Header from "./../../components/includes/header";
import { links, data } from './../../components/includes/commons';
import Footer from "./../../components/includes/footer";
import FormData from 'form-data';
import axios from "axios";
import swal from "sweetalert";

function MedicalReport() {
  const userId = sessionStorage.getItem('user');
  const [image, setImage] = useState({ preview: '', data: '' })
  const handleFileChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  const medicalreportscheme = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });
  return (
    <Container fluid className="root">
      <Header links={links} />
      <Grid className="jobapost-col">
        <Grid.Col lg={12} md={12} sm={12} >
          <Group className="jobapost-groupbtn">
            <NavLink to="/medicalReport"><Button radius="xl" className="job-btn">Medical Report</Button></NavLink>
            <NavLink to="/findmedicalreport"><Button radius="xl" className="job-btn">Find Report</Button></NavLink>
          </Group>
        </Grid.Col>
      </Grid>
      <Container className="containerpostajob-area">
        <Grid className="postajob-heading-area">
          <Grid.Col lg={12} md={12} sm={12}>
            <Text className='postajob-heading'>Medical Report</Text>
          </Grid.Col>
        </Grid>
        <Grid className="requirements">
          <Grid.Col>
            <Text className="sub-heading">Requirements</Text>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col lg={12} md={12} sm={12}>
            <div className="container">

              <Formik
                initialValues={{ userId: userId, title: '', patname: '', patage: '', dateofdiagnose: '', gender: 'option1', patmedcondition: '', needOfOperation: 'option1', email: '', phone: '', location: '', city: '', description: '', image: null }}
                // validationSchema={medicalreportscheme}
                onSubmit={async (values, { setSubmitting }) => {
                  var data = new FormData();
                  data.append('userId', values.userId);
                  data.append('title', values.title);
                  data.append('patientName', values.patname);
                  data.append('patientAge', values.patage);
                  data.append('dateWhenDiagnose', values.dateofdiagnose);
                  data.append('gender', values.gender);
                  data.append('medicalCondition', values.patmedcondition)
                  data.append('needOfOperation', values.needOfOperation);
                  data.append('email', values.email);
                  data.append('phone', values.phone);
                  data.append('location', values.location);
                  data.append('city', values.city);
                  data.append('description', values.description);
                  data.append('image', image.data);
                  var config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `https://madadgar.onrender.com/api/medical/upload/${userId}`,
                    headers: {
                    },
                    data: data
                  };

                  axios(config)
                    .then(function (response) {
                      swal({
                        title: "Thank You",
                        text: "This Job has been Posted Successfully" + response.data,
                        icon: "success",
                        timer: 3000,
                      }).then((refresh) => { window.location.reload() })
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}

              >

                <Form className='form-center'>

                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Title:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="title" type="text" className="col-text" placeholder="title" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Patient Name:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="patname" type="text" className="col-text" placeholder="Type in Patient Name" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Patient Age:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="patage" type="text" className="col-text" placeholder="eg 36" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Date when diagnosed:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="dateofdiagnose" type="text" className="col-text" placeholder="Date when patient was diagnosed" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Gender:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="gender" component="select" className="col-text" as="select">
                        <option value="option1" disabled>Please Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Medical Condition:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="patmedcondition" type="text" className="col-text" placeholder="Type in patient medical condition" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Need of Operation:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="needOfOperation" component="select" className="col-text" required as="select">
                        <option value="option1" disabled>Please Select Yes or No</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Field>

                    </div>
                  </div>
                  <Grid className="requirements">
                    <Grid.Col>
                      <Text className="sub-heading2">Contact Us At</Text>
                    </Grid.Col>
                  </Grid>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Email:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="email" type="email" className="col-text" placeholder="Enter email Address" />
                      <ErrorMessage name="email" className='text-danger fs-1' />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Phone Number:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="phone" type="tel" className="col-text" placeholder="Your phone number" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Location:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="location" type="text" className="col-text" placeholder="Type in your location" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">city:</span>
                    </div>
                    <div className="col-lg-6">
                    <Field type="text" name="city" className="col-text" aria-describedby="city" required/>
                    
                      <ErrorMessage name="city" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="textarea-container">
                    <Text className="heading">Description</Text>
                    <Field name="description" as="textarea" rows={10} cols={20} placeholder="description here" />
                    <Field name="image" type="file" className="button" placeholder="Your phone number" onChange={handleFileChange} />
                  </div>
                  <div className="div col-lg-12 col-md-12 col-sm-12 col-postajobbtn">
                    <Button type="submit" className="post-btn">Post</Button>
                  </div>
                </Form>

              </Formik>

            </div>
          </Grid.Col>
        </Grid>

      </Container>
      <Footer data={data} />
    </Container>
  )
}

export default MedicalReport