const mongoose = require("mongoose");

const workReportSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employees", // Reference to the User model
    },
    name: {
      type: String,
      required: true,
    },
    workReport: {
      type: String,
      required: [true, "Work Report is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: () => {
        const indiaTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        return new Date(indiaTime).toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
      },
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set to current date
      expires: 1 * 24 * 60 * 60, // Automatically delete after 30 days (in seconds)
    },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("WorkReport", workReportSchema);
