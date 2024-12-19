import { Container, Grid, Group, Text, Image, Button, Card, Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Header from "./../../components/includes/header";
import Footer from "./../../components/includes/footer";
import Hero_img from "./../../images/health/find_hero_image.svg";
import { links, data } from './../../components/includes/commons';
import "./../../css/style.css";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import { Field, Formik, Form } from 'formik';
function Findamedicalreport() {
    const newUserId = sessionStorage.getItem('user');
    const [getData, setData] = useState<any>();
    const [toggle, setToggle] = useState({ index: -1, toggle: false });
    const [open, setOpen] = useState({ medID: "", userId: "", status: false });
    const fetchMedicalReports = async () => {
        const response = await fetch(`https://madadgar.onrender.com/api/medical/fetchAll/${newUserId}`);
        const data = await response.json();
        setData(data);
    }
    useEffect(() => {
        fetchMedicalReports();
    }, [])
    if (getData && getData.userId != newUserId) {
        var details = getData?.map((medData: any, index: any) => (
            <Grid className="card-paddfoj" key={index}>
                <Card shadow="sm" className="card-view mt-4 w-100">
                    <Grid>
                        <Grid.Col lg={6} md={12} sm={12}>
                            <h3 className="heading">{medData.title}</h3>
                            <Text className="card-text">{medData.description}</Text>
                        </Grid.Col>
                        <Grid.Col lg={6} md={12} sm={12}><Image src={medData.image[0].url} alt="medical report picture" className="img img-fluid w-100" /></Grid.Col>
                        <Grid.Col lg={12} md={12} sm={12}>
                            <Button className='card-btn' onClick={() => {
                                if (toggle.index == index) {
                                    setToggle({ index: index, toggle: !toggle.toggle })
                                }
                                else {
                                    setToggle({ index: index, toggle: true })
                                }
                            }}>Click To View Details</Button>
                        </Grid.Col>
                    </Grid>
                </Card>
                <Grid.Col lg={12} md={12} sm={12}>
                    {toggle.index == index && toggle.toggle && (
                        <Card shadow="sm" className="toggle-card-bg">
                            <Grid>
                                <Grid.Col lg={12} md={12} sm={12} className="requirements">
                                    <Text className="sub-heading">Medical Report</Text>
                                </Grid.Col>
                            </Grid>
                            <Container fluid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Patient Name:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{medData.patientName}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Patient Age:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{medData.patientAge}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Date When Diagnose:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {medData.dateWhenDiagnose}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Gender:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {medData.gender}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Medical Condition:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {medData.medicalCondition}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Need of operation:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {medData.needOfOperation}</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid className="requirements">
                                    <Grid.Col>
                                        <Text className="sub-headingfoj">Contact Us At</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Email-Address:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{medData.email}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Phone Number:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {medData.phone}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Location:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {medData.location}</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Group className="foj-footer">
                                            <Text className="foj-footer-text">If you would like to help click on Request of Medical Help Button</Text>
                                            <Button className="foj-footer-btn" onClick={() => setOpen({ medID: medData._id.toString(), userId: medData.userId._id.toString(), status: true })}>Request of Medical Help</Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Container>

                        </Card>
                    )}
                </Grid.Col>
            </Grid>
        ))
    }
    return (
        <Container fluid className='root'>
            <Header links={links} />
            <Grid className='jobpage-row mt-2'>
                <Group>
                    <Grid className="job-row-text">
                        <Grid.Col lg={6} md={6} sm={12}>
                            <Image src={Hero_img} alt="banner image of jobs" className="img img-fluid w-75" />
                        </Grid.Col>
                        <Grid.Col lg={6} md={6} sm={12}>
                            <Grid.Col lg={12} md={12} sm={12} >
                                <Group className='d-flex justify-content-center mt-3'>
                                    <NavLink to="/medicalReport" className="job-btn me-5"><Button radius="xl" className="job-btn">Medical Report</Button></NavLink>
                                    <NavLink to="/findmedicalreport"><Button radius="xl" className="job-btn">Find Report</Button></NavLink>
                                </Group>
                            </Grid.Col>
                            <Text className="job-banner-text">Find what you are looking for and choose what you desire
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Group>
                <Grid>
                </Grid>
            </Grid>
            {getData && getData.length > 0 ? <>{details}</> : <>
            <Grid className="card-paddfoj">
                    <Card shadow="sm" className="card-view mt-4 mx-auto">
                        <Grid>
                            <Grid.Col lg={12} md={12} sm={12}>
                                <h3 className="heading">NO MEDICAL REPORT POSTED YET</h3>
                            </Grid.Col>
                        </Grid>
                        </Card>
                </Grid>
            </>}
            <Footer data={data} />
            <Modal size="55%" radius="xl"
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={open.status}
                onClose={() => setOpen({ medID: '', userId: '', status: false })}
            >
                <Grid>
                    <Formik
                        initialValues={{ medID: '', userId: '', reqUserID: '', name: '', gender: '', phonenumber: '', email: '' }}
                        onSubmit={(values) => {
                            var data = JSON.stringify({
                                "userId": open.userId,
                                "medID": open.medID,
                                "reqUserID": newUserId,
                                "name": values.name,
                                "gender": values.gender,
                                "phone": values.phonenumber,
                                "email": values.email
                            });
                            var config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: 'https://madadgar.onrender.com/api/medicalRequest/upload',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data
                            };
                            axios(config)
                                .then(function (response) {
                                    swal({
                                        title: "Thank You",
                                        text: "Your request has been submitted successfully",
                                        icon: "success",
                                        buttons: {},
                                        timer: 3000,
                                    }).then(() => setOpen({ medID: '', userId: '', status: false }))
                                })
                                .catch(function (error) {
                                    swal("Request Already Submitted",{
                                        icon: "error",
                                        buttons: {},
                                        timer: 3000,
                                      }).then(() => setOpen({ medID: '', userId: '', status: false }))
                                });
                        }}
                    >
                      
                            <Form>
                                <Grid className="padd-modal">
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <h5>Your Details</h5>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Name:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="text" name="name" className="col-text" placeholder="type in your Full Name" />
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Gender:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="text" name="gender" className="col-text" placeholder="type in your gender" />
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Phone Number:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="tel" name="phonenumber" className="col-text" placeholder="Enter your phone number" />
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your E-mail:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="email" name="email" className="col-text" placeholder="Enter your e-mail address" />
                                    </Grid.Col>
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Button type="submit" className="send-btn">Send</Button>
                                    </Grid.Col>
                                </Grid>
                            </Form>
                    </Formik>
                </Grid>
            </Modal>
        </Container>

    )
}

export default Findamedicalreport