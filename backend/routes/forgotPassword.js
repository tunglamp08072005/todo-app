const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/forgotPasswordController");

// Gửi email chứa token reset password
router.post("/forgot", forgotPassword);

// Đặt lại mật khẩu bằng token
router.post("/reset", resetPassword);

module.exports = router;
