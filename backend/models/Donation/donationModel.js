const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Donation = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Registration" 
    },
    itemType:{
        type:String,
    },
    size:{
        type:String,
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    city:{
        type:String,
    },
    location:{
        type:String,
    },
    description:{
        type:String,
    },
    image:[
        {
            url:String,
        }
    ]
})
module.exports = mongoose.model('Donation',Donation);