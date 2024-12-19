import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Group, Text, Image } from '@mantine/core';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import "./../../css/style.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Header from "./../../components/includes/header";
import { links, data } from './../../components/includes/commons';
import Footer from "./../../components/includes/footer";
import Hero_img from "./../../images/education/education1.svg";
import { exportDataFromRequest } from "./dataHandler";
import swal from "sweetalert";
function NeedEducation() {
  const userId = sessionStorage.getItem('user');
  const [image, setImage] = useState({ preview: '', data: '' })
  const [updateCount, setUpdateCount] = useState(0);
  const Educationscheme = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    stdname: Yup.string()
      .required('Full name is required'),
    stdfathername: Yup.string()
      .required('Father name is required'),
    gender: Yup.string()
      .oneOf(['Male', 'Female', 'Other'], 'Please select your gender')
      .required('Gender is required'),
    stdclass: Yup.string()
      .required('Class is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    Phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must contain only digits')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be at most 15 digits')
      .required('Phone number is required'),
    location: Yup.string()
      .required('Location is required'),
    city: Yup.string()
      .required('Location is required'),
  });
  const handleFileChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  useEffect(() => {

  }, [updateCount])
  return (
    <Container fluid className="root">
      <Header links={links} />
      <Grid className='jobpage-row mt-2'>
        <Group>
          <Grid className="job-row-text">
            <Grid.Col lg={6} md={6} sm={12}>
              <Grid.Col lg={12} md={12} sm={12} >
                <Group className='d-flex justify-content-center mt-3'>
                  <NavLink to="/helpstudent" className="job-btn me-5"><Button radius="xl" className="job-btn">Help Student</Button></NavLink>
                  <NavLink to="/needEducation"><Button radius="xl" className="job-btn">Need Education</Button></NavLink>
                </Group>
              </Grid.Col>
              <Text className="job-banner-text">Need help to continue Education which you can not afford. Get it by providing your information.
              </Text>
            </Grid.Col>
            <Grid.Col lg={6} md={6} sm={12}>
              <Image src={Hero_img} alt="banner image of jobs" className="img img-fluid mt-4" />
            </Grid.Col>
          </Grid>
        </Group>
        
      </Grid>
      <Container className="containerpostajob-area">
        <Grid className="postajob-heading-area">
          <Grid.Col lg={12} md={12} sm={12}>
            <Text className='postajob-heading'>Education Details</Text>
          </Grid.Col>
        </Grid>
        <Grid className="requirements">
          <Grid.Col>
            <Text className="sub-heading">Student Detials</Text>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col lg={12} md={12} sm={12}>
            <div className="container">

              <Formik
                initialValues={{ stdname: '', stdfathername: '', gender: '', stdclass: '', email: '', Phone: '', location: '', foo: '', file: '', city: '', title: '' }}
                validationSchema={Educationscheme}
                onSubmit={async (values, { setSubmitting }) => {
                  await exportDataFromRequest(userId!, image.data, values.title, values.stdname, values.stdfathername, values.gender, values.stdclass, values.email, values.Phone, values.city, values.location, values.foo)
                    .then((response: any) => {
                      swal(response, {
                        icon: "success",
                        buttons: {},
                        timer: 3000,
                      }).then(() => { setUpdateCount(updateCount + 1); })
                    })

                }}
              >
                <Form className='form-center'>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Title:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="title" type="text" className="col-text" placeholder="Type in your Title" />
                      <ErrorMessage name="title" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Full Name:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="stdname" type="text" className="col-text" placeholder="Type in your Full Name" />
                      <ErrorMessage name="stdname" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Father Name:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="stdfathername" type="text" className="col-text" placeholder="Type in your Father Name" />
                      <ErrorMessage name="stdfathername" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Gender:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="gender" component="select" className="col-text">
                        <option value="" disabled>Please Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage name="gender" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Class:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="stdclass" type="text" className="col-text" placeholder="Your Education Status" />
                      <ErrorMessage name="stdclass" className="text-danger fs-1" />
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
                      <Field name="Phone" type="tel" className="col-text" placeholder="Your phone number" />
                      <ErrorMessage name="Phone" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">city:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field type="text" name="city" className="col-text" aria-describedby="city" required />

                      <ErrorMessage name="city" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Location:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="location" type="text" className="col-text" placeholder="Type in your location" />
                      <ErrorMessage name="location" className="text-danger fs-1" />
                    </div>
                  </div>
                  <div className="textarea-container">
                    <Text className="heading">Description</Text>
                    <Field name="foo" as="textarea" rows={10} cols={20} placeholder="description here" />
                    <Field name="file" type="file" className="button" title="Select File Here" onChange={handleFileChange} />
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

export default NeedEducation