import { Container, Grid, Text, Button } from '@mantine/core';
import React, { useState, useEffect } from 'react'
import Header from "./../../../components/includes/header";
import Footer from "./../../../components/includes/footer";
import { links, data } from "./../../../components/includes/commons";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import FormData from 'form-data';
import DefaultImg from "./../../../images/default.svg";
import swal from "sweetalert";
import { FaEdit , FaSave} from 'react-icons/fa';
function EditProfile() {
    const userId = sessionStorage.getItem('user');
    const [userInfo, setUserInfo] = useState(true);
    const [contactInfo, setContactInfo] = useState(false);
    const [userData, setData] = useState<any>(null);
    const [image, setImage] = useState({ preview: '', data: '' })
    const [updateCount, setUpdateCount] = useState(0);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
    const handleDeleteProfile = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://madadgar.onrender.com/api/detele/profile/user/${userId}`,
        };

        axios.request(config)
            .then((response) => {
                swal(response.data, {
                    icon: "success",
                    buttons: {},
                    timer: 3000,
                }).then(() => { setUpdateCount(updateCount + 1); })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const fetchUserInfo = async () => {
        const response = await fetch(`https://madadgar.onrender.com/api/user/${userId}`);
        const data = await response.json();
        setData(data);
    }
    function handleEditClick() {
        setEditing(true);
        setName(userData.user.fullName);
    }
    function handleNameChange(e: any) {
        setName(e.target.value);
    }

    useEffect(() => {
        fetchUserInfo();
    }, [updateCount])
    return (
        <Container fluid className='p-0 root'>
            <Header links={links} />
            <Grid className='row-profile'>
                <Grid.Col lg={4} md={12} sm={12} className="editProfile-profile-update-side">
                    <Container className="profileUploadContainer">
                        <Grid>
                            <Grid.Col lg={12} md={12} sm={12}>
                            {editing ? (
                                <>
                                    <input type="text" value={name} onChange={handleNameChange} className="username usernameInput"/>
                                </>
                            ) : (
                                <>
                                    <Text className="username">{userData && userData.user.fullName}
                                    <FaEdit onClick={handleEditClick} /></Text>
                                </>
                            )}
                               <Text className='text-center'><h6>@{userData && userData.user.userName}</h6></Text>
                            </Grid.Col>
                        </Grid>
                        <Grid>
                            <Grid.Col lg={12} md={12} sm={12}>
                                <div style={{ position: 'relative', display: 'inline-block', textAlign: "center" }}>
                                    {userData && userData.user.image.length > 0 ? <img src={userData.user.image[0].url} alt="profile image" className="img img-fluid img-set" /> : <img src={DefaultImg} alt="profile image" className="img img-fluid img-set w-100" />}
                                    <MdDelete size={40} style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleDeleteProfile} />
                                </div>
                            </Grid.Col>

                        </Grid>
                        <Grid>
                            <Grid.Col lg={12} md={12} sm={12} className="text-center mt-3">
                                <input type="file" name="image" id="img" className='d-none' onChange={handleFileChange} />
                                <label htmlFor="img" className='btn uploadBtn text-white'>Upload New Photo</label>
                            </Grid.Col>
                        </Grid>
                        <Grid>
                            <Grid.Col lg={12} md={12} sm={12} className="mt-3">
                                <div className="note_upload">
                                    <Text>upload a new avatar.Larger image will be resized automatically</Text>
                                </div>
                            </Grid.Col>
                        </Grid>
                        <Grid>
                            <Grid.Col lg={12} md={12} sm={12} className="text-center mt-3 mb-3">
                                <Text>
                                    {(() => {
                                        const formattedDate = new Intl.DateTimeFormat('en-US', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            hour12: true
                                        }).format(new Date(userData && userData.user.data));
                                        return formattedDate;
                                    })()}
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Container>
                </Grid.Col>
                <Grid.Col lg={8} md={12} sm={12} className="profilenexttab">
                    <Container className="editTab">
                        <Grid >
                            <Grid.Col lg={12} md={12} sm={12} className="edit-text-col">
                                <Text className="edit-text">Edit Profile</Text>
                                <div className="editbtn">
                                    <Button className='btn-user' onClick={e => { setUserInfo(true); setContactInfo(false) }}>User Information</Button>
                                    <Button className='btn-user' onClick={e => { setUserInfo(false); setContactInfo(true) }}>Contact Information</Button>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Container>
                    <Container className="profileSideTab">
                        {
                            userInfo && (
                                <Grid>
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Formik
                                            initialValues={{ image: image.data, work: '', gender: '', financial: "", qualification: "", occupation: '',fullName:name }}
                                            onSubmit={async (values) => {
                                                var data = new FormData();
                                                data.append('image', image.data);
                                                data.append('fullName', name);
                                                data.append('work', values.work);
                                                data.append('financial', values.financial);
                                                data.append('gender', values.gender);
                                                data.append('occupation', values.occupation);
                                                data.append('qualification', values.qualification);

                                                var config = {
                                                    method: 'post',
                                                    maxBodyLength: Infinity,
                                                    url: `https://madadgar.onrender.com/api/updateDetail/${userId}`,
                                                    data: data
                                                };

                                                axios(config)
                                                    .then(function (response: any) {
                                                        swal(response.data, {
                                                            icon: "success",
                                                            buttons: {},
                                                            timer: 3000,
                                                        }).then(() => { setUpdateCount(updateCount + 1); }).then(()=>window.location.reload());
                                                    })
                                                    .catch(function (error: any) {
                                                        console.log(error);
                                                    });
                                            }}
                                        >
                                            <Form>
                                                <Grid className='form-group'>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Gender</Text>
                                                        <Field name="gender" component="select" className="form-control" as="select">
                                                            <option value="" disabled>Please Select Your Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </Field>
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Work</Text>
                                                        <Field type="text" name="work" className="form-control" placeholder="what is your current work" />
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Financial</Text>
                                                        <Field name="financial" component="select" className="form-control" as="select">
                                                            <option value="" disabled>Your financial Status</option>
                                                            <option value="stable">Stable</option>
                                                            <option value="rich">rich</option>
                                                            <option value="poor">poor</option>
                                                        </Field>
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Qualification</Text>
                                                        <Field name="qualification" component="select" className="form-control" as="select">
                                                            <option value="" disabled>Your Qualification</option>
                                                            <option value="none">none</option>
                                                            <option value="matric">matric</option>
                                                            <option value="FA/FS">FA/FS</option>
                                                            <option value="Graducation">Graducation</option>
                                                        </Field>
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Occupation</Text>
                                                        <Field type="text" name="occupation" className="form-control" placeholder="Your Occupation" />
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12} className="p-5">
                                                        <Button type='submit' className='btn-submit-profile'>Update Information</Button>
                                                    </Grid.Col>
                                                </Grid>
                                            </Form>
                                        </Formik>
                                    </Grid.Col>
                                </Grid>
                            )
                        }
                        {
                            contactInfo && (
                                <Grid>
                                    <Grid.Col lg={12} md={12} sm={12}>
                                        <Formik
                                            initialValues={{ phone: '', cphone: '', email: "", conform_email: "", address: '' }}
                                            onSubmit={(values, { setFieldError }) => {
                                                if (values.phone != values.cphone) {
                                                    setFieldError('cphone', 'Phone number and Confirm Phone number must match');
                                                }
                                                else if (values.email != values.conform_email) {
                                                    setFieldError('conform_email', 'email and conform email must match');
                                                }
                                                else {
                                                    var data = new FormData();
                                                    data.append('image', image.data);
                                                    data.append('email', values.email);
                                                    data.append('phone', values.phone);
                                                    data.append('address', values.address);
                                                    var config = {
                                                        method: 'post',
                                                        maxBodyLength: Infinity,
                                                        url: `https://madadgar.onrender.com/api/updateDetail/${userId}`,
                                                        data: data
                                                    };
                                                    axios(config)
                                                        .then(function (response: any) {
                                                            swal(response.data, {
                                                                icon: "success",
                                                                buttons: {},
                                                                timer: 3000,
                                                            }).then(() => { setUpdateCount(updateCount + 1); })
                                                        })
                                                        .catch(function (error: any) {
                                                            console.log(error);
                                                        });
                                                }
                                            }}
                                        >
                                            <Form>
                                                <Grid className='form-group'>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Phone Number</Text>
                                                        <Field type="tel" name="phone" className="form-control" placeholder="Phone number" />
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Conform Phone Number</Text>
                                                        <Field type="tel" name="cphone" className="form-control" placeholder="Conform Phone Number" />
                                                        <ErrorMessage name="cphone" className="error-message" component="div" />
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Email</Text>
                                                        <Field type="email" name="email" className="form-control" placeholder="email" />
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12}>
                                                        <Text className='label-text'>Conform Email</Text>
                                                        <Field type="email" name="conform_email" className="form-control" placeholder="conform email" />
                                                        <ErrorMessage name="conform_email" className="error-message" component="div" />
                                                    </Grid.Col>
                                                    <Grid.Col lg={12} md={12} sm={12}>
                                                        <Text className='label-text'>Address</Text>
                                                        <Field name="address" id="description" as="textarea" rows={10} cols={20} className='w-100 rounded-2' />
                                                    </Grid.Col>
                                                    <Grid.Col lg={6} md={12} sm={12} className="p-5">
                                                        <Button type='submit' className='btn-submit-profile'>Update Information</Button>
                                                    </Grid.Col>
                                                </Grid>
                                            </Form>
                                        </Formik>
                                    </Grid.Col>
                                </Grid>
                            )
                        }
                    </Container>
                </Grid.Col>
            </Grid>
            <Footer data={data} />
        </Container>
    )
}

export default EditProfile