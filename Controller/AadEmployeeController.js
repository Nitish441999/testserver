const AddEmployeeModel = require("../Model/AddEmployeeModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const addEmployeeController = async (req, resp) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      aadhar,
      panCard,
      jobRole,
      joiningDate,
      salary,
      gender,
      dob,
    } = req.body;
    console.log(req.file);

    // // Normalize the image path to use forward slashes
    // const imagePath = req.file.path.replace(/\\/g, "/");
    // console.log("store image: " + imagePath);

    // Validation
    if (
      !name ||
      // !imagePath ||
      !joiningDate ||
      !jobRole ||
      !email ||
      !password ||
      !aadhar ||
      !panCard ||
      !salary ||
      !mobile ||
      !gender ||
      !dob
    ) {
      return resp.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check if the employee already exists
    const existingEmployee = await AddEmployeeModel.findOne({ email });
    if (existingEmployee) {
      return resp.status(404).json({
        success: false,
        message: "Email already exists. Please login.",
      });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Add new employee
    const employee = await AddEmployeeModel.create({
      name,
      // imageUrl: imagePath, // Image is stored as a path to the uploaded file
      joiningDate,
      email,
      password: hashedPassword,
      mobile,
      aadhar,
      panCard,
      jobRole,
      salary,
      gender,
      dob,
    });

    resp.status(201).json({
      success: true,
      message: "Employee added successfully.",
      employee,
    });
  } catch (error) {
    console.error("Error in Add Employee API: ", error);
    resp.status(500).json({
      success: false,
      message: "Error in Add Employee API.",
      error: error.message || error,
    });
  }
};

//--------------------------------login--------------------------------------------

const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return resp.status(400).json({
        success: false,
        massage: "please Provied all fields",
      });
    }
    // check user
    const employee = await AddEmployeeModel.findOne({ email });
    if (!employee) {
      return resp.status(404).json({
        success: false,
        massage: "Employee is Not Found",
      });
    }

    // compaire Password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return resp.status(404).json({
        success: false,
        massage: "Invalid Password",
      });
    }

    // create token
    const token = JWT.sign(
      {
        _id: employee._id,
        name: employee.name,
        role: employee.role,
        // image: employee.imageUrl,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    resp.status(200).json({
      success: true,
      massage: "Login Successfuly",
      token,
      employee: {
        _id: employee._id,
        name: employee.name,
        role: employee.role,
        // image: employee.image,
      },
    });
  } catch (error) {
    console.error("Error in login API: ", error);
    resp.status(500).json({
      success: false,
      massage: "Error In Login API",
      error: error.message || error,
    });
  }
};

//verify
const verify = async (req, resp) => {
  return resp.status(200).json({
    success: true,
    employe: req.employee,
  });
};

module.exports = { addEmployeeController, loginController, verify };
