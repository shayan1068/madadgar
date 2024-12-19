require('dotenv').config();
const Education = require("./../models/services/education");
const catchAsyncErrors = require("./../middleware/catchAsyncErrors");
const Registration = require("./../models/Registration");
const educationRequest = require("./../models/services_request/educationRequest");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
exports.createEducation = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const checkuser = await Registration.findById(req.params.userId);
            if (!checkuser) {
                res.status(400).send("User not found");
            }
            const folderName = checkuser.userName.replace(/\s+/g, "-").toLowerCase();
            const finalName = path.join(__dirname, "..", "images", folderName);
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
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Fallback for local development
            for (const file of req.files) {
                files.push({ url: `${baseUrl}/images/donationImages/${folderName}/${file.filename}` });
            }

            await Education.create({
                userId: req.params.userId,
                title: req.body.title,
                fullName: req.body.fullName,
                fatherName: req.body.fatherName,
                gender: req.body.gender,
                class: req.body.class,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                location: req.body.location,
                description: req.body.description,
                image: files
            })
            res.status(200).json("your request succefully upload");
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
)

exports.fetchEducationPost = catchAsyncErrors(
    async (req, res, next) => {
        try {
            //    first i need to check admin and don't want to show him his post
            const EducationPost = await Education.find({ userId: { $ne: req.params.id } }).populate({ path: "userId", select: "_id" });
            if (EducationPost.length === 0) {
                return res.status(200).json({ userId: req.params.id });
            }
            res.status(200).json(EducationPost);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
)

exports.createEducationRequest = catchAsyncErrors(async (req, res, next) => {
    try {
        const { educationPostId, userId,reqUserID } = req.body;
        const existingRequest = await educationRequest.find({ educationPostId, userId });
        let documentExists = false;
        existingRequest.forEach((doc) => {
            if (doc.reqUserID.toString() === reqUserID) {
                documentExists = true;
            }
        });
        if (documentExists) {
            return res.status(400).json({ message: 'Request already sent' });
        }else{
            const educationRequestPost = await educationRequest.create(req.body);
            res.status(200).json("Request submitted successfully");
        }
       
    } catch (err) {
        res.status(400).send(err.message);
    }
});
exports.fetchRequestOFEducation = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const fetchEducationRequest = await educationRequest.find({ userId: req.params.userId }).populate({
                path: "userId",
                select: "fullName"
            }).populate({
                path: "reqUserID",
                select: "_id fullName userName image"
            }).populate({
                path: "educationPostId",
                select: "_id title"
            })
            res.status(200).json(fetchEducationRequest);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
)

exports.fetchDataFromRequest = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const fetchEducationRequest = await educationRequest.find().select("educationPostId userId reqUserID");
            res.status(200).json(fetchEducationRequest);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
)