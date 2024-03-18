// const users= require("../constants/Users")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const {dbConnector}= require("../config/dbConnector")

const User = require("../models/usersModel")
const registerUser= async (req, res) =>{
    let {name, email, password} = req.body
    const currentUser= await User.findOne({email})
    if(!currentUser){
    let hashedpassword= await bcrypt.hash(password, 10)
    try{
        const newUser= new User({
        name,
        email,
        password: hashedpassword
    })
    await newUser.save()
    return res.status(201).json({
        message: "User Registered Successful, Please sign in!",
        status: 201,
        newUser
    })
    }catch(err){
        console.log("Error", err)
        res.status(500).json({
            message: "Error on The server!"
        })
    }
   }else{
        res.status(409).json({
            message: "User with such credentials already exists",
            status: 409
        })
   }

}



const loginUser= async (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    const {email, password}= req.body
    console.log(email, password)
    const user = await User.findOne({email})
    if(user){
        const passwordCheck = await bcrypt.compare(password, user.password)
        if(passwordCheck){
            const token = jwt.sign({ email: user.email, name: user.name}, 'your_secret_key', { expiresIn: '1h' });
            res.status(200).json({
            message: "User Logged in SUccessful!",
            name: user.name,
            email: user.email,
            token
        })
        }else{
            res.status(401).json({
            message: "Invalid Email address or Password"
        })
        }
    }else{
        res.status(401).json({
            message: "Invalid Email address or Password"
        })
    }

    
}

const protectedRouter = (req, res) =>{
    res.status(200).json({
        message: "This is a protected Router",
        user: req.user
    })
}

module.exports={registerUser, loginUser, protectedRouter}