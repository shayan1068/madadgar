const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Education = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Registration" 
    },
    title:{
        type:String,
    },
    fullName: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    gender: {
        type: String,
    },
    class: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    city:{
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    image: [{
        url: {
            type: String,
        }
    }]
})
module.exports = mongoose.model("Education",Education);
