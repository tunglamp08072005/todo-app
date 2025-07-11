import axios from 'axios';

// Tạo một instance của axios với cấu hình sẵn
const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // URL của backend (thay đổi nếu cần)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Tự động thêm token vào headers (nếu có)
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('authToken'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
