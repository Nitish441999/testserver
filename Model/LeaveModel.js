const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Employee model
      ref: "Employee", // Specify the Employee model
      required: [true, "Employee ID is required"],
    },
    name: {
      type: String,
      required: [true, "Employee Name is required"],
    },
    from: {
      type: Date,
      required: [true, "Leave start date is required"],
    },
    to: {
      type: Date,
      required: [true, "Leave end date is required"],
    },
    description: {
      type: String,
      required: [true, "Leave description is required"],
    },
    status: {
      type: String,
      default: "Pending", // Default status is "Pending"
      enum: ["Pending", "Approved", "Rejected"], // Possible statuses
    },
  },
  { timestamps: true }
);

// Middleware to automatically set employee's name before saving the leave request
leaveSchema.pre("validate", async function (next) {
  try {
    if (!this.employeeId) {
      throw new Error("Employee ID is missing");
    }

    // Fetch employee details based on the employeeId
    const employee = await mongoose.model("Employee").findById(this.employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Automatically set the employee's name
    this.name = employee.name;
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware or route handler
  }
});

module.exports = mongoose.model("Leave", leaveSchema);
