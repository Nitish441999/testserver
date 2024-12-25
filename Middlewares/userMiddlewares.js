const jwt = require("jsonwebtoken");
const AddEmployeeModel = require("../Model/AddEmployeeModel");

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AddEmployeeModel.findById(decoded._id).select(
      "_id name"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Attach user details to the request
    req.user = {
      _id: user._id,
      name: user.name,
    };

    next(); // Proceed to the controller
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = userAuthMiddleware;
