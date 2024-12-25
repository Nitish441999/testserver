const express = require("express");
const {
  passwordController,
  verifyOTPController,
} = require("../Controller/RsetPasswordControllers");
const userAuthMiddleware = require("../Middlewares/userMiddlewares");
const router = express.Router();

router.post("/send-otp", userAuthMiddleware, passwordController); // Route to send OTP
router.post("/verify-otp",userAuthMiddleware, verifyOTPController); // Route to verify OTP and reset password

module.exports = router;
