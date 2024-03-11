const {MessageUser} = require("../models/messagesModel")
const nodemail = require("nodemailer")
let transporter = nodemail.createTransport({
    service: 'gmail',
    auth: {
        user: 'christianinja3@gmail.com',
        pass: 'lxbqjxqeluankdgk'
    }
})

const sendEmail= async (to, subject, usermessage) =>{
    let mailOptions = {
        from: 'christianinja3@gmail.com',
        to: to,
        subject: subject,
        text: usermessage
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    await transporter.sendMail(mailOptions)
}

const sendMessage= async (req, res) =>{
    try {
        const {name, subject, message, email, telephone=null} = req.body
        const newMessage = await MessageUser({
            name,
            subject,
            message,
            email,
            telephone
        })
        await newMessage.save()
        return res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error: ", error)
        return res.status(200).json({
            message: "Internal Server Error"
        })
    }
}


const getAllMessages = async (req, res) =>{
    try {
        const messages= await MessageUser.find()
        if(messages.length >=1){
            return res.status(200).json(messages)
        }else{
            return res.status(401).json({
                message: "Not Messages yet!"
            })
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const getUnreadMessages = async (req, res) =>{
    try {
        const messages= await MessageUser.find({responded:false})
        console.log(messages)
        if(messages){
            return res.status(200).json(messages)
        }else{
            return res.status(401).json({
                message: "Not Messages yet!"
            })
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteMessage= async (req, res) =>{
    try {
        const {id} = req.params
        const message= await MessageUser.findByIdAndDelete(id)
        if(message){
            return res.status(204).json({
                message: "Message Deleted!"
            })
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

const getSingleMessage =async (req, res) =>{
    try {
        const {id} = req.params
        console.log("Id: ", id)
        const message = await MessageUser.findById(id)
        if(message){
            return res.status(200).json(message)
        }else{
            return res.status(401).json({
                message: "Not found!"
            })
            
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const replyMessage = async (req, res) =>{
    try{
        const {id} = req.params
        const message = await MessageUser.findById(id)
        if(message){
            message.responded=true
            return res.status(201).json({
                message
            })
        }else{
            return res.status(401).json({
                message: "Not Found"
            })
        }
    }catch(err){
        console.log("Error: ", err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const sendMailsToUsers = async (req, res) =>{
    const {to, subject, usermessage} = req.body
    try{
       sendEmail(to, subject, usermessage)
        return res.status(201).json({
            message: `Email Sent successful to ${to}`
        })
    }catch(err) {
        console.log("Error Message: ", err.message)
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}



module.exports = {sendMessage, getAllMessages,  getUnreadMessages, deleteMessage, getSingleMessage, replyMessage, sendMailsToUsers, sendEmail}