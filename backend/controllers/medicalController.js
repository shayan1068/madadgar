require('dotenv').config();
const Medical = require('./../models/services/medical');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const medicalRequest = require("../models/services_request/medicalRequest")
const Registration = require("./../models/Registration");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
exports.postMedicalReport = catchAsyncErrors(
    async(req, res, next) => {
        try{
             const checkuser = await Registration.findById(req.params.userId);
            if (!checkuser) {
                res.status(400).send("User not found");
            }
            const folderName = checkuser.userName.replace(/\s+/g, "-").toLowerCase();
            const finalName = path.join(__dirname, "..", "images", "medicalReports",folderName);
            if (!fs.existsSync(finalName)) {
                fs.mkdirSync(finalName, { recursive: true })
            }
            const storage = multer.diskStorage({
                destination: finalName,
                filename: function (req, file, cb) {
                    cb(null, Date.now() + "-" + file.originalname);
                },
            });
            const files = [];
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
            for (const file of req.files) {
                files.push({ url: `${baseUrl}/images/medicalReports/${folderName}/${file.filename}` });
            }
            const postingReport = Medical.create({
                userId: req.body.userId,
                title: req.body.title,
                patientName: req.body.patientName,
                patientAge: req.body.patientAge,
                dateWhenDiagnose:req.body.dateWhenDiagnose,
                gender:req.body.gender,
                medicalCondition:req.body.medicalCondition,
                needOfOperation:req.body.needOfOperation,
                email:req.body.email,
                phone:req.body.phone,
                location:req.body.location,
                city:req.body.city,
                description: req.body.description,
                image:files
            });
            res.status(200).send({
                success: true,
                message:"medical report uploaded successfully"
            })

        }catch(err){
            res.status(404).send({
                success: false,
                message: err.message
            })
        }
    }
)

exports.medicalReports=catchAsyncErrors(
    async (req, res, next) => {
        try {
            const fetchAllReposts = await Medical.find({ userId: { $ne: req.params.id } }).populate({ path: "userId", select: "_id" });
            if (fetchAllReposts.length === 0) {
                return res.status(200).json({ userId: req.params.id });
            }
            res.status(200).json(fetchAllReposts)
        }catch(err){
            res.status(400).json({message: err.message})
        }
    }
)

exports.medicalRequest = catchAsyncErrors(
    async(req, res, next) =>{
        try {
            const { medID, userId,reqUserID } = req.body;
            const existingRequest = await medicalRequest.find({ medID, userId });
            let documentExists = false;
            existingRequest.forEach((doc) => {
                if (doc.reqUserID.toString() === reqUserID) {
                    documentExists = true;
                }
            });
            if (documentExists) {
                return res.status(400).json({ message: 'Request already sent' });
            }else{
                const educationRequestPost = await medicalRequest.create(req.body);
                res.status(200).json("Request submitted successfully");
            }
           
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
)


exports.medRequestTouser= catchAsyncErrors(
    async(req , res, next)=>{
     const{userId} = req.params;
         try{
             const toUser = await medicalRequest.find({userId: userId}).select({name:0,gender:0,phone:0,email:0}).populate({
                 path: "reqUserID",
                 select:"fullName userName image _id"
             }).populate({
                 path: "medID",
                 select:"title _id"
             })
             if(toUser.length ==0 ){
                 return res.status(200).json("there is no job requests");
             }
             res.status(200).json({
                 requests: toUser
             })
         }catch(err){
             res.status(400).json({
                 success: false,
                 message: err.message
             })
         }   
    }
 )


 exports.deleteMedRequest=catchAsyncErrors(
    async function(req, res, next){
        try{
            const findJobRequestId = await medicalRequest.findById(req.params.id);
            if(!findJobRequestId){
                res.status(400).json({message:"there not such a request"})
            }
            await findJobRequestId.remove()
        }catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)
exports.fetchDataFromRequestMedical = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const fetchEducationRequest = await medicalRequest.find().select("educationPostId userId reqUserID");
            res.status(200).json(fetchEducationRequest);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
)
exports.deleteMedicalPost = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const job = await Medical.findById(req.params.medicalpost);
            if (!job) {
                return next(new ErrorHandler("Job post not found.", 404));
            }

            const userId = req.params.userId;
            if (job.userId.toString() !== userId) {
                return next(new ErrorHandler("You are not authorized to delete this post.", 403));
            }

            const imageUrls = job.image.map(image => image.url);

            // Delete the job post and its images from the database
            await job.remove();

            // Delete the job post images from the server
            for (const imageUrl of imageUrls) {
                const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
                const imagePath = imageUrl.replace(baseUrl, '');
                fs.unlinkSync(path.join(__dirname, '..', imagePath));
            }

            res.status(200).json({
                success: true,
                message: "Job post deleted successfully."
            });
        } catch (err) {
            next(err);
        }
    }
);