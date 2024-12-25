const WorkReportModel = require("../Model/WorkReportModel");
const mongoose = require("mongoose");

const workReportControllers = async (req, res) => {
  try {
    const { workReport, date } = req.body;

    // Get _id and name from the authenticated user's data
    const { _id, name } = req.user;

    // Validate if workReport is provided
    if (!workReport) {
      return res.status(400).json({
        success: false,
        message: "Work Report is required",
      });
    }

    // Create a new work report entry in the database
    const report = await WorkReportModel.create({
      employeeId: _id, // Use the _id from the authenticated user as the employeeId
      name, // Automatically fetched from logged-in user
      workReport,
      date,
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: "Work report created successfully",
      report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Work Report API",
      error: error.message || error,
    });
  }
};

// Controller to fetch all work reports
const getAllWorkReports = async (req, res) => {
  try {
    // Fetch all work reports from the database
    const reports = await WorkReportModel.find();

    res.status(200).json({
      success: true,
      message: "Work reports fetched successfully",
      reports,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching work reports",
      error: error.message || error,
    });
  }
};

const getSingleWorkReport = async (req, res) => {
  try {
    const id = req.params.id; // Correctly extract 'id' from route parameters

    // Validate that the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work report ID",
      });
    }

    // Find the work report by its ID
    const report = await WorkReportModel.find({ employeeId: id });

    // If no report is found, return a 404 response
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Work report not found",
      });
    }

    // Return success response with the report
    res.status(200).json({
      success: true,
      message: "Work report fetched successfully",
      report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching work report",
      error: error.message || error,
    });
  }
};

module.exports = {
  workReportControllers,
  getSingleWorkReport,
  getAllWorkReports,
};
