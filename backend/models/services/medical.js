const mongoose = require('mongoose');
const medical = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Registration" 
    },
    title:{
        type:String,
        required:[true,"Please Enter title"]
    },
    patientName:{
        type:String,
        required:[true,"Please Enter Patient Name"]
    },
    patientAge:{
        type:Number,
        required:[true,"Please Enter Patient Age"]
    },
    dateWhenDiagnose:{
        type:String,
        required:[true,"Please Enter Date"]
    },
    gender:{
        type:String,
        required:[true,"Please Enter Gender"]
    },
    medicalCondition:{
        type:String,
        required:[true,"Please Enter Condition"]
    },
    needOfOperation:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"]
    },
    phone:{
        type:Number,
        required:[true,"Please Enter Phone Number"]
    },
    location:{
        type:String,
        required:[true,"Please Enter Location"]
    },
    city:{
        type:String,
        required:[true,"Please Enter Location"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Description"]
    },
    image:[
        {
            url:{
                type:String,
            }
        }
    ]
})
module.exports=mongoose.model("Medical",medical)