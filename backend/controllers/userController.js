// controllers/userController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * @desc Đăng ký người dùng mới
 * @route POST /user/register
 * @access Public
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra đầu vào
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email đã được sử dụng" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Tạo token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    // Trả về thông tin người dùng và token
    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id
      },
      token
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/**
 * @desc Đăng nhập người dùng
 * @route POST /user/login
 * @access Public
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra đầu vào
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    // Tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email không tồn tại" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    // Trả về thông tin người dùng và token
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      },
      token
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

/**
 * @desc Lấy thông tin người dùng
 * @route GET /user/getUser
 * @access Private
 */
exports.getUserInfo = async (req, res) => {
  try {
    // req.user được gán từ middleware requireAuth
    const user = await User.findById(req.user.id).select("-password"); // Không trả về password

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get User Info Error:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
