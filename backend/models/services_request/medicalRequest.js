const mongoose = require('mongoose')
const medicalRequest = mongoose.Schema(
    {
        medID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Medical"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Registration"
        },
        reqUserID:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Registration"
        },
        name:{
            type:String,
            required:[true,"Please Enter Name"]
        },
        gender:{
            type:String,
            required:[true,"Please Enter Gender"]
        },
        phone:{
            type:Number,
            required:[true,"Please Enter Phone Number"]
        },
        email:{
            type:String,
            required:[true,"Please Enter Email"]
        }
    }
)
module.exports=mongoose.model("medicalRequest",medicalRequest);