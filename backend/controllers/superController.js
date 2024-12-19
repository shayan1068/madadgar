require('dotenv').config();
const Job = require('./../models/services/job')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const jobrequest = require("./../models/services_request/jobRequest")
const profile = require("./../models/Registration")
const Registration = require('../models/Registration');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
//post a job
exports.uploadJob = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const checkuser = await Registration.findById(req.params.userId);
            if (!checkuser) {
                res.status(400).send("User not found");
            }
            const folderName = checkuser.userName.replace(/\s+/g, "-").toLowerCase();
            const finalName = path.join(__dirname, "..", "images", "jobPost", folderName);
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
                files.push({ url: `${baseUrl}/images/jobPost/${folderName}/${file.filename}` });
            }
            const job = await Job.create(
                {
                    userId: req.body.userId,
                    title: req.body.title,
                    requiredAge: {
                        from: req.body.requiredAgeFrom,
                        to: req.body.requiredAgeTo
                    },
                    requiredQualition: req.body.requiredQualition,
                    requiredExperience: req.body.requiredExperience,
                    gender: req.body.gender,
                    skills: req.body.skills,
                    Cv: req.body.Cv,
                    workType: req.body.workType,
                    requiredFor: req.body.requiredFor,
                    location: req.body.location,
                    city:req.body.city,
                    timeNeeded: req.body.timeNeeded,
                    email: req.body.email,
                    phone: req.body.phone,
                    description: req.body.description,
                    image: files
                }
            );
            res.status(200).send({
                success: true,
                messsage: "Job uploaded successfully"
            })
        } catch (err) {
            res.status(400).send({
                success: false,
                message: err.message
            })
        }
    }
)
exports.fetchJob = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const fetchAllReposts = await Job.find({ userId: { $ne: req.params.id } }).populate({ path: "userId", select: "_id" });
            if (fetchAllReposts.length === 0) {
                return res.status(200).json({ userId: req.params.id });
            }
            res.status(200).json(fetchAllReposts)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
)

exports.jobRequest = catchAsyncErrors(
    async (req, res, next) => {
        const { userId, jobId, newUserId } = req.params;
        try {
            const checkuser = await Registration.findById(req.params.newUserId);
            if (!checkuser) {
                res.status(400).send("User not found");
            }
            const folderName = checkuser.userName.replace(/\s+/g, "-").toLowerCase();
            const finalName = path.join(__dirname, "..", "images", "jobRequest", folderName);
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
                files.push({ url: `${baseUrl}/images/jobRequest/${folderName}/${file.filename}` });
            }
            const existingRequest = await jobrequest.find({ jobId, userId });
            let status = false;
            existingRequest.forEach((doc) => {
                if (doc.newUserId.toString() == newUserId) {
                    status = true;
                }
            })
            if (status) {
                return res.status(400).json({ message: 'Request already sent' });
            } else {
                const jobRequestSent = await jobrequest.create(
                    {
                        userId: req.body.userId,
                        jobId: req.body.jobId,
                        newUserId: req.body.newUserId,
                        Age: req.body.Age,
                        qualification: req.body.qualification,
                        gender: req.body.gender,
                        skills: req.body.skills,
                        experience: req.body.skills,
                        description: req.body.description,
                        image: files
                    }
                );
                return res.status(200).send({
                    success: true,
                    messsage: "Job request send successfully",
                    jobRequestSent
                })
            }

        } catch (err) {
            res.status(400).send({
                success: false,
                message: err.message
            })
        }
    }
)
exports.jobRequestTouser = catchAsyncErrors(
    async (req, res, next) => {
        const { userId } = req.params;
        try {
            const toUser = await jobrequest.find({ userId: userId }).populate({
                path: "newUserId",
                select:"_id fullName userName image"
            }).populate({
                path: "jobId",
                select:"_id title"
            })
            if (toUser.length == 0) {
                return false;
            }
            res.status(200).json({
                requests: toUser
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)
exports.fetchJobRequest = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const fetchJobRequest = await jobrequest.find();
            res.status(200).json({
                fetchJobRequest
            })
        } catch {
            res.status(400).send({
                success: false,
                message: err.message
            })
        }
    }
)

exports.profileCreate = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const doneprofile = await profile.create(req.body)
            res.status(200).send({
                success: true,
                messsage: "profile has been generated"
            })
        } catch {
            res.status(400).send({
                success: false,
                message: err.message
            })
        }
    }
)
// fetch userData
exports.userData = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const user = await Registration.findById(req.params.id, { password: 0 });
            if (!user) {
                return next(new ErrorHandler("there is no user"));
            }
            res.status(200).json({
                success: true,
                user
            })

        } catch (err) {
            res.status(400).send({
                success: false,
                message: err.message.err
            })
        }
    }
)

exports.deleteJobRequest = catchAsyncErrors(
    async function (req, res, next) {
        try {
            const findJobRequestId = await jobrequest.findById(req.params.id);
            if (!findJobRequestId) {
                res.status(400).json({ message: "there not such a request" })
            }
            await findJobRequestId.remove()
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)

exports.deleteJob = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const job = await Job.findById(req.params.jobId);
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

