const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  jobRequest = new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Job"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Registration"
    },
    newUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Registration"
    },
    Age:{
        type:String,
        required:[true,"Please enter your age"]
    },
    qualification:{
        type:String,
        required:[true,"Please enter your qulification"]
    },
    gender:{
        type:String,
        required:[true,"Please enter your gender"]
    },
    skills:{
        type:String,
    },
    description:{
        type:String,
        required:[true,"Please enter your description"]
    },
    experience:{
        type:String,
        required:[true,"Please enter your experience"]
    },
    image:[{
        url:{
            type:String,
        }
    }]
})

module.exports=mongoose.model('jobrequest',jobRequest);