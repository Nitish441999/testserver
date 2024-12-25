// controllers/authController.js
const jwt = require("jsonwebtoken");
const AddEmployeeModel = require("../Model/AddEmployeeModel");

// Controller for JWT login
const login = async (req, res) => {
  const { email } = req.body;

  // Find employee by email
  const employee = await AddEmployeeModel.findOne({ email });

  if (!employee) {
    return res.status(404).json({ message: "User not found." });
  }

  // Generate JWT
  const token = jwt.sign(
    { id: employee._id, email: employee.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.status(200).json({ token });
};

// Controller for validating the token (get user info from token)
// const validateToken = (req, res) => {
//   // The user is already decoded and attached to req.user in verifyToken middleware
//   return res.status(200).json({ user: req.user });
// };

module.exports = {
  login,
  validateToken,
};
