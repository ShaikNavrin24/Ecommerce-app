const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel'); // Ensure the correct path to the product model

async function uploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;
        if (!sessionUserId) {
            return res.status(401).json({
                message: "Unauthorized: No session user ID",
                error: true,
                success: false,
            });
        }

        const hasPermission =  uploadProductPermission(sessionUserId);
        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission Denied",
                error: true,
                success: false,
            });
        }

        // Validate the input data
        const { productName, brandName, category, productImage, description, price, sellingprice } = req.body;
        if (!productName || !brandName || !category || !productImage || !description || !price || !sellingprice) {
            return res.status(400).json({
                message: "Missing required fields",
                error: true,
                success: false,
            });
        }

        // Create and save the product
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message: "Product Uploaded Successfully",
            error: false,
            success: true,
            data: saveProduct,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred while uploading the product",
            error: true,
            success: false,
        });
    }
}

module.exports = uploadProductController;
