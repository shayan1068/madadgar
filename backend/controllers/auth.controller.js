require('dotenv').config();
const mongoose = require('mongoose');
const config = require('../config/auth.config');
const Registration = require('../models/Registration');
var bcrypt = require("bcryptjs");
exports.signup = async (req, res, next) => {
    try {
        const files = [];
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Fallback for local development

        // Collect uploaded files and construct URLs
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                files.push({ url: `${baseUrl}/images/profile/${file.filename}` });
            }
        }

        const registrationDate = new Date(); // Get the current date and time

        // Create the new user
        const newUser = await Registration.create({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8), // Hash password securely
            work: req.body.work,
            financial: req.body.financial,
            birthday: {
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
            },
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
            occupation: req.body.occupation,
            qualification: req.body.occupation, // Typo: Check if this is intentional
            image: files,
            registrationDate: registrationDate,
        });

        // Respond with success
        res.status(201).send({
            success: true,
            status: "success",
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                email: newUser.email,
            },
        });
    } catch (e) {
        console.error("Error during user registration:", e);

        // Handle duplicate key errors (e.g., unique constraint violations)
        if (e.code === 11000) {
            const field = Object.keys(e.keyPattern)[0]; // Get the duplicate field (e.g., email or username)
            return res.status(409).send({
                success: false,
                status: "duplicate_error",
                message: `The ${field} is already in use. Please choose another.`,
            });
        }

        // Generic error response
        res.status(500).send({
            success: false,
            status: "error",
            message: "An unexpected error occurred during registration. Please try again later.",
        });
    }
};



exports.updateDetials= async(req, res, next) => {
    const userId = req.params.userId;
    const dataToUpdate = req.body;
    try{
        const files = [];
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Fallback for local development
        if (req.files) {
            for (const file of req.files) {
                files.push({ url: `${baseUrl}/images/profile/${file.filename}` });
            }
          }
        const user = await Registration.findById(userId);
        if(!user){
            res.status(400).json("userId not found");
        }
        const updateUser = await Registration.findByIdAndUpdate({_id:userId},
            {
                $set:{
                    fullName: dataToUpdate.fullName || user.fullName,
                    userName: dataToUpdate.userName || user.userName,
                    email: dataToUpdate.email || user.email,
                    work: dataToUpdate.work || user.work,
                    financial: dataToUpdate.financial || user.financial,
                    gender: dataToUpdate.gender || user.gender,
                    phone: dataToUpdate.phone || user.phone,
                    address: dataToUpdate.address || user.address,
                    occupation: dataToUpdate.occupation || user.occupation,
                    qualification: dataToUpdate.qualification || user.qualification,
                    image: files.length > 0 ? files : user.image,
                }
                
            })
            
            res.status(200).json("Details updated suucessfully");
    }catch(err){
        res.status(400).send(err.message);
    }
}

exports.deleteProfile = async(req, res ,next)=>{
    const userId = req.params.userId;
    try{
        const user = await Registration.findById(userId);
        if(!user){
            res.status(400).json("userId not found");
        }
        user.image=[];
        await user.save();
        res.status(200).json("profile Deleted Successfully");
    }catch(err){
        res.status(400).send(err.message);
    }
}