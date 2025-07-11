const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute");
const forgotPasswordRoutes = require("./routes/forgotPassword");

dotenv.config(); // Load biến môi trường từ .env

const app = express();

// ======= Middleware =======
app.use(cors()); // Cho phép frontend truy cập
app.use(express.json()); // Parse JSON body từ client

// ======= Kết nối MongoDB =======
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch((err) => {
    console.error("❌ Kết nối MongoDB thất bại:", err.message);
    process.exit(1); // Dừng nếu không kết nối được
});

// ======= Các tuyến API =======
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/password", forgotPasswordRoutes);

// ======= Route mặc định =======
app.get("/", (req, res) => {
    res.send("🚀 Todo App API đang chạy...");
});

// ======= Khởi động server =======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy ở cổng ${PORT}`);
});
