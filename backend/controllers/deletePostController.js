require('dotenv').config();
const Education = require("./../models/services/education");
const Medical = require ("./../models/services/medical");
const Job = require("./../models/services/job");
const Donation =require("./../models/Donation/donationModel");
const catchAsyncErrors= require("./../middleware/catchAsyncErrors");
const fs = require('fs');
const path = require('path');
const ErrorHandler = require('./../utils/errorHandler');

exports.deleteUserPost = catchAsyncErrors(async (req, res, next) => {
    try {
        const { serviceId, userId } = req.params;
        console.log(serviceId);
        let serviceType;

        // Check if the service ID matches any document in Medical collection
        let service = await Medical.findById(serviceId);
        if (service) {
            if (service.userId.toString() !== userId) {
                return next(new ErrorHandler("You are not authorized to delete this post.", 403));
            }
            serviceType = 'Medical';
        }

        // If not found in Medical collection, check in Job collection
        if (!service) {
            service = await Job.findById(serviceId);
            if (service) {
                if (service.userId.toString() !== userId) {
                    return next(new ErrorHandler("You are not authorized to delete this post.", 403));
                }
                serviceType = 'Job';
            }
        }

        // If not found in Job collection, check in Education collection
        if (!service) {
            service = await Education.findById(serviceId);
            if (service) {
                if (service.userId.toString() !== userId) {
                    return next(new ErrorHandler("You are not authorized to delete this post.", 403));
                }
                serviceType = 'Donation';
            }
        }
        // If not found in Job collection, check in Education collection
        if (!service) {
            service = await Donation.findById(serviceId);
            if (service) {
                if (service.userId.toString() !== userId) {
                    return next(new ErrorHandler("You are not authorized to delete this post.", 403));
                }
                serviceType = 'Donation';
            }
        }
        // If service is still not found, return an error
        if (!service) {
            return next(new ErrorHandler("Service not found.", 404));
        }

        const imageUrls = service.image.map(image => image.url);

        // Delete the service post and its images from the database
        await service.remove();

        // Delete the service post images from the server
        for (const imageUrl of imageUrls) {
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Fallback for local development
            const imagePath = imageUrl.replace(baseUrl, '');
            fs.unlinkSync(path.join(__dirname, '..', imagePath));
        }

        res.status(200).json({
            success: true,
            message: `${serviceType} post deleted successfully.`
        });
    } catch (err) {
        next(err);
    }
});
