const express = require("express");
const {
  getEmployee,
  getAllEmployees,
  updateEmployeeController,
  deleteEmployeeController,
} = require("../Controller/EmployeeController");
const userAuthMiddleware = require("../Middlewares/userMiddlewares");
// const userAuthMiddleware = require("../Middlewares/userMiddlewares");

const router = express.Router();
// get all employees route using GET method
router.get("/getAllEmplyees", getAllEmployees);
// get sigale employee route useing GET method
router.get("/getSingaleEmployee/:id", userAuthMiddleware, getEmployee);
// Update Employee Route || PUT
router.put("/updateEmployee/:id", userAuthMiddleware, updateEmployeeController);
//DeleteEmployee route || delete
router.delete("/deleteEmployee/:id", userAuthMiddleware, deleteEmployeeController);




module.exports = router;
