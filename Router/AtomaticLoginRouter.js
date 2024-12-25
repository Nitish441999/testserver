// routes.js
const express = require("express");
const { login, validateToken } = require("./controllers/authController");
const verifyToken = require("./middlewares/verifyToken"); // Import the middleware
const router = express.Router();

router.post("/login", login);
// router.get("/validate", verifyToken, validateToken); // Protect the route with verifyToken middleware

module.exports = router;
