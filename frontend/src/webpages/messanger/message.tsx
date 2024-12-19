import React, { useState, useEffect, useRef, useMemo } from "react";
import {
    MDBTypography,
} from "mdb-react-ui-kit";
import { Card, Container, Grid, Text, ScrollArea, Drawer, Group, Button } from "@mantine/core";
import "./../../css/style.css";
import Header from "./../../components/includes/header";
import Footer from "./../../components/includes/footer";
import { links, data } from "./../../components/includes/commons";
import { Link } from "react-router-dom";
import defaultImg from "./../../images/default.svg";
import { io } from 'socket.io-client';
import { useDisclosure } from '@mantine/hooks';
import { getTheDetailAboutTheUser, storeChatinMongoDB, sendVoiceNoteToDb } from "./messanger-serverHandler";
import { AiOutlineMenu, AiOutlineSend } from "react-icons/ai";
import DefaultProfile from "./../../images/default.svg";
import Play from './play';
import { BsMic } from "react-icons/bs";
const socket = io('https://madadgar.onrender.com');
export default function App() {
    const fullName = sessionStorage.getItem('userName');
    const personID = sessionStorage.getItem('user');
    const [getData, setDataFromIdentity] = useState<any>();
    const [getBlob, setBlob] = useState<any>('');
    const [toggle, setToggle] = useState({ index: -1, toggle: false });
    const [getIndex, setIndex] = useState(0);
    const [newMessage, setNewMessage] = useState("");
    const [getMessages, setMessage] = useState<any>([]);
    const [updateCount, setUpdateCount] = useState(0);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [isOnline, setIsOnline] = useState(false);
    const [voiceNoteData, setVoiceNoteData] = useState<any>(null);
    const scrollRef = useRef<any>();
    const getIDs = async () => {
        await getTheDetailAboutTheUser(personID!).then((response) => {
            setDataFromIdentity(response);
        })
    }
    const handleRecordedBlob = (personID: string, messageID: string) => (blob: Blob) => {
        setBlob(blob);
        sendVoiceNoteToDb(personID, messageID, blob).then((response) => {
            socket.emit("new-voice-note-sent", { personID, messageID });
        })
    };
    useEffect(() => {
        socket.on("new-voice-note-received", (data) => {
            setVoiceNoteData(data);
        });
    }, [voiceNoteData]);
    useEffect(() => {
        socket.on("getMessage", ({ sendId, messageText }) => {
            setArrivalMessage({
                sendId,
                messageText,
                createdAt: Date.now(),
            });
        })
    }, [getMessages])
    useEffect(() => {
        arrivalMessage &&
            setMessage((prev: any) => [...prev, arrivalMessage.messageText]);
    }, [arrivalMessage]);
    const getMessage = async (personID: any, text: any, messangeID: any) => {
        await storeChatinMongoDB(personID, text, messangeID).then((response) => {
            setMessage([...getMessages, response.message.text]);
            setNewMessage("");
        }).then(() => { setUpdateCount(updateCount + 1) });
    }
    useEffect(() => {
        socket.emit('join', { username: personID });
        socket.on('userOnline', (username) => {
            console.log(`User ${username} is online`);
            setIsOnline(true);
        });

        socket.on('userOffline', (username) => {
            console.log(`User ${username} is offline`);
            setIsOnline(false);
        });
        return () => {
            socket.on("disconnect", () => {
                console.log("Disconnected from server");
            });
        }
    }, []);
    useEffect(() => {
        getIDs();
    }, [getMessages])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        scrollRef.current?.scrollIntoView(false);
        // console.log(scrollRef.current);
    }, [getMessages]);
    // console.log(voiceNoteData);
    // console.log(getData);
    const sizeInSeconds = getBlob.size / 1000;
    const minutes = Math.floor(sizeInSeconds / 60);
    const seconds = Math.round(sizeInSeconds % 60);
    const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    let detailOfUser;
    if (getData && getData.some((user: any) => user.userId._id === personID)) {
        detailOfUser = getData?.map((info: any, index: any) => (
            <MDBTypography listUnStyled className="mb-0 messangerProfileSide" key={index}>
                <li className="p-2 acheck">
                    <div
                        className="link"
                        onClick={() => {
                            setIndex(index);
                            if (toggle.index == index) {
                                setToggle({ index: index, toggle: !toggle.toggle })
                            }
                            else {
                                setToggle({ index: index, toggle: true })
                            }
                        }}
                    >
                        <div className="d-flex flex-row">
                            <div>
                                {info.reqUserID.image.length > 0 ? (
                                    info.reqUserID.image.map((image: any, index: any) => (
                                        <img
                                            key={index}
                                            src={image.url}
                                            alt="avatar"
                                            className="d-flex align-self-center me-3"
                                            width="60"
                                        />
                                    ))
                                ) : (
                                    <img
                                        src={defaultImg}
                                        alt="avatar"
                                        className="d-flex align-self-center me-3"
                                        width="60"
                                    />
                                )}
                                <span className="badge bg-success badge-dot"></span>
                            </div>
                            <div className="pt-1">
                                {info.userId._id == personID ? <p className="mb-0 userName">{info.reqUserID.fullName}</p> : <p className="mb-0 userName">{info.userId.fullName}</p>}
                                <p className="small text-muted">
                                    {info.chat.length > 0 ? (
                                        info.chat[info.chat.length - 1].text ? (
                                            <>{info.chat[info.chat.length - 1].text}</>
                                        ) : (
                                            <>
                                                <BsMic /> Voice Note
                                            </>
                                        )
                                    ) : (
                                        <>Lets start chat to know each other</>
                                    )}
                                </p>

                            </div>
                        </div>

                        <div className="pt-1">
                            <p className="small text-muted mb-1">Just now</p>
                            {isOnline ? <span className="badge bg-success rounded-pill float-end text-success">
                                .
                            </span> : <span className="badge bg-danger rounded-pill float-end text-danger">
                                .
                            </span>}
                        </div>
                    </div>
                </li>
            </MDBTypography>
        ))
    } else if (getData && getData.some((user: any) => user.reqUserID._id === personID)) {
        detailOfUser = getData?.map((info: any, index: any) => (
            <MDBTypography listUnStyled className="mb-0 messangerProfileSide" key={index}>
                <li className="p-2 acheck">
                    <div
                        className="link"
                        onClick={() => {
                            setIndex(index);
                            if (toggle.index == index) {
                                setToggle({ index: index, toggle: !toggle.toggle })
                            }
                            else {
                                setToggle({ index: index, toggle: true })
                            }
                        }}
                    >
                        <div className="d-flex flex-row">
                            <div>
                                {info.reqUserID.image.length > 0 ? (
                                    info.reqUserID.image.map((image: any, index: any) => (
                                        <img
                                            key={index}
                                            src={image.url}
                                            alt="avatar"
                                            className="d-flex align-self-center me-3"
                                            width="60"
                                        />
                                    ))
                                ) : (
                                    <img
                                        src={defaultImg}
                                        alt="avatar"
                                        className="d-flex align-self-center me-3"
                                        width="60"
                                    />
                                )}
                                <span className="badge bg-success badge-dot"></span>
                            </div>
                            <div className="pt-1">
                                {info.userId._id == personID ? <p className="mb-0 userName">{info.reqUserID.fullName}</p> : <p className="mb-0 userName">{info.userId.fullName}</p>}
                                <p className="small text-muted">
                                    {info.chat.length > 0 ? (
                                        info.chat[info.chat.length - 1].text ? (
                                            <>{info.chat[info.chat.length - 1].text}</>
                                        ) : (
                                            <>
                                                <BsMic /> Voice Note
                                            </>
                                        )
                                    ) : (
                                        <>Lets start chat to know each other</>
                                    )}
                                </p>

                            </div>
                        </div>

                        <div className="pt-1">

                            <p className="small text-muted mb-1">Just now</p>
                            {isOnline ? <span className="badge bg-success rounded-pill float-end text-success">

                            </span> : <span className="badge bg-danger rounded-pill float-end text-danger">

                            </span>}

                        </div>
                    </div>
                </li>
            </MDBTypography>
        ))
    } else {
        detailOfUser = (
            <MDBTypography listUnStyled className="mb-0 messangerProfileSide">
                <li className="p-2 acheck">
                    <Link
                        to="#!"
                        className="link"
                    >
                        Nothing to show here
                    </Link>
                </li>
            </MDBTypography>
        )
    }
    // console.log(getData);
    return (
        <Container fluid className="p-2">
            <Header links={links} />
            <Grid>
                <Grid.Col md={12} >
                    <Card id="chat3">
                        <Card.Section>
                            <Grid>
                                <Grid.Col md={6} lg={5} xl={4} className="profileMessanger">
                                    <ScrollArea
                                        style={{ position: "relative", height: "400px" }}
                                    >
                                        <Drawer opened={opened} onClose={close}>
                                            {detailOfUser}
                                        </Drawer>
                                        {detailOfUser}
                                    </ScrollArea>

                                </Grid.Col>
                                <> <Group position="center" className="sideMessageBar">
                                    <Button onClick={open}><AiOutlineMenu /></Button>
                                </Group></>
                                {toggle.index == getIndex && toggle.toggle && (
                                    <>
                                        {getData[getIndex].userId._id === personID ? <>
                                            <Grid.Col md={6} lg={7} xl={8} >
                                                <Grid>
                                                    <Grid.Col md={12} lg={12} xl={12} className="headerMessanger">

                                                        <div className="messangerHeader">
                                                            {getData && getData ? (
                                                                <>
                                                                    {getData[getIndex].userId._id == personID ? (
                                                                        <>
                                                                            {getData[getIndex].reqUserID.image.length > 0 ? (
                                                                                <img
                                                                                    src={getData[getIndex].reqUserID.image[0].url}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={DefaultProfile}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {getData[getIndex].userId.image.length > 0 ? (
                                                                                <img
                                                                                    src={getData[getIndex].userId.image[0].url}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={DefaultProfile}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <img
                                                                    src={DefaultProfile}
                                                                    alt="avatar 3"
                                                                    style={{ width: "40px", height: "100%" }}
                                                                />
                                                            )}

                                                            {/* {info.userId._id == personID ? <p className="mb-0 userName">{info.reqUserID.fullName}</p> : <p className="mb-0 userName">{info.userId.fullName}</p>} */}
                                                            {getData && getData[getIndex].userId._id === personID ? <Text className="headerUserName">{getData[getIndex].reqUserID.fullName}</Text> : <Text className="headerUserName">{getData[getIndex].userId.fullName}</Text>}
                                                            {/* <Text className="headerUserName">lol</Text> */}
                                                            {/* first username display form here */}






                                                        </div>
                                                    </Grid.Col>
                                                </Grid>
                                                <div className="chat-side">
                                                    <ScrollArea
                                                        style={{ position: "relative", height: "400px" }}
                                                        className="pt-3 pe-3"
                                                    >
                                                        <div className="notificationDev">
                                                            {/* <p className="notificationAboutservice">Chat started to communicate about accepted post {getData ?getData[getIndex].eduId[getIndex].title:<></> }</p>
                                                        <p className="notificationAboutservice">Chat started to communicate about accepted post {getData ?getData[getIndex].medID[getIndex].title:<></> }</p> */}
                                                        </div>
                                                        <div className="mb-5" ref={scrollRef}>
                                                            {getData && getData[getIndex].chat?.map((chats: any, index: any) => (
                                                                // <div>{chats.sender._id}</div>
                                                                chats.sender._id === personID ? <>
                                                                    <div className="d-flex flex-row justify-content-start" key={index}>
                                                                        {chats.sender && chats.sender.image.length > 0 ? <>
                                                                            <img
                                                                                src={chats.sender.image[0].url}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></> : <>
                                                                            <img
                                                                                src={DefaultProfile}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></>}

                                                                        <div>
                                                                            <p
                                                                                className="small p-2 ms-3 mb-1 rounded-3"
                                                                                style={{ backgroundColor: "#f5f6f7" }}
                                                                            >
                                                                                {chats.text ? <>{chats.text}</> : <><audio controls src={chats.voiceUrl} className="audioPlayer" /></>}
                                                                            </p>
                                                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                                                {(() => {
                                                                                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                                                                                        day: '2-digit',
                                                                                        month: 'short',
                                                                                        year: 'numeric',
                                                                                        hour: 'numeric',
                                                                                        minute: 'numeric',
                                                                                        second: 'numeric',
                                                                                        hour12: true
                                                                                    }).format(new Date(chats.createdAt));
                                                                                    return formattedDate;
                                                                                })()}
                                                                            </p>

                                                                        </div>
                                                                    </div>
                                                                </> : <>
                                                                    <div className="d-flex flex-row justify-content-end">
                                                                        <div>
                                                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-color">
                                                                                {chats.text ? <>{chats.text}</> : <><audio controls src={chats.voiceUrl} className="audioPlayer" /></>}
                                                                            </p>
                                                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                                                {(() => {
                                                                                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                                                                                        day: '2-digit',
                                                                                        month: 'short',
                                                                                        year: 'numeric',
                                                                                        hour: 'numeric',
                                                                                        minute: 'numeric',
                                                                                        second: 'numeric',
                                                                                        hour12: true
                                                                                    }).format(new Date(chats.createdAt));
                                                                                    return formattedDate;
                                                                                })()}
                                                                            </p>
                                                                        </div>
                                                                        {chats.sender && chats.sender.image.length > 0 ? <>
                                                                            <img
                                                                                src={chats.sender.image[0].url}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></> : <>
                                                                            <img
                                                                                src={DefaultProfile}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></>}
                                                                    </div></>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                    <div className="text-muted input-side">
                                                        {getData && getData ? (
                                                            getData[getIndex].userId._id === personID ? (
                                                                <>
                                                                    {getData[getIndex].userId.image.length > 0 ? (
                                                                        <img
                                                                            src={getData[getIndex].userId.image[0].url}
                                                                            alt="avatar 3"
                                                                            style={{ width: "40px", height: "100%" }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={DefaultProfile}
                                                                            alt="avatar 3"
                                                                            style={{ width: "40px", height: "100%" }}
                                                                        />
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {getData[getIndex].reqUserID.image.length > 0 ? (
                                                                        <img
                                                                            src={getData[getIndex].reqUserID.image[0].url}
                                                                            alt="avatar 3"
                                                                            style={{ width: "40px", height: "100%" }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={DefaultProfile}
                                                                            alt="avatar 3"
                                                                            style={{ width: "40px", height: "100%" }}
                                                                        />
                                                                    )}
                                                                </>
                                                            )
                                                        ) : (
                                                            <>
                                                                {getData[getIndex].userId._id === personID ? (
                                                                    <img
                                                                        src={DefaultProfile}
                                                                        alt="avatar 3"
                                                                        style={{ width: "40px", height: "100%" }}
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={getData[getIndex].reqUserID.image[0].url}
                                                                        alt="avatar 3"
                                                                        style={{ width: "40px", height: "100%" }}
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            id="exampleFormControlInput2"
                                                            placeholder="Type message"
                                                            value={newMessage}
                                                            onChange={e => setNewMessage(e.target.value)}
                                                        />
                                                        {newMessage !== '' ? (
                                                            <a className="ms-3 messanagerSendButton" onClick={e => getMessage(personID!, newMessage, getData && getData[getIndex]._id)}>
                                                                <AiOutlineSend size={30} />
                                                            </a>
                                                        ) : (
                                                            <Play handleRecordedBlob={handleRecordedBlob(personID!, getData && getData[getIndex]._id)} />
                                                        )}
                                                    </div>

                                                </div>
                                            </Grid.Col>

                                        </> : <>
                                            <Grid.Col md={6} lg={7} xl={8} >
                                                <Grid>
                                                    <Grid.Col md={12} lg={12} xl={12} className="headerMessanger">
                                                        <div className="messangerHeader">
                                                            {getData && getData ? (
                                                                <>
                                                                    {getData[getIndex].userId._id == personID ? (
                                                                        <>
                                                                            {getData[getIndex].reqUserID.image.length > 0 ? (
                                                                                <img
                                                                                    src={getData[getIndex].reqUserID.image[0].url}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={DefaultProfile}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {getData[getIndex].userId.image.length > 0 ? (
                                                                                <img
                                                                                    src={getData[getIndex].userId.image[0].url}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={DefaultProfile}
                                                                                    alt="avatar 3"
                                                                                    style={{ width: "40px", height: "100%" }}
                                                                                />
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <img
                                                                    src={DefaultProfile}
                                                                    alt="avatar 3"
                                                                    style={{ width: "40px", height: "100%" }}
                                                                />
                                                            )}


                                                            {/* <Text className="headerUserName">{getData && getData[getIndex].reqUserID.fullName}</Text> */}
                                                            {/* <Text className="headerUserName">lol</Text> */}
                                                            {getData && getData[getIndex].userId._id === personID ? <Text className="headerUserName">{getData[getIndex].reqUserID.fullName}</Text> : <Text className="headerUserName">{getData[getIndex].userId.fullName}</Text>}
                                                        </div>
                                                    </Grid.Col>
                                                </Grid>
                                                <div className="chat-side">
                                                    <ScrollArea
                                                        style={{ position: "relative", height: "400px" }}
                                                        className="pt-3 pe-3"
                                                    >
                                                        <div className="mb-5" >
                                                            {getData && getData[getIndex].chat?.map((chats: any, index: any) => (
                                                                // <div>{chats.sender._id}</div>
                                                                chats.sender._id === personID ? <>
                                                                    <div className="d-flex flex-row justify-content-start" ref={scrollRef} key={index}>
                                                                        {chats.sender && chats.sender.image.length > 0 ? <>
                                                                            <img
                                                                                src={chats.sender.image[0].url}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></> : <>
                                                                            <img
                                                                                src={DefaultProfile}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></>}
                                                                        <div>
                                                                            <p
                                                                                className="small p-2 ms-3 mb-1 rounded-3"
                                                                                style={{ backgroundColor: "#f5f6f7" }}
                                                                            >
                                                                                {chats.text ? <>{chats.text}</> : <><audio controls src={chats.voiceUrl} className="audioPlayer" /></>}
                                                                            </p>
                                                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                                                {(() => {
                                                                                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                                                                                        day: '2-digit',
                                                                                        month: 'short',
                                                                                        year: 'numeric',
                                                                                        hour: 'numeric',
                                                                                        minute: 'numeric',
                                                                                        second: 'numeric',
                                                                                        hour12: true
                                                                                    }).format(new Date(chats.createdAt));
                                                                                    return formattedDate;
                                                                                })()}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </> : <>
                                                                    <div className="d-flex flex-row justify-content-end">
                                                                        <div>
                                                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-color">
                                                                                {chats.text ? <>{chats.text}</> : <><audio controls src={chats.voiceUrl} className="audioPlayer" /></>}
                                                                            </p>
                                                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                                                {(() => {
                                                                                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                                                                                        day: '2-digit',
                                                                                        month: 'short',
                                                                                        year: 'numeric',
                                                                                        hour: 'numeric',
                                                                                        minute: 'numeric',
                                                                                        second: 'numeric',
                                                                                        hour12: true
                                                                                    }).format(new Date(chats.createdAt));
                                                                                    return formattedDate;
                                                                                })()}
                                                                            </p>
                                                                        </div>
                                                                        {chats.sender && chats.sender.image.length > 0 ? <>
                                                                            <img
                                                                                src={chats.sender.image[0].url}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></> : <>
                                                                            <img
                                                                                src={DefaultProfile}
                                                                                alt="avatar 1"
                                                                                style={{ width: "45px", height: "100%" }}
                                                                            /></>}
                                                                    </div>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                    <div className="text-muted input-side">
                                                        {getData && getData[getIndex].userId._id === personID ? <>
                                                            {getData && getData.length > 0 ? <>
                                                                <img
                                                                    src={getData && getData[getIndex].userId.image[0].url}
                                                                    alt="avatar 3"
                                                                    style={{ width: "40px", height: "100%" }}
                                                                /></> : <>
                                                                <img
                                                                    src={DefaultProfile}
                                                                    alt="avatar 3"
                                                                    style={{ width: "40px", height: "100%" }}
                                                                /></>}
                                                        </> : <>
                                                            {getData && getData.length > 0 && <>
                                                                {getData[getIndex].reqUserID.image && getData[getIndex].reqUserID.image.length > 0 ? <>
                                                                    <img
                                                                        src={getData && getData[getIndex].reqUserID.image[0].url}
                                                                        alt="avatar 3"
                                                                        style={{ width: "40px", height: "100%" }}
                                                                    />
                                                                </> : <>
                                                                    <img
                                                                        src={DefaultProfile}
                                                                        alt="avatar 3"
                                                                        style={{ width: "40px", height: "100%" }}
                                                                    />
                                                                </>}
                                                            </>
                                                            }</>}
                                                        <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2" placeholder="Type message" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                                                        {newMessage != '' ? <>
                                                            <a className="ms-3 messanagerSendButton" onClick={e => getMessage(personID!, newMessage, getData && getData[getIndex]._id)}>
                                                                <AiOutlineSend size={30} />
                                                            </a></> : <>
                                                            <Play handleRecordedBlob={handleRecordedBlob(personID!, getData && getData[getIndex]._id)} /></>}
                                                    </div>
                                                </div>
                                            </Grid.Col>

                                        </>}
                                    </>

                                )}

                            </Grid>
                        </Card.Section>
                    </Card>
                </Grid.Col>
            </Grid >
            <Footer data={data} />
        </Container >
    );
}