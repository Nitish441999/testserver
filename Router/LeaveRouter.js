const {
  leaveRequestController,
  updateLeaveStatusController,
  getAllLeaveRequest,
  getSingleLeave,
} = require("../Controller/LeaveController");
const userAuthMiddleware = require("../Middlewares/userMiddlewares");

const express = require("express");
const router = express.Router();

// Route to create a leave request, protected by user authentication middleware
router.post("/leaveRequest", userAuthMiddleware, leaveRequestController);
router.get("/getAllLeave", getAllLeaveRequest);
router.get("/getSingleLeave", userAuthMiddleware, getSingleLeave);

// Route to update the leave status, also protected by user authentication middleware
router.put(
  "/statusUpdate/:id",
  userAuthMiddleware,
  updateLeaveStatusController
);

module.exports = router;
