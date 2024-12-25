const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    // imageUrl: {
    //   type: String,
    //   required: [true, "Image is required"],
    // },
    joiningDate: {
      type: Date,
      required: [true, "Joining Date is Required"],
    },
    dob: {
      type: Date,
      required: [true, " Date of Birthday is Required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is Required"],
      enum: ["Male", "Female", "Other"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile Number is Required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    aadhar: {
      type: String,
      required: [true, "Aadhar Card Number is Required"],
      match: [/^\d{12}$/, "Aadhar number must be 12 digits"],
    },
    panCard: {
      type: String,
      required: [true, "Pan Card Number is Required"],
    },
    jobRole: {
      type: String,
      required: [true, "Job Role is Required"],
      enum: [
        "Full-stack Developer",
        "Back-end Developer",
        "Front-end Developer",
        "Marketing",
        "SEO",
        "Digital Marketing",
        "Internship",
      ],
    },
    salary: {
      type: Number,
      required: [true, "Salary is Required"],
      min: [0, "Salary must be a positive number"],
    },
    role: {
      type: String,
      required: [true, "User type is required"],
      default: "employee",
      enum: ["employee", "admin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
