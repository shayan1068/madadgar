import { Container, Grid, Group, Text, Image, Button, Card, Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Header from "./../../components/includes/header";
import Footer from "./../../components/includes/footer";
import Hero_img from "./../../images/education/education2.svg";
import { links, data } from './../../components/includes/commons';
import "./../../css/style.css";
import { NavLink } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { fetchTheTotalEducationCollectionPost, getRequestForEducationHelp } from "./dataHandler";
import swal from "sweetalert";
import * as Yup from "yup";
function Helpstudent() {

    const userId = sessionStorage.getItem('user');
    const [toggle, setToggle] = useState({ index: -1, toggle: false });
    const [open, setOpen] = useState({ edId: "", userId: "", status: false });
    const [getData, setData] = useState<any>();
    const [updateCount, setUpdateCount] = useState(0);
    const EducationRequestscheme = Yup.object().shape({
        name: Yup.string()
            .required('Full name is required'),
        gender: Yup.string()
            .required('Gender is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        Phone: Yup.string()
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 digits')
            .max(15, 'Phone number must be at most 15 digits')
            .required('Phone number is required'),
    });
    const getfetchDataFromCollection = async () => {
        await fetchTheTotalEducationCollectionPost(userId!).then((response: any) => {
            setData(response);
        })
    }
    useEffect(() => {
        getfetchDataFromCollection();
    }, [updateCount])
    if (getData && getData.userId != userId) {
        var Details = getData?.map((getInfo: any, index: any) => (
            <Grid className="card-paddfoj" key={index}>
                <Card shadow="sm" className="card-view mt-4">
                    <Grid>
                        <Grid.Col lg={6} md={12} sm={12}>
                            <h3 className="heading">{getInfo.title}</h3>
                            <Text className="card-text">{getInfo.description}</Text>
                        </Grid.Col>
                        {getInfo.image?.map((img: any, index: any) => (
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Image src={img.url} alt="job picture" className="img img-fluid" />
                            </Grid.Col>
                        ))}
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
                                    <Text className="sub-heading">Student Details</Text>
                                </Grid.Col>
                            </Grid>
                            <Container fluid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Full Name:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {getInfo.fullName}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Father Name:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{getInfo.fatherName}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Gender:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{getInfo.gender}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Class:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{getInfo.class}</Text>
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
                                        <Text>{getInfo.email}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Phone Number:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{getInfo.phone}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> city:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{getInfo.city}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Location:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{getInfo.location}</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Group className="foj-footer">
                                            <Text className="foj-footer-text">Want to help this student in education click on Help in Education Button</Text>
                                            <Button className="foj-footer-btn" onClick={() => setOpen({ edId: getInfo._id.toString(), userId: getInfo.userId._id, status: true })}>Help In Education</Button>
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
            <Grid className='jobpage-row mt-2 mb-2'>
                <Group>
                    <Grid className="job-row-text">
                        <Grid.Col lg={6} md={6} sm={12}>
                            <Grid.Col lg={12} md={12} sm={12} >
                                <Group className='d-flex justify-content-center mt-3'>
                                    <NavLink to="/helpstudent" className="job-btn me-5"><Button radius="xl" className="job-btn">Help Student</Button></NavLink>
                                    <NavLink to="/needEducation"><Button radius="xl" className="job-btn">Need Education</Button></NavLink>
                                </Group>
                            </Grid.Col>
                            <Text className="job-banner-text">Help people who can not afford to complete their education.
                            </Text>
                        </Grid.Col>
                        <Grid.Col lg={6} md={6} sm={12}>
                            <Image src={Hero_img} alt="banner image of jobs" className="img img-fluid w-75" />
                        </Grid.Col>
                    </Grid>
                </Group>
            </Grid>
            {Details ? Details :
                <Grid className="card-paddfoj">
                    <Card shadow="sm" className="card-view mt-4 mx-auto">
                        <Grid>
                            <Grid.Col lg={12} md={12} sm={12}>
                                <h3 className="heading">NO JOB POSTED YET</h3>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid>}
            <Footer data={data} />
            <Modal size="55%" radius="xl"
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={open.status}
                onClose={() => setOpen({ edId: "", userId: "", status: false })}
            >
                <Grid>
                    <Formik
                        initialValues={{ eid: open.edId, userIdAdmin: open.userId, newUserId: userId, name: '', gender: '', Phone: '', email: '' }}
                        validationSchema={EducationRequestscheme}
                        onSubmit={async (values) => {
                            try{
                                await getRequestForEducationHelp(values.userIdAdmin, values.eid, values.newUserId!, values.name, values.gender, values.Phone, values.email).then((response: any) => {
                                    swal(response, {
                                        icon: "success",
                                        buttons: {},
                                        timer: 3000,
                                    }).then(()=> {setUpdateCount(updateCount + 1);setOpen({ edId: "", userId: "", status: false })})
                                })
                            }catch (err:any) {
                                swal(err, {
                                  icon: "error",
                                  buttons: {},
                                  timer: 3000,
                                }).then(()=> {setUpdateCount(updateCount + 1);setOpen({ edId: "", userId: "", status: false })})
                            }
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
                                    <ErrorMessage name="name" className="text-danger fs-1" />
                                </Grid.Col>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Text>Your Gender:</Text>
                                </Grid.Col>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Field type="text" name="gender" className="col-text" placeholder="type in your gender" />
                                    <ErrorMessage name="gender" className="text-danger fs-1" />
                                </Grid.Col>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Text>Your Phone Number:</Text>
                                </Grid.Col>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Field type="tel" name="Phone" className="col-text" placeholder="Enter your phone number" />
                                    <ErrorMessage name="Phone" className="text-danger fs-1" />
                                </Grid.Col>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Text>Your E-mail:</Text>
                                </Grid.Col>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Field type="email" name="email" className="col-text" placeholder="Enter your e-mail address" />
                                    <ErrorMessage name="email" className="text-danger fs-1" />
                                </Grid.Col>
                                <Grid.Col lg={12} md={12} sm={12}>
                                    <Button type="submit" className="send-btn" >Send</Button>
                                </Grid.Col>
                            </Grid>
                        </Form>

                    </Formik>
                </Grid>
            </Modal>
        </Container>
    )
}

export default Helpstudent