const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
       
        const sessionUser=req.userId
             const {userId,email,username,role}=req.body
             const payload={
                ...(email&&{email:email}),
                ...(username&&{username:username}),
                ...(role&&{role:role}),
             }
              const user=await userModel.findById(sessionUser)
             const updateUser=await userModel.findByIdAndUpdate(userId,payload)
             console.log(user.role)
             console.log(updateUser)
             res.json({
                data:updateUser,
                message:"User Updated",
                success:true,
                error:false
             })
    }catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false,
        })
    }
}


module.exports=updateUser