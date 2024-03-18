const express= require('express')
const createServer = require("./utils/server")
const env=require("dotenv").config() 
const userRoutes = require("./routes/usersRoutes")
const projectsRoutes = require("./routes/projectsRoutes")
const blogsRoutes = require("./routes/blogsRoutes")
const messageRoutes = require("./routes/messageRoutes")
const adminRoutes= require("./routes/adminRoutes")
const dbConnect = require("./config/dbConnector")
const cors = require('cors')
const {authenticateToken}= require("./auth/jwebAdmin")
const swaggerJsDoc= require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const path = require("path")
const cloudinary = require("cloudinary")

app = createServer()

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Site - Christian",
            version: "1.0.0",
            servers: [
                {
                    url: "http://localhost:3000/auth",
                    description: "This is my site"
                }
            ]
        }
    },
    apis:[
        path.resolve( __dirname ,'routes', 'blogsRoutes.js'),
        path.resolve( __dirname ,'routes', 'usersRoutes.js'),
        path.resolve(__dirname, 'routes', 'adminRoutes.js'),
        path.resolve( __dirname ,'routes', 'messageRoutes.js'),
        path.resolve( __dirname ,'routes', 'projectsRoutes.js')
    ],
    components: {
      securitySchemes: {
        JWTAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
}}


const swaggerSpecs = swaggerJsDoc(swaggerOptions)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
const PORT=process.env.PORT || 5000
const  hostname="127.0.0.1"
app.listen(PORT, () =>{
              
    cloudinary.config({ 
    cloud_name: process.env.CLOUDINERY_CLOUD_NAME, 
    api_key: process.env.CLOUDINERY_API_KEY, 
    api_secret: process.env.CLOUDINERY_SECRET_KEY 
    });


    dbConnect()
    console.log(`The server is running on port ${PORT}`)
})

module.exports ={app}