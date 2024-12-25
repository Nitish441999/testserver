const AttendanceModel = require("../Model/AttendanceModel");
const mongoose = require("mongoose");
const dayjs = require("dayjs");
const cron = require("node-cron");
const AddEmployeeModel = require("../Model/AddEmployeeModel");

// Cron job to run at 14:50 IST every day
cron.schedule(
  "00 15 * * *",
  async () => {
    try {
      // Get today's date in the format YYYY/MM/DD
      const today = dayjs().format("YYYY/MM/DD");

      // Find all employees who have not marked their attendance yet
      const employees = await AddEmployeeModel.find({}); // Replace with the actual model for employees
      for (const employee of employees) {
        const { _id, name } = employee;

        // Check if attendance is already marked for today
        const existingAttendance = await AttendanceModel.findOne({
          employeeId: _id,
          date: today,
        });

        // If no attendance found, mark it as leave
        if (!existingAttendance) {
          const newAttendance = new AttendanceModel({
            employeeId: _id,
            name,
            date: today,
            type: "leave", // Automatically mark as leave if not marked by 2:20 PM
          });
          await newAttendance.save();
          console.log(`Attendance marked as leave for ${name} (${_id})`);
        }
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set the time zone to IST (Indian Standard Time)
  }
);

// Function to mark attendance
const markAttendance = async (req, res) => {
  try {
    // Automatically fetch user details from `req.user`
    const { _id, name } = req.user;
    const employeeId = _id;
    const { date, type } = req.body;

    // Validate required fields
    if (!employeeId || !name || !date || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if attendance already exists for the given date
    const existingAttendance = await AttendanceModel.findOne({
      employeeId,
      date,
    });
    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }

    // Create and save a new attendance record
    const newAttendance = new AttendanceModel({
      employeeId,
      name,
      date,
      type,
    });
    await newAttendance.save();

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      attendance: newAttendance,
    });
  } catch (error) {
    console.error("Error in Mark Attendance API:", error);
    res.status(500).json({
      success: false,
      message: "Error in Mark Attendance API",
      error: error.message || error,
    });
  }
};

// Function to get attendance by employee and month
const getAttendance = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { month } = req.params;

    if (!employeeId || !month) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and Month are required",
      });
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(employeeId);
    if (!isValidObjectId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Employee ID format",
      });
    }

    const attendanceRecords = await AttendanceModel.find({
      employeeId: new mongoose.Types.ObjectId(employeeId),
      date: { $regex: `^${month.replace("-", "/")}\/` }, // Match dates starting with the month (YYYY/MM)
    });

    res.status(200).json({
      success: true,
      message: "Attendance fetched successfully",
      attendanceRecords,
    });
  } catch (error) {
    console.error("Error in Get Attendance API:", error);
    res.status(500).json({
      success: false,
      message: "Error in Get Attendance API",
      error: error.message || error,
    });
  }
};

// Function to get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const allattendance = await AttendanceModel.find({});
    if (!allattendance || allattendance.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No attendance records found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All attendance records fetched successfully",
      allattendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Get All Attendance API",
      error: error.message || error,
    });
  }
};

// Function to get today's attendance summary (fullDay, halfDay, leave)
const attendanceSummary = async (req, res) => {
  try {
    const { _id } = req.user; // Assuming the employeeId is passed in the request parameters
    const employeeId = _id
    console.log(employeeId);

    const todayDate = new Date().toISOString().split("T")[0];

    const fullDayCount = await AttendanceModel.countDocuments({
      employeeId,
      date: todayDate,
      type: "fullDay",
    });
    const halfDayCount = await AttendanceModel.countDocuments({
      employeeId,
      date: todayDate,
      type: "halfDay",
    });
    const leaveCount = await AttendanceModel.countDocuments({
      employeeId,
      date: todayDate,
      type: "leave",
    });

    return res.status(200).json({
      summary: {
        fullDay: fullDayCount,
        halfDay: halfDayCount,
        leave: leaveCount,
        total: fullDayCount + halfDayCount + leaveCount,
      },
    });
  } catch (error) {
    console.error("Error in Attendance Summary:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
  getAllAttendance,
  attendanceSummary,
};
