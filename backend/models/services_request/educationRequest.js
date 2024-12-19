const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const educationRequest = new Schema({
    educationPostId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Education'
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
module.exports=mongoose.model('educationRequest',educationRequest);