const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DonationModelReq = new Schema({
    donationPostId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Donation'
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
        type:String
    },
    gender:{type:String},
    phone:{type:String},
    email:{type:String},
})
module.exports=mongoose.model('DonationModelReq',DonationModelReq);