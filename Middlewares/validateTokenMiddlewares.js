// middlewares/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: "Token is required." });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decoded; // Attach user information to req.user
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;