const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Registration" 
    },
    title:{
        type:String,
        required:true,
    },
    requiredAge:{
        from:{
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        }
    },
    requiredQualition:{
        type:String,
        required:[true,"Please select qualification"]
    },
    requiredExperience:{
        type:String,
        required:[true,"please Select experience"]
    },
    gender:{
        type:String,
        required:[true,"must select gender"]
    },
    skills:{
        type:String,
        required:true
    },
    Cv:{
        type:String,
        required:true
    },
    workType:{
        type:String,
        required:[true,"please select work type"]
    },
    requiredFor:{
        type:String,
        required:[true,"Required for what purpose"]
    },
    location:{
        type:String,
        required:[true,"Please select location"]
    },
    city:{
        type:String,
        required:[true,"Please select city"]
    },
    timeNeeded:{
        type:String,
        required:[true,"Please Select how many hour work"]
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
        required:[true,"Please Enter your phone number"]
    },
    description:{
        type:String,
        required:[true,"Please Enter description"]
    },
    image:[{
        url:{
            type:String,
            required:true
        }
    }]
})
module.exports=mongoose.model('Job',jobSchema);