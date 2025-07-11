// controllers/taskController.js

const Task = require("../models/taskModel");

/**
 * @desc Tạo một task mới
 * @route POST /task/create
 * @access Private (đã đăng nhập)
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Tiêu đề không được để trống" });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
      createdAt: new Date()
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Tạo task thất bại" });
  }
};

/**
 * @desc Lấy tất cả task của người dùng
 * @route GET /task/getTask
 * @access Private
 */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Lấy danh sách task thất bại" });
  }
};

/**
 * @desc Xóa task theo ID
 * @route DELETE /task/delete/:id
 * @access Private
 */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy task" });
    }

    res.status(200).json({ message: "Xóa task thành công" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Xóa task thất bại" });
  }
};

/**
 * @desc Đánh dấu task hoàn thành hoặc bỏ đánh dấu
 * @route PATCH /task/markDone/:id
 * @access Private
 */
exports.toggleComplete = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy task" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({ message: "Cập nhật trạng thái task thành công", task });
  } catch (error) {
    console.error("Toggle Complete Error:", error);
    res.status(500).json({ message: "Cập nhật task thất bại" });
  }
};
