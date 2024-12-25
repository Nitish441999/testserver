const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  newpassword: {
    type: String,
    required: [true, "Password is required"],
  },
  aadhar: {
    type: String,
    required: [true, "Aadhar Card Number is Required"],
    match: [/^\d{12}$/, "Aadhar number must be 12 digits"],
  },
});

// Export the User Model
module.exports = mongoose.model("User", userSchema);
