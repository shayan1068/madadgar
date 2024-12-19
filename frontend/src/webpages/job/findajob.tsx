import { Container, Grid, Group, Text, Image, Button, Card, Modal } from '@mantine/core';
import { useEffect, useState } from 'react'
import Header from "./../../components/includes/header";
import Footer from "./../../components/includes/footer";
import Computer from "./../../images/job/computer.svg";
import { links, data } from './../../components/includes/commons';
import "./../../css/style.css";
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import FormData from 'form-data';
import axios from "axios";
import swal from "sweetalert";
const Findajob = () => {
    const [image, setImage] = useState({ preview: '', data: '' })
    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
    const newUserId = sessionStorage.getItem('user');
    const [getData, setData] = useState<any>();
    const fetchJob = async () => {
        try {
            const response = await fetch(`https://madadgar.onrender.com/api/job/fetch/${newUserId}`)
            const data = await response.json();
            setData(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchJob()
    }, []);

    const [toggle, setToggle] = useState({ index: -1, toggle: false });
    const [open, setOpen] = useState({ jobId: "", userId: "",cvRequird:"", status: false });
    console.log(open.cvRequird);
    if (getData && getData.userId != newUserId) {
        var details = getData?.map((details: any, index: any) => (
            <Grid className="card-paddfoj" key={index}>
                <Card shadow="sm" className="card-view mt-4">
                    <Grid>
                        <Grid.Col lg={6} md={12} sm={12}>
                            <h3 className="heading">{details.title}</h3>
                            <Text className="card-text">{details.description}</Text>
                        </Grid.Col>
                        {details.image?.map((img: any) => (
                            <Grid.Col lg={6} md={12} sm={12} key={img._id}><Image src={img.url} alt="job picture" className="img img-fluid" /></Grid.Col>
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
                        <Card shadow="sm" className="toggle-card-bg" >
                            <Grid>
                                <Grid.Col lg={12} md={12} sm={12} className="requirements">
                                    <Text className="sub-heading">Requirements</Text>
                                </Grid.Col>
                            </Grid>
                            <Container fluid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Required Age:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.requiredAge.from} to {details.requiredAge.to}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Required Qualification:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text>{details.requiredQualition}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Required Experience:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.requiredExperience}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Skills Required:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.skills}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> CV Required:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.Cv}</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid className="requirements">
                                    <Grid.Col>
                                        <Text className="sub-headingfoj">About this Job</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Work Type:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.workType}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Required For:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.requiredFor}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Location:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.location}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Time Needed:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.timeNeeded}</Text>
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
                                        <Text> {details.email}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> Phone Number:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={6} sm={6}>
                                        <Text> {details.phone}</Text>
                                    </Grid.Col>
                                </Grid>
                                <Grid className="foj-conatiner">
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Group className="foj-footer">
                                            <Text className="foj-footer-text">If you would like to do thisjob then click on request job button</Text>
                                            <Button className="foj-footer-btn" onClick={() => setOpen({ jobId: details._id.toString(),cvRequird:details.Cv, userId: details.userId._id.toString(), status: true })}>Request a Job</Button>
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
                <Grid className="job-col">
                    <Grid.Col lg={12} md={12} sm={12} >
                        <Group>
                            <Link to="/poj" className="job-btn"><Button radius="xl" className="job-btn">Post a Job</Button></Link>
                            <Button radius="xl" className="job-btn">Find a Job</Button>
                        </Group>
                    </Grid.Col>
                </Grid>
                <Group>
                    <Grid className="job-row-text">
                        <Grid.Col lg={6} md={6} sm={12}>
                            <Image src={Computer} alt="banner image of jobs" />
                        </Grid.Col>
                        <Grid.Col lg={6} md={6} sm={12}>
                            <Text className="job-banner-text">Find what you are looking for and choose what you desire
                            </Text>

                        </Grid.Col>
                    </Grid>
                </Group>
                <Grid>
                </Grid>
            </Grid>
            <>
                {getData && getData.length > 0 ? <>{details}</> : <>
                    <Grid className="card-paddfoj">
                        <Card shadow="sm" className="card-view mt-4 mx-auto">
                            <Grid>
                                <Grid.Col lg={12} md={12} sm={12}>
                                    <h3 className="heading">NO JOB POSTED YET</h3>
                                </Grid.Col>
                            </Grid>
                        </Card>
                    </Grid>
                </>}
            </>

            <Footer data={data} />


            <Modal size="55%" radius="xl"
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={open.status}
                onClose={() => setOpen({ jobId: "", userId: "",cvRequird:"", status: false })}
            >
                <Grid>
                    <Formik
                        initialValues={{ jobId: '', userId: '', newUserId: '', age: '', qualification: '', experience: '', gender: '', skills: '', image: null, description: '' }}
                        onSubmit={(values) => {
                            var data = new FormData();
                            data.append('Age', values.age);
                            data.append('qualification', values.qualification);
                            data.append('gender', values.gender);
                            data.append('skills', values.skills);
                            data.append('image', image.data);
                            data.append('experience', values.experience);
                            data.append('description', values.description);
                            data.append('newUserId', newUserId);
                            data.append('userId', open.userId);
                            data.append('jobId', open.jobId);
                            var config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: `https://madadgar.onrender.com/api/jobRequest/send/${open.userId}/${open.jobId}/${newUserId}`,
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
                                }).then(() => setOpen({ jobId: '', userId: '',cvRequird:"", status: false }))
                            })
                            .catch(function (error) {
                                swal("Request Already Submitted",{
                                    icon: "error",
                                    buttons: {},
                                    timer: 3000,
                                  }).then(() => setOpen({ jobId: '', userId: '',cvRequird:"", status: false }))
                            });
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Grid className="padd-modal">
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <h5>Your Details</h5>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Age:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="text" name="age" className="col-text" placeholder="type in your age" />
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Qualification:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="text" name="qualification" className="col-text" placeholder="type in your qualification" />
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Experience:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="text" name="experience" className="col-text" placeholder="type in your experience" />
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Gender:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="text" name="gender" className="col-text" placeholder="type in your gender" />
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Your Skills:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <Field type="text" name="skills" className="col-text" placeholder="type in your skills" />
                                    </Grid.Col>
                                    {open.cvRequird == "yes" ? (
                                        <>
                                            <Grid.Col lg={6} md={12} sm={12}>
                                                <Text>Submit Your CV:</Text>
                                            </Grid.Col>
                                            <Grid.Col lg={6} md={12} sm={12}>
                                                <input type="file" name="image" id="img" className='d-none' onChange={handleFileChange} />
                                                <label htmlFor="img" className='button' >Submit</label>
                                                <small id="img" className=" d-block form-text text-muted">submit if required.</small>
                                            </Grid.Col>
                                        </>
                                    ) : null}

                                    {/* <Grid.Col lg={6} md={12} sm={12}>
                                        <Text>Submit Your CV:</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12}>
                                        <input type="file" name="image" id="img" className='d-none' onChange={handleFileChange} />
                                        <label htmlFor="img" className='button' >Submit</label>
                                        <small id="img" className=" d-block form-text text-muted">submit if required.</small>
                                    </Grid.Col> */}
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Text className='text-center fw-bold'>Why do you want this job</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Field name="description" id="description" as="textarea" rows={10} cols={20} className='w-100 bg-textarea' />
                                    </Grid.Col>
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Button type="submit" className="send-btn">Send</Button>
                                    </Grid.Col>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Modal>
        </Container>

    )
}

export default Findajob