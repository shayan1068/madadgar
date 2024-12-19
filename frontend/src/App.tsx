import React, { useEffect, useState } from 'react';
import './App.css';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {  Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/pages/login.jsx";
import Registration from "./components/pages/registration";
import Home from "./webpages/index";
import NotFound from "./components/NotFound"; 
import Job from "./webpages/job/job";
import Postajob from "./webpages/job/postajob";
import Findajob from "./webpages/job/findajob";
import Profile from "./webpages/profile/profile";
import Health from "./webpages/health/health";
import MedicalReport from './webpages/health/medicalReport';
import Findamedicalreport from "./webpages/health/findamedicalreport";
import Education from "./webpages/education/education";
import Helpstudent from "./webpages/education/helpstudent";
import NeedEducation from './webpages/education/needEducation';
import Request from "./webpages/request/request";
import EditProfile from "./webpages/profile/editProfile/editProfile";
import Messanger from "./webpages/messanger/message";
import CreatMessanger from "./webpages/messanger/messangerComponents/chatdbCreate";
import CreateMessangerFromMedicalConversation from "./webpages/messanger/messangerComponents/chatdbCreateMedical";
import EditDetail from "./webpages/profile/EditPostDetail";
import Donation from "./webpages/Donation/Donation";
import Reset from "./components/pages/resetpassword/reset";
import BOD from "./components/pages/resetpassword/validBirthdate";
import ResetPassPage from './components/pages/resetpassword/resetPasswordPage';
import DonateItems from './webpages/Donation/componentsDonation/DonateItems';
import NeedDonation from './webpages/Donation/componentsDonation/NeedDonation';
function App() {
  const token = sessionStorage.getItem('token');
  return (
    <div>
      {token?<Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<NotFound />} />
          <Route path="/job" element={<Job />}></Route>
          <Route path="/poj" element={<Postajob />}></Route>
          <Route path="/foj" element={<Findajob />}></Route>
          <Route path="/health" element={<Health />}></Route>
          <Route path="/medicalReport" element={<MedicalReport />}></Route>
          <Route path="/findmedicalreport" element={<Findamedicalreport />}></Route>
          <Route path="/education" element={<Education />}></Route>
          <Route path="/helpstudent" element={<Helpstudent />}></Route>
          <Route path="/needEducation" element={<NeedEducation />}></Route>
          <Route path="/request" element={<Request />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path="/messanger" element={<Messanger />} />
          <Route path="/messangerCreate" element={<CreatMessanger />} />
          <Route path="/messangerCreateMedical" element={<CreateMessangerFromMedicalConversation />} />
          <Route path="/EditDetail" element={<EditDetail />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/donationItem" element={<DonateItems />} />
          <Route path="/needDonation" element={<NeedDonation />} />
      </Routes>:<Routes></Routes>}
        <Routes>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/resetPassword" element={<Reset />} />
          <Route path="/birthdayCheck/:userName" element={<BOD />} />
          <Route path="/resetPasswordPage/:userName" element={<ResetPassPage/>} />
        </Routes>
      
    </div>
  );
}

export default App;
