const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true
    },
    password:String,
    role:String
},{
    timestamps:true
})

const userModel=mongoose.model("user",userSchema)
module.exports=userModel