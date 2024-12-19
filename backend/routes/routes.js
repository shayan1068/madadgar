const express = require('express');
const Registration = require('../models/Registration');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require("./../config/auth.config")
require('dotenv').config();
const { uploadJob,fetchJob,jobRequest,fetchJobRequest,profileCreate,userData,jobRequestTouser,deleteJobRequest,deleteJob} = require('../controllers/superController');
const {postMedicalReport,medicalReports,medicalRequest,medRequestTouser,deleteMedRequest,fetchDataFromRequestMedical,deleteMedicalPost} = require('../controllers/medicalController')
const { signup,updateDetials,deleteProfile } = require('./../controllers/auth.controller')
const {createEducation,fetchEducationPost,createEducationRequest,fetchRequestOFEducation,fetchDataFromRequest} = require("./../controllers/educationController");
const {deleteUserPost} = require("./../controllers/deletePostController");
const {totalPostByUser} = require("./../controllers/totalPostUserController");
const  checkUnique  = require("./../middleware/checkUniqueEntry")
const multer = require("./../middleware/multer");
const medicalMulter = require("./../middleware/medicalImages");
const jobMulter = require("./../middleware/jobImages");
const jobRequestMulter = require("./../middleware/jobRequestImage");
const Education = require('./../middleware/eduactionimages');
const {createMessagesSpace,checkTheUser,chatting,getChatting,checkTheUserMedical,getIDsFromMessagerDB} = require("./../controllers/messangerController");
const {storeRecording} = require("./../controllers/voiceRecordController");
const {DetailGain,UpdateTheDetail} = require('./../controllers/editPostController');
const {getUserName,getBirthday,changePassword} = require('./../controllers/restpassword');
const {CreateDonationPost,donationPost,createDonationRequest,fetchRequestOFDonation} = require('./../controllers/donationController');
// const {uploadImages} = require("./../controllers/uploadjobimages")
const voiceRecord = require("./../middleware/voiceRecord");
const DonationMulter = require('./../middleware/donationImages');
const router = express.Router();

router.post("/auth/signup",multer.array("image"),checkUnique ,signup);
router.post('/auth/signin', async (req, res) => {
  // Read username and password from request body
  const { userName, password  } = req.body;
  const user = await Registration.findOne({
      userName: userName,
  })
  if (!user) {
    return res.status(404).send({ message: "invalid user" })
  }

  const isMatch = await bcrypt.compare(password, user.password);
 
  if (!isMatch) {
    return res.status(404).send({message:"password does not matched"})
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token: token, user: user._id ,userName:user.fullName});
});
// router.route('/job/upload').post(uploadJob);
router.post("/updateDetail/:userId",multer.array('image'),updateDetials)
router.post('/job/upload/:userId',jobMulter.array("image") ,uploadJob);
router.post('/jobRequest/send/:userId/:jobId/:newUserId',jobRequestMulter.array("image") ,jobRequest);
router.route('/job/fetch/:id').get(fetchJob);
router.route('/job/fetchreq').get(fetchJobRequest);
router.route("/createProfile").post(profileCreate);
router.route("/user/:id").get(userData);
router.route("/jobRequestToUser/:userId").post(jobRequestTouser);
router.route("/post/:userId").get(totalPostByUser);
router.route("/delete/jobRequest/:id").delete(deleteJobRequest);
router.post("/medical/upload/:userId",medicalMulter.array('image'),postMedicalReport);
router.route("/medical/fetchAll/:id").get(medicalReports);
router.route("/medicalRequest/upload").post(medicalRequest);
router.route("/medRequestTouser/:userId").post(medRequestTouser);
router.route("/delete/medRequest/:id").delete(deleteMedRequest);
router.get("/detele/profile/user/:userId",deleteProfile);
router.get("/delete/jobPost/:jobId/user/:userId",deleteJob);
router.post("/file/uploadfileEducation/:userId",Education.array('image') ,createEducation);
router.get("/getAllPost/education/user/:id",fetchEducationPost);
router.post("/post/requestbyuser/education",createEducationRequest);
router.get("/fetch/request/education/admin/:userId",fetchRequestOFEducation);
router.post("/messanger/messanges",createMessagesSpace);
router.get("/getIDs/messanger/data",getIDsFromMessagerDB);
router.get("/delete/medicalPost/:medicalpost/user/:userId",deleteMedicalPost);
router.get("/detete/userPost/:serviceId/user/:userId",deleteUserPost);
// router.get("/messanger/eduId/:eduId/user/:userId/reqUser/:reqUserID",showMessagesToBothUser);
router.get("/getData/From/ReqUser",fetchDataFromRequest);
router.get("/getDataMedical/From/ReqUser",fetchDataFromRequestMedical)
router.get("/messanger/getData/person/:personId",checkTheUser);
router.get("/messanger/getData/medID/:medID/person/:personId",checkTheUserMedical);
router.post("/chat/messangerSchemaId/:messangeID",chatting);
router.get("/getChatting/eduactionId/:eduId",getChatting);
router.post("/chat/messangerSchemaId/voice/:messangeID/user/:senderId",voiceRecord.single('recording'),storeRecording);
router.get("/edit/post/serviceId/:serviceId",DetailGain);
router.post("/update/detail/post/serviceId/:serviceId",UpdateTheDetail);
router.post("/auth/resetPassword/username",getUserName);
router.post("/user/userBirthdaycheck/restpassword",getBirthday);
router.post('/resetpassword/page/reset',changePassword);
router.post('/doation/donationItems/userId/:userId',DonationMulter.array('image'),CreateDonationPost);
router.get('/donation/getDonationPost/:id',donationPost);
router.post('/request/donation',createDonationRequest);
router.get("/get/request/donation/:userId",fetchRequestOFDonation);
// router.post("/messanger/messanges/medical",createMessagesSpaceForMedical);
// router.get("/messanger/medID/:medID/user/:userId/reqUser/:reqUserID",showMessagesToBothUserMedical)
module.exports = router;