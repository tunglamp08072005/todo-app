const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề công việc"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Liên kết với bảng users
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
