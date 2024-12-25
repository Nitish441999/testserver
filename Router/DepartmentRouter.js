const express = require("express");
const {
  departmentController,
  getDepartmentController,
  deleteDepartmentController,
  updateDepartment,
} = require("../Controller/DepartmentControllers");
const router = express.Router();

// create detpartment ||POST
router.post("/createDepartment", departmentController);
router.get("/getDepartment", getDepartmentController);
router.delete("/deleteDepartment/:id", deleteDepartmentController);
router.put("/updateDepartment/:id", updateDepartment)

module.exports = router;
