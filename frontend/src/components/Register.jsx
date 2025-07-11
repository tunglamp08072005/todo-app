import React, { useState, useContext } from 'react';
import axios from '../Axios/axios';
import { Navigate } from 'react-router-dom';
import TokenContext from '../context/TokenContext';

function Register() {
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('/user/register', formData);
      const { user, token } = res.data;

      localStorage.setItem('authToken', JSON.stringify(token));
      tokenDispatch({ type: 'SET_TOKEN', payload: token });
      userDispatch({ type: 'SET_USER', payload: user });
    } catch (err) {
      console.error('Register Error:', err);
      setError({ message: err.response?.data?.message || "Đăng ký thất bại" });
    }
  };

  if (userToken) return <Navigate to="/" />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Họ tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập họ tên"
              required
            />
          </div>
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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Đăng ký
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">Đã có tài khoản? </span>
          <a href="/login" className="text-blue-600 hover:underline text-sm">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
