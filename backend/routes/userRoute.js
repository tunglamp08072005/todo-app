const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserInfo
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

// ✅ Đăng ký tài khoản mới
router.post("/register", registerUser);

// ✅ Đăng nhập người dùng
router.post("/login", loginUser);

// ✅ Lấy thông tin người dùng (cần đăng nhập)
router.get("/getUser", requireAuth, getUserInfo);

module.exports = router;
