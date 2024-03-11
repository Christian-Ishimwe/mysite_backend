const mongoose = require('mongoose')
const env= require('dotenv')
async function main(){
    try{

        const conn= await mongoose.connect(process.env.URL)
        console.log('Database Connected!')
    }catch(err){
        console.log("The error Within The database!", err)
    }
}

module.exports=main