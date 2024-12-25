const DepartmentModel = require("../Model/DepartmentModel");

const departmentController = async (req, resp) => {
  try {
    const { departmentName } = req.body;

    const department = await DepartmentModel.findOne({ departmentName });
    if (department) {
      return resp.status(404).json({
        success: false,
        message: "Department already exists.",
      });
    }
    // create new department
    const CreateDepartment = await DepartmentModel.create({ departmentName });
    resp.status(201).json({
      success: true,
      message: "Department Create Successfully",
      CreateDepartment,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: "Error in Department API",
    });
  }
};

const getDepartmentController = async (req, resp) => {
  try {
    const department = await DepartmentModel.find({});
    if (!department.length) {
      return resp.status(404).json({
        success: false,
        message: "Department List Not Found",
      });
    }

    resp.status(201).json({
      success: true,
      message: department.length,
      department,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: "Error in Get Department API",
      error: error.message || error,
    });
  }
};

const deleteDepartmentController = async (req, resp) => {
  try {
    const department = await DepartmentModel.findByIdAndDelete(req.params.id);

    resp.status(201).json({
      success: true,
      message: "Department Has Been Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: "Error in Delete Department Api",
      error: error.message || error,
    });
  }
};

const updateDepartment = async (req, resp) => {
  const { id } = req.params;
  try {
    const department = await DepartmentModel.findByIdAndUpdate(id);
    if (!department) {
      resp.status(404).json({
        success: false,
        message: "Department is not Fund",
      });
    }
    const { departmentName } = req.body;
    if (departmentName) department.departmentName = departmentName;

    await department.save();
    resp.status(201).json({
      success: true,
      massage: "Department Update Successfully",
      department,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: "Error in Update API",
      error: error.message || error,
    });
  }
};

module.exports = {
  departmentController,
  getDepartmentController,
  deleteDepartmentController,
  updateDepartment,
};
