const express = require("express");
const userAuthMiddleware = require("../Middlewares/userMiddlewares");
const {
  workReportControllers,
  getSingleWorkReport,
  getAllWorkReports,
} = require("../Controller/WorkReportController");
const router = express.Router();
router.post("/workereportCreate", userAuthMiddleware, workReportControllers);
router.get("/singaleReport/:id", userAuthMiddleware, getSingleWorkReport);
router.get("/getAllReport", userAuthMiddleware, getAllWorkReports);
module.exports = router;
