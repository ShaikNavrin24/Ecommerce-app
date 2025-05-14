const userModel = require('../../models/userModel'); // Ensure the userModel is correctly imported

async function userDetailsController(req, res) {
  try {
    console.log("User ID from request:", req.userId);

    if (!req.userId) {
      return res.status(400).json({
        message: "User ID is missing",
        error: true,
        success: false
      });
    }

    const user = await userModel.findById(req.userId);
    console.log("User details:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Details"
    });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false
    });
  }
}

module.exports = userDetailsController;
