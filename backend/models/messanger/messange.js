const mongoose = require('mongoose')
const messageSchema =  mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
    text: { type: String},
    voiceUrl:{type:String},
    createdAt: { type: Date, default: Date.now }
});
const messangerSchema = mongoose.Schema(
    {
        eduId:[
           {
                type: mongoose.Schema.Types.ObjectId,
                ref:  "Education",
            }
        ],
        medID: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Medical",
        }],
        jobId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Job",
        }],
        donId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Donation",
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Registration",
        },
        reqUserID:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Registration",
        },
        createdMessagerData:{
            type:Date,
            default:Date.now
        },
        chat: { type: [messageSchema], default: [] }
    }
)
module.exports=mongoose.model("messangerSchema",messangerSchema);