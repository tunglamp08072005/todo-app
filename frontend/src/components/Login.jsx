import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../Axios/axios';
import TokenContext from '../context/TokenContext';

function Login() {
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', formData);
      const { token, user } = res.data;

      localStorage.setItem('authToken', JSON.stringify(token));
      tokenDispatch({ type: 'SET_TOKEN', payload: token });
      userDispatch({ type: 'SET_USER', payload: user });
    } catch (err) {
      console.error("Login Error:", err);
      setError({ message: err.response?.data?.message || "Đăng nhập thất bại" });
    }
  };

  if (userToken) return <Navigate to="/" />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgotPassword" className="text-blue-600 hover:underline text-sm">
            Quên mật khẩu?
          </a>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm">Chưa có tài khoản? </span>
          <a href="/register" className="text-blue-600 hover:underline text-sm">
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
