import React, { useEffect, useState } from 'react'
import Header from './../../components/includes/header';
import Footer from './../../components/includes/footer';
import { links, data } from './../../components/includes/commons';
import { Container, Tabs, Text } from "@mantine/core";
import {deleteUserPostedPost} from "./profile-db";
import { FaEye, FaUser } from 'react-icons/fa';
import DefaultImg from "./../../images/default.svg";
import "./../../css/style.css";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
function Profile() {
  const [userData, setData] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [getCount,setCount] = useState<any>(0);
  const userId = sessionStorage.getItem('user');
  const fetchUserInfo = async () => {
    const response = await fetch(`https://madadgar.onrender.com/api/user/${userId}`);
    const data = await response.json();
    setData(data);
  }
  const fetchTotalPost = async () => {
    const response = await fetch(`https://madadgar.onrender.com/api/post/${userId}`, {
      method: 'GET',
    });
    const data = await response.json();
    setPost(data);
  }
  const handleDeletePost= async(id:string)=>{
    await deleteUserPostedPost(id,userId!).then((response)=>{
      swal(response.message,{
        buttons:{},
        icon:"success",
        timer:3000,
      }).then(e=>setCount(getCount+1));
    })
  }
  useEffect(() => {
    fetchUserInfo();
    fetchTotalPost();
  }, [getCount])
  return (
    <>
      <Header links={links} />
      <Container fluid>
        {userData && <div className="row img-side">
          <div className="col-lg-6 col-md-12 col-sm-12 col-img">
            {userData.user.image.length > 0 ? <img src={userData.user.image[0].url} alt="profile image" className="img img-fluid img-set" /> : <img src={DefaultImg} alt="profile image" className="img img-fluid img-set w-50" />}
            <div className="workstyle fs-5">WORK</div>
            <table className="table mt-2 w-75">
              <tbody>
                <tr>
                  <td scope="row"></td>
                  <td>Work</td>
                  {userData.user.work ? <td>{userData.user.work}</td> : <td>Null</td>}
                </tr>
                <tr>
                  <td scope="row"></td>
                  <td>Financial</td>
                  {userData.user.financial ? <td>{userData.user.financial}</td> : <td>Null</td>}
                </tr>
              </tbody>
            </table>
            <div className="workstyle fs-5">Basic Information</div>
            <table className="table mt-2 w-75">
              <tbody>
                <tr>
                  <td scope="row"></td>
                  <td>Birthday</td>
                  {userData.user.birthday < 0 ? <td>{userData.user.birthday[0].day}/{userData.user.birthday[0].month}/{userData.user.birthday[0].year}</td> : <><td>dd/mm/yy</td></>}
                </tr>
                <tr>
                  <td scope="row"></td>
                  <td>Gender</td>
                  {userData.user.gender ? <td>{userData.user.gender}</td> : <td>Null</td>}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 user-details">

            <p className="username">{userData.user.fullName}</p>
            <p>RATING</p>
            <span className="fs-4 fw-bold">5.0</span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <p className="reportuser">@{userData.user.userName}</p>
            <Tabs defaultValue="About">
              <Tabs.List>
                <Tabs.Tab value="Timeline" ><FaEye /> Post</Tabs.Tab>
                <Tabs.Tab value="About"><FaUser /> About</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="Timeline" pt="xs">
                <Text className="about-heading">Total Post</Text>
                <table className="table mt-2">
                  <thead>
                    <th>Title</th>
                    <th>Discription</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {post ? <>
                      {post.posts?.map((getPostDetails: any, index: any) => (
                        <tr key={index}>
                          {getPostDetails.title ? <td>{getPostDetails.title}</td>: <td>{getPostDetails.itemType}</td>}
                          <td>{getPostDetails.description}</td>
                          <td><Link to={`/EditDetail?id=${getPostDetails._id}`}><button className="btn btn-success">Edit</button></Link></td>
                          <td><button className="btn btn-danger" onClick={e=>handleDeletePost(getPostDetails._id)}>Delete</button></td>
                        </tr>
                      ))}
                    </> : <tr></tr>}
                  </tbody>
                </table>
              </Tabs.Panel>

              <Tabs.Panel value="About" pt="xs">
                <Text className="about-heading">Contact Information</Text>
                <table className="table mt-2">
                  <tbody>
                    <tr>
                      <td scope="row"></td>
                      <td>phone:</td>
                      {userData.user.phone ? <td>{userData.user.phone}</td> : <td>Null</td>}
                    </tr>
                    <tr>
                      <td scope="row"></td>
                      <td>Address</td>
                      {userData.user.address ? <td>{userData.user.address}</td> : <td>Null</td>}
                    </tr>
                    <tr>
                      <td scope="row"></td>
                      <td>Email</td>
                      <td>{userData.user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
        }
      </Container>
      <Footer data={data} />
    </>
  )
}


export default Profile