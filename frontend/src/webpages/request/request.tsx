import React, { useEffect, useState } from 'react'
import Header from './../../components/includes/header';
import Footer from './../../components/includes/footer';
import { links, data } from './../../components/includes/commons';
import { Container, Grid, Text, Card, Group, Button, Modal, Image } from '@mantine/core';
import { MdDeleteForever } from "react-icons/md";
import DefaultImg from "./../../images/default.svg";
import { requestHandleFromAnotherUser,requestHandleFromAnotherUserDonation } from "./requestHandler";
import axios from "axios";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import { FaFilePdf } from "react-icons/fa";
import { BsFileEarmarkWordFill } from "react-icons/bs";
function Request() {
    const userID = sessionStorage.getItem("user");
    const [userId, setUserId] = useState<any>();
    const [medReport, setMedReport] = useState<any>();
    const [opened, setOpened] = useState({ index: 0, status: false });
    const [image, showImage] = useState({ index: 0, status: false })
    const [eduReport, setEduReport] = useState<any>();
    const [donaRepost, setdonaRepost] = useState<any>();
    async function deteleRequest(jobRequestId: any) {
        const response = await fetch(`https://madadgar.onrender.com/api/delete/jobRequest/${jobRequestId}`, {
            "method": "DELETE",
            headers: {}
        });
        const data = await response.json()
        if (data) {
            swal(
                "Delete", {
                text: "Request Deleted",
                icon: "info",
                buttons: {},
                timer: 3000,
            }).then((refresh) => { window.location.reload() })
        }
    }
    async function deteleMedRequest(medRequestId: any) {
        const response = await fetch(`https://madadgar.onrender.com/api/delete/medRequest/${medRequestId}`, {
            "method": "DELETE",
            headers: {}
        });
        const data = await response.json()
        if (data) {
            swal(
                "Delete", {
                text: "Request Deleted",
                icon: "info",
                buttons: {},
                timer: 3000,
            }).then((refresh) => { window.location.reload() })
        }
    }
    async function fetchJob() {
        try {
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `https://madadgar.onrender.com/api/jobRequestToUser/${userID}`,
                headers: {}
            };

            await axios(config)
                .then(function (response) {
                    setUserId(response.data)
                })
                .catch(function (error) {

                });
        } catch {
        }
    }
    async function fetchMed() {
        try {
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `https://madadgar.onrender.com/api/medRequestTouser/${userID}`,
                headers: {}
            };

            await axios(config)
                .then(function (response) {
                    setMedReport(response.data)
                })
        } catch {
        }
    }
    const getEdurequest = async () => {
        await requestHandleFromAnotherUser(userID!).then((response) => {
            setEduReport(response);
        })
    }
    const getDonationRequest = async () => {
        await requestHandleFromAnotherUserDonation(userID!).then((response)=>{
            setdonaRepost(response);
        })
    }
    useEffect(() => {
        const storedUserId = sessionStorage.getItem("user");
        if (storedUserId) {
            fetchJob();
            fetchMed();
            getEdurequest();
            getDonationRequest();
        }
    }, []);
    return (
        <Container fluid className="root">
            <Header links={links} />
            <Container className="request">
                <Grid>
                    <Grid.Col lg={12} md={12} sm={12} className="header-top">
                        <h1>Requests</h1>
                    </Grid.Col>
                </Grid>
                {userId && <>
                    <>
                        {userId.requests?.map((getinfo: any, index: any) => (

                            <Card shadow="sm" radius="xl" className='card-request' key={index}>
                                <Grid>
                                    {getinfo.newUserId.image.length > 0 ?
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={getinfo.newUserId.image[0].url} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                        :
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={DefaultImg} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                    }
                                    <Grid.Col lg={3} md={12} sm={12} className="user-info-section">
                                        <Text className='request-name'>{getinfo.newUserId.fullName}</Text>
                                        <Text className='request-username'>@{getinfo.newUserId.userName}</Text>
                                        <Text className='request-type'>{getinfo.jobId.title}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12} className="request-btn">
                                        <Group>
                                            <Text onClick={() => (deteleRequest(getinfo._id))} style={{ cursor: 'pointer' }}><MdDeleteForever size={40} /></Text>
                                            <Link to={`/messangerCreate?serviceId=${getinfo.jobId._id}&postedMemberId=${getinfo.userId}&requestedMemberId=${getinfo.newUserId._id}&postId=${getinfo._id}`}><Button className="request-btnaccept">Accept</Button></Link>
                                            <Button className='request-btnview' onClick={() => setOpened({ index: index, status: true })}>View</Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Card>

                        ))}
                    </>
                </>

                }
                {medReport && <>
                    <>

                        {medReport.requests?.map((getinfo: any, index: any) => (

                            <Card shadow="sm" radius="xl" className='card-request' key={index}>
                                <Grid>
                                    {getinfo.reqUserID.image.length > 0 ?
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={getinfo.reqUserID.image[0].url} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                        :
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={DefaultImg} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                    }
                                    <Grid.Col lg={3} md={12} sm={12} className="user-info-section">
                                        <Text className='request-name'>{getinfo.reqUserID.fullName}</Text>
                                        <Text className='request-username'>@{getinfo.reqUserID.userName}</Text>
                                        <Text className='request-type'>{getinfo.medID.title}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12} className="request-btn">
                                        <Group>
                                            <Text onClick={() => (deteleMedRequest(getinfo._id))} style={{ cursor: 'pointer' }}><MdDeleteForever size={40} /></Text>
                                            <Link to={`/messangerCreate?serviceId=${getinfo.medID._id}&postedMemberId=${getinfo.userId}&requestedMemberId=${getinfo.reqUserID._id}&postId=${getinfo._id}`}><Button className="request-btnaccept">Accept</Button></Link>
                                            <Button className='request-btnview' onClick={() => setOpened({ index: index, status: true })}>View</Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Card>

                        ))}
                    </>
                </>

                }
                {eduReport && <>
                    <>

                        {eduReport?.map((getinfo: any, index: any) => (

                            <Card shadow="sm" radius="xl" className='card-request' key={index}>
                                <Grid>
                                    {getinfo.reqUserID.image.length > 0 ?
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={getinfo.reqUserID.image[0].url} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                        :
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={DefaultImg} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                    }
                                    <Grid.Col lg={3} md={12} sm={12} className="user-info-section">
                                        <Text className='request-name'>{getinfo.reqUserID.fullName}</Text>
                                        <Text className='request-username'>@{getinfo.reqUserID.userName}</Text>
                                        <Text className='request-type'>{getinfo.educationPostId.title}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12} className="request-btn">
                                        <Group>
                                            <Text style={{ cursor: 'pointer' }}><MdDeleteForever size={40} /></Text>
                                            <Link to={`/messangerCreate?serviceId=${getinfo.educationPostId._id}&postedMemberId=${getinfo.userId._id}&requestedMemberId=${getinfo.reqUserID._id}&postId=${getinfo._id}`}><Button className="request-btnaccept">Accept</Button></Link>
                                            <Button className='request-btnview' onClick={() => setOpened({ index: index, status: true })}>View</Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Card>

                    ))}
                    </>
                    </>

                }
                {donaRepost && <>
                    <>

                        {donaRepost?.map((getinfo: any, index: any) => (

                            <Card shadow="sm" radius="xl" className='card-request' key={index}>
                                <Grid>
                                    {getinfo.reqUserID.image.length > 0 ?
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={getinfo.reqUserID.image[0].url} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                        :
                                        <Grid.Col lg={3} md={12} sm={12}>
                                            <img src={DefaultImg} alt="user-img" className="img img-fluid img-rounded-circle " />
                                        </Grid.Col>
                                    }
                                    <Grid.Col lg={3} md={12} sm={12} className="user-info-section">
                                        <Text className='request-name'>{getinfo.reqUserID.fullName}</Text>
                                        <Text className='request-username'>@{getinfo.reqUserID.userName}</Text>
                                        <Text className='request-type'>{getinfo.donationPostId.itemType}</Text>
                                    </Grid.Col>
                                    <Grid.Col lg={6} md={12} sm={12} className="request-btn">
                                        <Group>
                                            <Text style={{ cursor: 'pointer' }}><MdDeleteForever size={40} /></Text>
                                            <Link to={`/messangerCreate?serviceId=${getinfo.donationPostId._id}&postedMemberId=${getinfo.userId._id}&requestedMemberId=${getinfo.reqUserID._id}&postId=${getinfo._id}`}><Button className="request-btnaccept">Accept</Button></Link>
                                            <Button className='request-btnview' onClick={() => setOpened({ index: index, status: true })}>View</Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Card>

                    ))}
                    </>
                    </>

                }

                {/* {getAllRequest} */}

            </Container>
            <Footer data={data} />
            {/* model start */}
            <Modal size="55%" radius="xl"
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={opened.status}
                onClose={() => setOpened({ index: 0, status: false })}
            >
                {userId ? <>

                    <Grid>

                        <Grid className="padd-modal">
                            <Grid.Col lg={12} md={12} sm={12}>
                                <h5>{userId.requests[opened.index].newUserId.fullName} Details</h5>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>Age:</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>{userId.requests[opened.index].Age}</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>Qualification:</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>{userId.requests[opened.index].qualification}</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>Experience:</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>{userId.requests[opened.index].experience}</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>Gender:</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>{userId.requests[opened.index].gender}</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>Skills:</Text>
                            </Grid.Col>
                            <Grid.Col lg={6} md={12} sm={12}>
                                <Text>{userId.requests[opened.index].skills}</Text>
                            </Grid.Col>
                            {userId.requests[0].jobId.Cv == "no" ? <></> : <>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Text>CV:</Text>
                                </Grid.Col>
                                <Grid.Col lg={6} md={12} sm={12}>
                                    <Button className='button' onClick={(e) => { showImage({ index: opened.index, status: true }) }}>View Cv</Button>
                                </Grid.Col></>}
                            <Grid.Col lg={12} md={12} sm={12}>
                                <Text className='text-center fw-bold'>Why He/She want this job</Text>
                            </Grid.Col>
                            <Grid.Col lg={12} md={12} sm={12}>
                                <Text className='w-100 bg-textarea p-5'>{userId.requests[opened.index].description}</Text>
                            </Grid.Col>
                            <Grid.Col lg={12} md={12} sm={12}>
                                <Button className="send-btn">Close</Button>
                            </Grid.Col>
                        </Grid>

                    </Grid>
                </> : <>nothing to show</>
                }
            </Modal>

            {/* model end */}
            {/* picture show model */}
            <>
                <Modal radius="xl"
                    opened={image.status}
                    onClose={() => showImage({ index: 0, status: false })}
                >
                    {/* Modal content */}
                    {userId && userId.requests && userId.requests[image.index] && userId.requests[image.index].image && userId.requests[image.index].image[0] ? (
                        <Grid>
                            <Grid.Col lg={6} sm={6} md={6}>
                                {userId.requests[image.index].image[0].url.endsWith('.pdf') ? (
                                    <div className='file-style'>
                                        <FaFilePdf size={100} />
                                        <a href={userId.requests[image.index].image[0].url} target="_blank" className='btn btn-success'>Open PDF</a>
                                    </div>
                                ) : userId.requests[image.index].image[0].url.endsWith('.doc') || userId.requests[image.index].image[0].url.endsWith('.docx') ? (
                                    <div className='file-style'>
                                        <BsFileEarmarkWordFill size={100} />
                                        <a href={userId.requests[image.index].image[0].url} target="_blank" className='btn btn-success'>Open Word Document</a>
                                    </div>
                                ) : (
                                    <Image src={userId.requests[image.index].image[0].url} />
                                )}
                            </Grid.Col>
                        </Grid>
                    ) : null}





                </Modal>
                {/* picture show model end */}
            </>
        </Container>
    )
}

export default Request