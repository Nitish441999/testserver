const express = require("express");
const multer = require("multer");
const {
  addEmployeeController,
  loginController,
  verify,
} = require("../Controller/AadEmployeeController");
const userAuthMiddleware = require("../Middlewares/userMiddlewares");

const router = express.Router();

// Multer Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error("Only JPEG, PNG, and JPG files are allowed."));
//     }
//     cb(null, true);
//   },
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
// });

// Add Employees using POST method
router.post("/addEmployee", addEmployeeController); // Use the upload middleware

// Login and Verify Routes
router.post("/login", loginController);
router.post("/verify", userAuthMiddleware, verify);

module.exports = router;
