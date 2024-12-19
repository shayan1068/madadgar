const Education = require("./../models/services/education");
const Medical = require ("./../models/services/medical");
const Donation = require("./../models/Donation/donationModel");
const Job = require("./../models/services/job");
const catchAsyncErrors= require("./../middleware/catchAsyncErrors");

exports.DetailGain = catchAsyncErrors(
    async (req, res, next) => {
        const { serviceId } = req.params;
        try{
            const checkJob = await Job.findById(serviceId).select("title email phone city location description");
            if(checkJob){
                return res.status(200).json(checkJob);
            }
            const checkMedical = await Medical.findById(serviceId).select("title email phone city location description");
            if(checkMedical){
                return res.status(200).json(checkMedical);
            }
            const checkEducation = await Education.findById(serviceId).select("title email phone city location description");
            if(checkEducation){
                return res.status(200).json(checkEducation);
            }
            const checkDonation = await Donation.findById(serviceId).select("itemType email phone city location description");
            if(checkDonation){
                return res.status(200).json(checkDonation);
            }
        }catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)

exports.UpdateTheDetail = catchAsyncErrors(
    async(req,res)=>{
        const { serviceId } = req.params;
        try{
            const checkJob = await Job.findOne({serviceId});
            if(checkJob){
                checkJob.title = req.body.title;
                checkJob.email = req.body.email;
                checkJob.phone = req.body.phone;
                checkJob.city = req.body.city;
                checkJob.location = req.body.location;
                checkJob.description = req.body.description;
                console.log(req.body);
                await checkJob.save();
                return res.status(200).json("DEtails Updated Successfully");
            }
            const checkMedical = await Medical.findById(serviceId).select("title email phone city location description");
            if(checkMedical){
                checkMedical.title = req.body.title;
                checkMedical.email = req.body.email;
                checkMedical.phone = req.body.phone;
                checkMedical.city = req.body.city;
                checkMedical.location = req.body.location;
                checkMedical.description = req.body.description;
                await checkMedical.save();
                return res.status(200).json("DEtails Updated Successfully");
            }
            const checkEducation = await Education.findById(serviceId).select("title email phone city location description");
            if(checkEducation){
                checkEducation.title = req.body.title;
                checkEducation.email = req.body.email;
                checkEducation.phone = req.body.phone;
                checkEducation.city = req.body.city;
                checkEducation.location = req.body.location;
                checkEducation.description = req.body.description;
                await checkEducation.save();
                return res.status(200).json("Details Updated Successfully");
            }
            res.status(400).json({
                success: false,
                message: "No service found with the provided ID",
              });
        }catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)