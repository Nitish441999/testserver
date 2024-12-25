const AddEmployeeModel = require("../Model/AddEmployeeModel");

// Get All employees
const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees
    const employees = await AddEmployeeModel.find({});

    // Check if employees list is empty
    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employees list not found",
      });
    }

    // Return the list of employees
    res.status(200).json({
      success: true,
      totalEmployees: employees.length,
      employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching employees",
      error: error.message || error,
    });
  }
};

// Get single employee
const getEmployee = async (req, resp) => {
  try {
    // Validate request ID
    const { id } = req.params; // Assuming the ID is passed in the URL params
    if (!id) {
      return resp.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Fetch employee by ID
    const employee = await AddEmployeeModel.findById(id).select("-password"); // Exclude password

    // Check if employee exists
    if (!employee) {
      return resp.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Send success response
    resp.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      employee,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Error in Get Employee API",
      error: error.message || error,
    });
  }
};

const updateEmployeeController = async (req, resp) => {
  try {
    // Extract ID from URL parameters
    const { id } = req.params;

    // Find employee by ID
    const employee = await AddEmployeeModel.findById(id);

    // Validate if employee exists
    if (!employee) {
      return resp.status(404).send({
        success: false,
        message: "Employee Not Found",
      });
    }

    // Destructure fields from request body
    const {
      name,
      imageURL,
      password, // Extract password, if provided
      email,
      mobile,
      aadhar,
      panCard,
      jobRole,
      lastname,
      salary,
    } = req.body;

    // Update fields if provided
    if (name) employee.name = name;
    if (imageURL) employee.imageURL = imageURL;
    if (email) employee.email = email;
    if (mobile) employee.mobile = mobile;
    if (aadhar) employee.aadhar = aadhar;
    if (panCard) employee.panCard = panCard;
    if (jobRole) employee.jobRole = jobRole;
    if (lastname) employee.lastname = lastname;
    if (salary) employee.salary = salary;

    // Only update the password if provided
    if (password) {
      const bcrypt = require("bcrypt");
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      employee.password = hashedPassword;
    }

    // Save updated employee
    await employee.save();

    // Send success response
    resp.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      employee,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Error in Update API",
      error: error.message || error,
    });
  }
};

// Delete Employee
const deleteEmployeeController = async (req, resp) => {
  try {
    const employee = await AddEmployeeModel.findByIdAndDelete(req.params.id);
    resp.status(201).json({
      success: true,
      massage: "Your Account Has Been Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      massage: "Error in Delete Employee API",
      error: error.massage || error,
    });
  }
};

module.exports = {
  getEmployee,
  getAllEmployees,
  updateEmployeeController,
  deleteEmployeeController,
};
