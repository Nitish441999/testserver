const express = require("express");
const changePassword = require("../Controller/ChangePasswordController");

const router = express.Router();
router.post("/changepassword", changePassword);
module.exports = router;
