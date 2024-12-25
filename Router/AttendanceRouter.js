const express = require("express");
const {
  markAttendance,
  getAttendance,
  getAllAttendance,
  attendanceSummary,
} = require("../Controller/AttendanceController");
const userMiddlewares = require("../Middlewares/userMiddlewares");
const router = express.Router();

router.post("/markAttendance", userMiddlewares, markAttendance);
router.get("/getAttendance/:id/:month", userMiddlewares, getAttendance); // Fixed the missing comma
router.get("/allAttendance", userMiddlewares, getAllAttendance )
router.get("/attendenceSumary/:id" ,userMiddlewares, attendanceSummary)

module.exports = router;
