# 📋 MERN Todo App

Ứng dụng Todo hiện đại được xây dựng bằng MERN Stack (MongoDB, Express, React, Node.js) — hỗ trợ đăng nhập, quản lý tác vụ, và chức năng quên mật khẩu qua email.

---

## 🚀 Cài đặt

### 1. Sao chép repository về máy:
```bash
git clone https://github.com/tunglamp08072005/todo-app.git
```

### 2. Cài đặt cho frontend
```
# Cài đặt cho frontend
cd frontend
npm install
```

```
# Cài đặt cho backend
cd ../backend
npm install
```

## ⚙️ Cấu hình môi trường
Tạo file .env trong thư mục backend/ với nội dung mẫu sau:
```
MONGO_URI=<URL kết nối MongoDB của bạn>
EMAIL_USER=<Địa chỉ Gmail của bạn>
EMAIL_PASSWORD=<Mật khẩu ứng dụng tạo trong Google>
PORT=5000
JWT_SECRET=thisisasecretkey
RESET_SECRET=anothersecretkey
FRONTEND_URL=http://localhost:3000
```

## ▶️ Khởi chạy ứng dụng
Chạy server và frontend ở hai terminal riêng:
```
# Khởi chạy backend
cd backend
nodemon server.js

# Khởi chạy frontend
cd frontend
npm start
```

Hình ảnh của ứng dụng:
<img width="2879" height="1619" alt="image" src="https://github.com/user-attachments/assets/88ab1c35-3284-4b2e-bfcd-c03cd7173564" />
