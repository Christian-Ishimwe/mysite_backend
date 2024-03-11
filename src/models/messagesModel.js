const mongoose = require("mongoose")
const Schema= mongoose.Schema
const newMessageSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    telephone: {
        type: String,
        default: null
    },
    dateSent: {
        type: Date,
        default: Date.now 
    },
    responded: {
        type: Boolean,
        default: false
    }
})


const MessageUser= mongoose.model("MessageUser", newMessageSchema)
MessageUser.deleteMany()
module.exports={MessageUser}