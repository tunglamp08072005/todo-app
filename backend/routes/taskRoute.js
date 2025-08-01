const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  deleteTask,
  toggleComplete,
  updateTask,
} = require("../controllers/taskController");
const requireAuth = require("../middleware/requireAuth");

// Áp dụng middleware bảo vệ tất cả route bên dưới
router.use(requireAuth);

// ✅ Tạo task mới
router.post("/create", createTask);

// ✅ Lấy tất cả task của người dùng
router.get("/getTask", getTasks);

// ✅ Xóa task theo ID
router.delete("/delete/:id", deleteTask);

// ✅ Đánh dấu task hoàn thành hoặc bỏ hoàn thành
router.patch("/markDone/:id", toggleComplete);

// ✅ Cập nhật task
router.patch("/update/:id", updateTask);

module.exports = router;
