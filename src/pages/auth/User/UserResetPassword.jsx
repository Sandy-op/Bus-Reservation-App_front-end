import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  useEffect(() => {
    if (!token) {
      navigate("/userAuth");
      return;
    }
  });


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.put(`${process.env.REACT_APP_URL}/api/users/reset-password`, {
        token,
        password: newPassword,
      });
      console.log(response.data);

      if (response.status === 202) {
        setMessage("🎉 Password successfully reset!");
        localStorage.removeItem("resetToken");
        document.cookie = "resetToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        setTimeout(() => navigate("/userAuth"), 3000);
      } else {
        setMessage("🚨 Oops! Something went wrong.");
      }
    } catch (error) {
        setMessage("❌ Invalid details! Try again.\n " + (error.response?.data?.message || "An unknown error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
      <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 w-96 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-lg font-bold shadow-md transition-transform ${loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400"
              }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center font-semibold text-sm bg-gradient-to-r from-red-400 to-pink-500 text-white p-2 rounded-lg animate-bounce">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserResetPassword;
