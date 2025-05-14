const addToCartModel = require("../../models/cartProduct")

const addToCartController=async(req,res)=>{
    try{
        const {productId}=req?.body
        const currentUser=req.userId
        const isProductAvaliable=await addToCartModel.findOne({
            productId
        })

        if(isProductAvaliable){
            return res.json({
                message:"Product exists in the Cart",
                success:false,
                error:true
            })
        }

        const payload={
     
            productId:productId,
            quantity:1,
            userId:currentUser
        }

        const newAddToCart=new addToCartModel(
            payload
        )

        const saveProduct=await newAddToCart.save()

        res.json({
            data:saveProduct,
            message:"Product added to cart",
            success:true,
            error:false
        })

       
    }
    catch(err){
        res.json({
            message:err?.message,
            error:true,
            success:false
        })
    }
}

module.exports=addToCartController