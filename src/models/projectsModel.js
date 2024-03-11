const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")
const Schema = mongoose.Schema
const projectSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true
    }, 
    link: {
        type: String,
        default: null
    },
    image: {
        type: String,
        required: true
    }, 
    isPublished:{
        type: Boolean,
        default: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

const Projects= mongoose.model("Projects", projectSchema)
module.exports={Projects}