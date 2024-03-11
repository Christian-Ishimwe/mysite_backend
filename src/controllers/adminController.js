const User = require("../models/usersModel")
const Users = require("../models/usersModel")
const{BlogPost} = require("../models/blogsModel")
const {Projects} = require("../models/projectsModel")
const { sendEmail } = require("./messageController")
const { text } = require("express")
const homePage= (req, res) =>{
    res.status(200).json({
        message:"Admin Dasboard!"
    })
}

const getUsers = async (req, res) =>{
    try{
         const users = await Users.find()
    res.status(200).json({
        message: "All users",
        users
    })
    }catch(err){
        console.log('Error: ', err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
   
}
const getUser= async (req, res) =>{
    try{
        const{ id }= req.params
        const user= await User.findById(id)
        if(user){
            res.status(200).json({
               name: user.name,
               email: user.email,
               dateJoined: user.createdAt
            })
        }else{
            res.status(401).json({
                message: "The User was not found!"
            })
        }
    }catch(err){
        console.log("error: ", err)
        res.status(500).json({
            message: "Internal Server error!"
        })
    }
}
const deleteUser = async (req, res) =>{
    try{
    const {id} = req.params
    const user= await User.findByIdAndDelete(id)
    if(user){
        res.status(204).json({
            message: "User deleted!"
        })
    }else{
        res.status(401).json({
            message: "User not found!"
        })
    }
    }catch(err){
        console.log("Error: ", err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}
const createBlog = async (req, res) =>{
    try{
        const {title, content, summary, isPublished=true,image,allowComments=true }= req.body
        const newBlog = new BlogPost({
            title,
            content,
            summary,
            isPublished,
            image,
            allowComments
        })
       
        await newBlog.save()
        try{
             let thisUsers = await Users.find()
             console.log(thisUsers)
            for(let i= 0; i< thisUsers.length; i++){
                  sendEmail(thisUsers[i].email, subject="New Blog Posted", usermessage=`Hi, Check out our new blog post with title of ${title}`)
            }
          
        }catch(error){
            console.log("Erro: ", error)
        }finally{
             return res.status(201).json({
            message: "Blog Added",
            newBlog
        })
        }
    }catch(err){
        console.log('Error: ', err)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}


const deleteBlog = async (req, res) =>{
    try{
        const {id} = req.params
        const blog = await BlogPost.findByIdAndDelete(id)
        if(blog){
            res.status(204).json({
                message: "The blog Deleted Successful!"
            })
        }else{
            res.status(401).json({
                message: `The Blog with id: ${id} not found!`
            })
        }
    }catch(err){
        console.log("Error: ", err)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

const getBlogs= async (req, res) =>{
    try{
    const blogs= await BlogPost.find()
    if(blogs){
       return res.status(200).json(blogs)
    }else{
        return res.status(401).json({
            message: "No Blogs Published yet!"
        })
    }
}catch(err){
    console.log("Error: ", err)
   return res.status(500).json({
        message: "Internal Server error"
    })
}
}

const getOneBlog = async (req, res) =>{
    try{
        const {id} = req.params
        const blog = await BlogPost.findById(id)
        if(blog){
            return res.status(200).json({
                blog
            })
        }else{
            return res.status(401).json({
                message: `Not Found with id: ${id}`
            })
        }
    }catch(err){
        console.log("Error: ", err)
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

const updateBlog = async (req, res) =>{
    try{
        const {id} = req.params
        const updatedData = req.body
        const updateBlog = await BlogPost.findByIdAndUpdate(id, updatedData, {new: true})
        if(updateBlog){
            await updateBlog.save()
            return res.status(201).json({
                message: "Blog Updated",
                updateBlog
            })
        }else{
            return res.status(401).json({
                message: `Not Found id = ${id}`
            })
        }
    }catch(err){
        console.log("Error: ", err)
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}


// Projects section



module.exports={homePage, getUsers, getUser, deleteUser, createBlog, deleteBlog, getBlogs, getOneBlog, updateBlog}