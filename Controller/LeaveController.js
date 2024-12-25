const mongoose = require("mongoose");
const LeaveModel = require("../Model/LeaveModel");

const leaveRequestController = async (req, res) => {
  try {
    const { fromDate, toDate, description } = req.body;

    // Ensure that user details are attached by middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { _id, name } = req.user;

    // Validate required fields
    if (!_id || !name || !fromDate || !toDate || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if 'fromDate' is earlier than 'toDate'
    if (new Date(fromDate) >= new Date(toDate)) {
      return res.status(400).json({
        success: false,
        message: "'From' date must be earlier than 'To' date",
      });
    }

    // Parse dates and reset the time to 00:00:00
    const fromDateObj = new Date(fromDate);
    fromDateObj.setHours(0, 0, 0, 0);  // Reset time to midnight

    const toDateObj = new Date(toDate);
    toDateObj.setHours(0, 0, 0, 0);  // Reset time to midnight

    // Create and save the leave request
    const leaveRequest = await LeaveModel.create({
      employeeId: _id, // Use the _id from the authenticated user as the employeeId
      name, // Automatically fetched from logged-in user
      from: fromDateObj,
      to: toDateObj,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Leave request sent successfully",
      data: leaveRequest,
    });
  } catch (error) {
    console.error("Error in leaveRequestController:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the leave request",
      error: error.message || error,
    });
  }
};


// update satatus
const updateLeaveStatusController = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL params
    const { status } = req.body; // Extract new status from request body

    // Validate id
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid id received:", id); // Log for debugging
      return res.status(400).json({
        success: false,
        message: "Invalid or missing leave request ID.",
      });
    }

    // Validate status
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status value. Allowed values are 'Pending', 'Approved', or 'Rejected'.",
      });
    }

    // Find and update the leave request by ID
    const updatedLeave = await LeaveModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedLeave) {
      console.error("No leave request found for id:", id); // Log for debugging
      return res.status(404).json({
        success: false,
        message: "Leave request not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave status updated successfully.",
      data: updatedLeave,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the leave status.",
      error: error.message || error,
    });
  }
};

const getAllLeaveRequest = async (req, res) => {
  try {
    const allLeave = await LeaveModel.find({});
    if (!allLeave.length) {
      return res.status(401).json({
        success: false,
        message: "Leave List Not Fund",
      });
    }

    res.status(201).json({
      success: true,
      message: "Get All Leave List",
      allLeave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: "false",
      message: "Error in Get All leave API",
    });
  }
};
const getSingleLeave = async (req, res) => {
  try {
    // Assuming you are using JWT token and have a middleware to extract the user ID
    const employeeId = req.user._id; // The user's ID extracted from the token or session

    // Fetch leave data for the logged-in user from the database
    const leaveDetails = await LeaveModel.find({ employeeId });

    if (!leaveDetails) {
      return res.status(404).json({
        success: false,
        message: "No leave details found for the logged-in user.",
      });
    }

    // Return the leave details to the user
    res.status(200).json({
      success: true,
      message: "Leave Get Successfully",
      leaveDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Get Single Leave API",
      error: error.message || error,
    });
  }
};

module.exports = {
  leaveRequestController,
  getAllLeaveRequest,
  getSingleLeave,
  updateLeaveStatusController,
};
