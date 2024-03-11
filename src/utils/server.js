const express = require('express')
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc= require("swagger-jsdoc")
const path = require("path")
const userRoutes = require("../routes/usersRoutes")
const projectsRoutes = require("../routes/projectsRoutes")
const blogsRoutes = require("../routes/blogsRoutes")
const messageRoutes = require("../routes/messageRoutes")
const adminRoutes= require("../routes/adminRoutes")
function createServer(){
  
    const app = express()
    app.use(express.json())
    
    app.get("/", (req, res) =>{
        return res.status(200).json({
            message: "Welcome to my site Api"
        })
    })
    app.use("/auth", userRoutes)
    app.use("/projects",projectsRoutes)
    app.use("/blogs", blogsRoutes)
    app.use("/message", messageRoutes)
    app.use('/admin',  adminRoutes)
    return app
}

module.exports= createServer