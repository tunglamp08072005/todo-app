import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../Axios/axios";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ mật khẩu.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await axios.post("/forgotPassword/reset", {
        token,
        newPassword,
      });

      setSuccess(res.data.message);
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      console.error("Reset Password Error:", err);
      setError(err.response?.data?.message || "Lỗi đặt lại mật khẩu.");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Đặt lại mật khẩu</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium text-gray-700">
            Mật khẩu mới:
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="block mb-2 font-medium text-gray-700">
            Xác nhận mật khẩu:
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
