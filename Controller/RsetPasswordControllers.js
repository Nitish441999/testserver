// Assuming your User model is in the models directory
const sendOTP = require("../services/sendOTP"); // Your OTP service
const AddEmployeeModel = require("../Model/AddEmployeeModel");

const passwordController = async (req, res) => {
  const { mobile } = req.body;

  try {
    // 1. Check if the mobile number exists in the database
    const user = await AddEmployeeModel.findOne({ mobile });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Mobile number not found!",
      });
    }

    // 2. Send OTP to the mobile number
    const otp = await sendOTP(mobile);

    // Here, you can store the OTP in a temporary database or cache for later verification.
    // For simplicity, we'll assume it's stored in a temporary variable or cache.
    // You might want to save it in a session or a cache like Redis for real-world scenarios.

    // Assuming you store OTP in memory (temporary):
    req.session.otp = otp; // This is an example; consider using Redis or a similar store in real applications

    // 3. Respond with OTP sent successfully message
    res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Reset Password Controller API",
    });
  }
};

const verifyOTPController = async (req, res) => {
  const { mobile, otp, newPassword } = req.body;

  try {
    // Verify the OTP
    if (otp !== req.session.otp) {
      // Check against stored OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 4. If OTP is valid, reset the password
    const user = await AddEmployeeModel.findOne({ mobile });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this mobile number",
      });
    }

    // Hash the new password before saving (use bcrypt or any other hashing method)
    user.password = newPassword; // You should hash the password here before saving it

    await user.save();

    // 5. Respond with success message
    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in verifying OTP or resetting password",
    });
  }
};

module.exports = {
  passwordController,
  verifyOTPController,
};
