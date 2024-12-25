const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,);

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDb;
