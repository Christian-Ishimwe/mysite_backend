const {Projects} = require("../models/projectsModel")
const getProjects = async (req, res) =>{
    try{
        const projects = await Projects.find({isPublished:true})
        .select('title description links image languages')
        .exec()
        if(projects.length>=1){
            return res.status(200).json({
                projects
            })
        }else{
            return res.status(401).json({
                message: "No Projects Yet"
            })
        }
    }catch(err){
        console.log("Error: ", err)
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

const createProjects = async (req, res) =>{
    try {
        const {title, description, link, image, languages, isPublished=true} = req.body 
        const newProject= new Projects({
            title,
            description,
            link,
            image,
            languages,
            isPublished
        })
        await newProject.save()
        return res.status(201).json({
            message: "New Project Added",
            newProject
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const adminProjects = async (req, res) =>{
    try {
        const projects = await Projects.find()
        if(projects.length >=1){
            return res.status(200).json(projects)
        }else{
            return res.status(401).json({
                message: "No project Yet!"
            })
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const userSingleProject= async (req, res) =>{
    try {
        const {id} = req.params
        const project = await Projects.findById(id)
        .select('title description image links language')
        .exec()
        if(project){
            return res.status(200).json(project)
        }else{
            return res.status(401).json({
                message: "Not Found"
            })
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const adminSingleProject= async (req, res) =>{
    try {
        const {id} = req.params
        const project = await Projects.findById(id)
        if(project){
            return res.status(200).json(project)
        }else{
            return res.status(401).json({
                message: "Not Found"
            })
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteProject =async (req, res) =>{
    try {
        const {id} = req.params
        const project = await Projects.findByIdAndDelete(id)
        if(project){
            return res.status(204).json({
                message: "Project Deleted!"
            })
        }else{
            return res.status(401).json({
                message: "Not Found!"
            })
        }
        
    } catch (error) {
            console.log("Error: ", error)
            return res.status(500).json({
                message: "Internal Server Error"
            })
    }
}

const updateProject = async (req, res) =>{
    try {

        const {id} = req.params
        const updatedData= req.body
        const project = await Projects.findByIdAndUpdate(id, updatedData, {new: true})
        if(project){
            return res.status(201).json(project)
        }else{
            return res.status(401).json({
                message: "Not Found"
            })
        }
    } catch (error) {
        console.log("Error", error.message)
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}
module.exports={getProjects, createProjects, adminProjects, userSingleProject, adminSingleProject, deleteProject, updateProject }