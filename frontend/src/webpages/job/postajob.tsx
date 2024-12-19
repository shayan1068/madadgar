import { Button, Container, Grid, Group, Text } from '@mantine/core';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import "./../../css/style.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Header from "./../../components/includes/header";
import { links, data } from './../../components/includes/commons';
import Footer from "./../../components/includes/footer";
import FormData from "form-data"
import axios from "axios";
import {useState } from 'react';
import swal from "sweetalert";


function Postajob() {
  // const [takeFile, setFile] = useState(null);
  // useEffect(() => {
  //   console.log("File has been set.")
  // },[takeFile]);
  const [image, setImage] = useState({ preview: '', data: '' })
  const handleFileChange = (e:any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  const postajobSchema = Yup.object().shape({
    to: Yup.string()
      .required("please select age"),
    from: Yup.string()
      .required("please select age from"),
    experience: Yup.string()
      .required("please select experience"),
    qualification: Yup.string()
      .required("please select qualification"),
    gender: Yup.string()
      .required("Please select gender"),
    cv: Yup.string()
      .required("please select option"),
    worktype: Yup.string()
      .required("Please enter work type"),
    requiredfor: Yup.string()
      .required("Please fill it"),
    location: Yup.string().required("please enter you location"),
    city: Yup.string().required("Please select city"),
    timereq: Yup.string().required("Please fill time required"),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    phone: Yup.string().required("Please enter your phone number"),
    foo: Yup.string().required("Please fill description"),
    file: Yup.string().required("Please enter you work space picture"),
  });
  // getting userId here
  const userid = sessionStorage.getItem('user');
  return (
    <Container fluid className="root">
      <Header links={links} />
      <Grid className="jobapost-col">
        <Grid.Col lg={12} md={12} sm={12} >
          <Group className="jobapost-groupbtn">
            <NavLink to="/poj"><Button radius="xl" className="job-btn">Post a Job</Button></NavLink>
            <NavLink to="/foj"><Button radius="xl" className="job-btn">Find a Job</Button></NavLink>
          </Group>
        </Grid.Col>
      </Grid>
      <Container className="containerpostajob-area">
        <Grid className="postajob-heading-area">
          <Grid.Col lg={12} md={12} sm={12}>
            <Text className='postajob-heading'>Post A Job</Text>
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

                initialValues={{ userID: userid,title: '', from: '', to: '', qualification: '', experience: '', gender: 'option1', cv: 'option1', worktype: '', requiredfor: '', city: '', location: '', timereq: '', email: '', phone: '', foo: '', takeFile: null,skills:'' }}
                onSubmit={async (values) => {
                  
                  var data = new FormData();
                  data.append('userId',values.userID);
                  data.append('image',image.data);
                  data.append('requiredAgeFrom', values.from);
                  data.append('requiredAgeTo', values.to);
                  data.append('requiredQualition', values.qualification);
                  data.append('requiredExperience', values.experience);
                  data.append('gender', values.gender)
                  data.append('Cv', values.cv);
                  data.append('workType', values.worktype);
                  data.append('requiredFor', values.requiredfor);
                  data.append('location', values.location);
                  data.append('city',values.city);
                  data.append('timeNeeded', values.timereq);
                  data.append('email', values.email);
                  data.append('phone', values.phone);
                  data.append('description', values.foo);
                  data.append('skills', values.skills);
                  data.append('title', values.title);
                  var config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `https://madadgar.onrender.com/api/job/upload/${userid}`,
                    data : data
                  };
                  await axios(config)
                  .then(response => {
                    swal({
                      title: "Thank You",
                      text: "This Job has been Posted Successfully"+response.data, 
                      icon: "success",
                      timer:3000,
                    })
                  })
                  .catch(error => {
                    alert("error:"+error.response.data.toString());
                  });
                }}
              >{({  setFieldValue })=>(
                <Form className='form-center'>
                <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Title:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="title" type="text" className="col-text" placeholder="What is the title of Job" required/>
                    </div>
                  </div>
                  <div className="form-group row form-set">
                    <div className="col-lg-6">
                      <div className="fw-bold ">Required Age:</div>
                    </div>
                    <div className="col-lg-6">
                      <Field type="text" name="from" className="col-age" aria-describedby="age" required />
                      <span className="fw-bold">TO</span>
                      <Field type="text" name="to" className="col-age" aria-describedby="age" required/>
                      <small id="age" className=" d-block form-text text-muted"> eg 20 to 30.</small>
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Required Qualification:</span>
                    </div>
                    <div className="col-lg-6">
                    <Field type="text" name="qualification" className="col-text" aria-describedby="qualification" placeholder="Required Qualification" required/>
                      
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Required Experience:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="experience" type="text" className="col-text" placeholder="How many experience?" required/>
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Skills:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="skills" type="text" className="col-text" placeholder="what type of skill required" />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Gender:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="gender" component="select" className="col-text" required  as="select">
                        <option value="option1" disabled>Please Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Cv Required:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="cv" component="select" className="col-text" required as="select">
                        <option value="option1" disabled>Is CV Required</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Field>
                    </div>
                  </div>
                  <Grid className="requirements">
                    <Grid.Col>
                      <Text className="sub-heading2">About this Job</Text>
                    </Grid.Col>
                  </Grid>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Work type:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="worktype" type="text" className="col-text" placeholder="What kind of work is it?" required/>
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Required for:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="requiredfor" type="text" className="col-text" placeholder="type in what person will do?" required/>
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
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Location:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="location" type="text" className="col-text" placeholder="job location place" required/>
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Time Needed:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="timereq" type="text" className="col-text" placeholder="How many hours work" required/>
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
                      <Field name="email" type="email" className="col-text" placeholder="Enter email Address" required/>
                      <ErrorMessage name="email" className='text-danger fs-1' />
                    </div>
                  </div>
                  <div className="row form-set">
                    <div className="col-lg-6">
                      <span className="fw-bold">Phone Number:</span>
                    </div>
                    <div className="col-lg-6">
                      <Field name="phone" type="tel" className="col-text" placeholder="Your phone number" required/>
                    </div>
                  </div>
                  <div className="textarea-container">
                    <Text className="heading">Description</Text>
                    <Field name="foo" as="textarea" rows={10} cols={20} placeholder="description here"/>
                    <Field name="image" type="file" className="button"  onChange={handleFileChange} />
                  </div>
                  <div className="div col-lg-12 col-md-12 col-sm-12 col-postajobbtn">
                    <Button type="submit" className="post-btn" >Post</Button>
                  </div>
                </Form>)}
              </Formik>

            </div>
          </Grid.Col>
        </Grid>

      </Container>
      <Footer data={data} />
    </Container>
  )
}

export default Postajob