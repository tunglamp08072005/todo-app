// controllers/forgotPasswordController.js

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ✅ Tạo token reset password
const generateResetToken = (id) => {
  return jwt.sign({ id }, process.env.RESET_SECRET, { expiresIn: "15m" });
};

// ✅ Gửi email chứa link reset password
const sendResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}`;

  // Cấu hình transporter để gửi mail (dùng Gmail hoặc dịch vụ SMTP khác)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,         // địa chỉ email gửi
      pass: process.env.EMAIL_PASSWORD      // mật khẩu ứng dụng
    }
  });

  const mailOptions = {
    from: `"Todo App Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <p>Click vào link dưới đây để đặt lại mật khẩu:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p><b>Lưu ý:</b> Link có hiệu lực trong 15 phút.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

// ✅ Gửi link reset mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Kiểm tra email tồn tại
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại trong hệ thống" });
    }

    // Tạo token reset
    const resetToken = generateResetToken(user._id);

    // Gửi mail
    await sendResetEmail(email, resetToken);

    res.status(200).json({ message: "Đã gửi email đặt lại mật khẩu" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra. Vui lòng thử lại sau." });
  }
};

// ✅ Xử lý đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Xác minh token
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const userId = decoded.id;

    // Tìm user và cập nhật mật khẩu mới
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
