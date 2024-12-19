const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    fullName: { type: String, required: [true, "Enter Your name"], trim: true },

    userName: { type: String, required: [true, "Enter Your user name"],unique: true, trim: true},

    email: {
        type: String,
        // maxlength: [8, 'Price cannot exceeds 8 character']
        required: [true,"Enter Your email address"],
        unique: true, 
        trim: true
    },
    password: {
        type: String,
        required: [true, "Enter your password"]

    },
    work:{
        type: String,
    },
    financial:{
        type: String,
    },
    birthday:[
        {
            day:{
                type:String,
            },
            month:{
                type:String,
            },
            year:{
                type:String,
            }
        }
    ],
    gender:{
        type:String,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    occupation:{
        type:String,
    },
    qualification:{
        type:String,
    },
    image: [
        {
            url: {
                type: String,

            }
        }
    ],
    data:{
        type:Date,
        default:Date.now
    }

    
});

module.exports = mongoose.model("Registration", userSchema)