// middleware/requireAuth.js

const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Kiểm tra header có chứa Bearer token không
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Không có token, truy cập bị từ chối" });
    }

    const token = authHeader.split(" ")[1];

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gán user id vào request để dùng trong các controller
    req.user = { id: decoded.id };

    next(); // Cho phép tiếp tục đến controller
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = requireAuth;
