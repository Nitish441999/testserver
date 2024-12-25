const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, // Reference ObjectId from the Employee collection
    ref: "Employee", // Name of the referenced model
    required: true 
  },
  name:{
    type:String,
    required: [true, "name is required"]
  },
  date: { 
    type: String, 
    required: true // Format: YYYY-MM-DD
  },
  type: { 
    type: String, 
    enum: ["fullDay", "halfDay", "leave"], 
    required: true 
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
