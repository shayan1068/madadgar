require('dotenv').config();
const donationModel = require('./../models/Donation/donationModel');
const catchAsyncError = require('./../middleware/catchAsyncErrors');
const Registration = require('./../models/Registration');
const DonationReqModel = require('./../models/Donation/donationRequestModel');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
exports.CreateDonationPost=catchAsyncError(
    async(req, res, next) => {
        try{
             const checkuser = await Registration.findById(req.params.userId);
            if (!checkuser) {
                res.status(400).send("User not found");
            }
            const folderName = checkuser.userName.replace(/\s+/g, "-").toLowerCase();
            const finalName = path.join(__dirname, "..", "images", "donationImages",folderName);
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
                files.push({ url: `${baseUrl}/images/donationImages/${folderName}/${file.filename}` });
            }
            const donationItems = donationModel.create({
                userId: req.body.userId,
                itemType:req.body.itemType,
                size:req.body.size,
                gender:req.body.gender,
                email:req.body.email,
                phone:req.body.phone,
                location:req.body.location,
                city:req.body.city,
                description: req.body.description,
                image:files
            });
            res.status(200).send({
                success: true,
                message:"DonationItems Submitted successfully"
            })

        }catch(err){
            res.status(404).send({
                success: false,
                message: err.message
            })
        }
    }
)

exports.donationPost=catchAsyncError(
    async (req, res, next) => {
        try {
            const fetchAllReposts = await donationModel.find({ userId: { $ne: req.params.id } }).populate({ path: "userId", select: "_id" });
            if (fetchAllReposts.length === 0) {
                return res.status(200).json({ userId: req.params.id });
            }
            res.status(200).json(fetchAllReposts)
        }catch(err){
            res.status(400).json({message: err.message})
        }
    }
)
exports.createDonationRequest = catchAsyncError(async (req, res, next) => {
    try {
        const { donationPostId, userId,reqUserID } = req.body;
        console.log(donationPostId+" "+userId+" "+ reqUserID);
        const existingRequest = await DonationReqModel.find({ donationPostId, userId });
        let documentExists = false;
        existingRequest.forEach((doc) => {
            if (doc.reqUserID.toString() === reqUserID) {
                documentExists = true;
            }
        });
        if (documentExists) {
            return res.status(400).json({ message: 'Request already sent' });
        }else{
            const educationRequestPost = await DonationReqModel.create(req.body);
            res.status(200).json("Request submitted successfully");
        }
       
    } catch (err) {
        res.status(400).send(err.message);
    }
});
exports.fetchRequestOFDonation = catchAsyncError(
    async (req, res, next) => {
        try {
            const fetchEducationRequest = await DonationReqModel.find({ userId: req.params.userId }).populate({
                path: "userId",
                select: "fullName"
            }).populate({
                path: "reqUserID",
                select: "_id fullName userName image"
            }).populate({
                path: "donationPostId",
                select: "_id itemType"
            })
            res.status(200).json(fetchEducationRequest);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
)