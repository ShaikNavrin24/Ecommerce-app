const productModel=require("../../models/productModel")
const uploadProductPermission=require('../../helpers/permission')
async function updateProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new error("Permission Denied")
        }

        const {_id,...resBody}=req.body
        const updateProduct=await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message:"Product Updated Successfully",
            data:updateProduct,
            success:true,
            error:false
        })

    }
    catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false,
        })
    }
}
module.exports=updateProductController