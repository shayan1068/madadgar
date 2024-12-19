const Education = require("./../models/services/education");
const Medical = require ("./../models/services/medical");
const Job = require("./../models/services/job");
const Donation =require('./../models/Donation/donationModel');
const catchAsyncErrors= require("./../middleware/catchAsyncErrors");
const ErrorHandler = require('./../utils/errorHandler');
exports.totalPostByUser = catchAsyncErrors(
    async (req, res, next) => {
        const { userId } = req.params;
        try {
            const jobPosts = await Job.find({ userId: userId });
            const medicalPosts = await Medical.find({ userId: userId });
            const educationPosts = await Education.find({ userId: userId });
            const donationPosts = await Donation.find({ userId: userId })

            const allPosts = [...jobPosts, ...medicalPosts, ...educationPosts,...donationPosts];

            if (allPosts.length == 0) {
                return next(new ErrorHandler("There are no posts made by this user."));
            }

            res.status(200).json({
                posts: allPosts
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)
