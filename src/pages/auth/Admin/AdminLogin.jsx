import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const verify = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_URL}/api/admins/verify-by-email?email=${email}&password=${password}`
      )
      .then((res) => {
        alert("🚀 Login Successful!");
        const fetchedAdmin = res.data.data;
        localStorage.setItem("Admin", JSON.stringify(fetchedAdmin));
        navigate('admin-home-page');
      })
      .catch((error) => {
        alert("❌ Login Failed!\n " + (error.response?.data?.message || "An unknown error occurred."));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden p-4 sm:p-6">
      {/* Particle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-black">
        <div className="absolute inset-0 z-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white rounded-full animate-floating ${i % 2 === 0 ? "opacity-70" : "opacity-40"
                }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glassmorphic Login Card */}
      <div className="relative z-10 max-w-sm w-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 bg-opacity-60 px-6 py-8 sm:px-10 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-700">
        <h2 className="text-3xl sm:text-4xl text-white font-extrabold text-center mb-6">
          Welcome Admin 🚀
        </h2>
        <form onSubmit={verify} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-transparent text-white border border-gray-600 rounded-lg py-2 px-4 sm:py-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent text-white border border-gray-600 rounded-lg py-2 px-4 sm:py-3 placeholder-gray-400 pr-12 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <Link
              to="/admin-reset-link"
              className="text-xs text-indigo-400 hover:text-indigo-200 block mt-2"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-gray-400 mt-6 text-center text-sm sm:text-base">
          New to BusFinder?{" "}
          <Link
            to="/admin-signup"
            className="text-indigo-400 hover:text-indigo-200 font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center space-x-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full shadow-lg blur-xl animate-bounce-slow"></div>
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full shadow-lg blur-xl animate-bounce-slow delay-200"></div>
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full shadow-lg blur-xl animate-bounce-slow delay-400"></div>
      </div>
    </div>
  );
};

export default AdminLogin;

