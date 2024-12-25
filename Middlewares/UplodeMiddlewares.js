// const multer = require("multer");
// const path = require("path");

// // Set up storage engine for Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Define folder to store images
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     ); // Append original file extension
//   },
// });

// // Initialize multer with the storage configuration
// const upload = multer({ storage: storage });

// module.exports = upload;
