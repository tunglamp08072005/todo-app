import React, { useState } from "react";
import axios from "../../Axios/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ email.");
      return;
    }

    try {
      const res = await axios.post("/password/forgot", { email });
      setMessage(res.data.message);
      setError("");
      setEmail("");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError(
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Quên mật khẩu</h2>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
            Nhập địa chỉ email của bạn:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition"
          >
            Gửi yêu cầu đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
