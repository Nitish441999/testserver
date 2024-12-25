const AddEmployeeModel = require("../Model/AddEmployeeModel");
const ChangePasswordModel = require("../Model/ChangePasswordModel");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  try {
    const { email, newPassword, aadhar } = req.body;

    // Check for missing fields
    if (!email || !newPassword || !aadhar) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the employee
    const employee = await AddEmployeeModel.findOne({
      email,
      aadhar,
    });

    // Handle case where no matching employee is found
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found. Please check your details.",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the employee's password
    employee.password = hashedPassword;
    await employee.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error in Change Password API:", error);
    res.status(500).json({
      success: false,
      message: "Error in Change Password API",
      error: error.message || error,
    });
  }
};

module.exports = changePassword;
