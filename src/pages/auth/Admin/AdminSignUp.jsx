import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaBusinessTime, FaLock, FaBuilding, FaEyeSlash, FaEye } from "react-icons/fa";

const AdminSignUp = () => {
  const nav = useNavigate();
  const [message, setMessage] = useState('');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gst_number, setGstNo] = useState("");
  const [travels_name, setTravelsName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const addAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = JSON.stringify({ name, phone, email, gst_number, travels_name, password });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/admins`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage(
          "New User Has Been Added Successfully! Please activate your account via the email link."
        );
        nav("/adminAuth");
        return;
      }
      alert(`Unexpected response. Status code: ${response.status}.`);
    } catch (error) {
      setMessage("❌ SignUp Failed!\n " + (error.response?.data?.message || "An unknown error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="relative w-full max-w-md p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl border border-blue-500">
        {/* Glow Effect */}
        <div className="absolute -top-3 -right-3 w-20 h-20 bg-blue-500 rounded-full filter blur-lg opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-purple-500 rounded-full filter blur-lg opacity-40 animate-pulse"></div>
        <h1 className="text-2xl font-bold text-center mb-4 tracking-wide neon-text">
          Admin Sign Up
        </h1>
        <form onSubmit={addAdmin} className="space-y-3">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="email"
              required
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="tel"
              pattern="[0-9]{10}"
              required
              placeholder="Enter your 10 digit mobile no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaBusinessTime className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              // pattern="[0-9][A-Z][a-z]{15}"
              required
              mix="15"
              value={gst_number}
              placeholder="Enter your 15 digit GST No:"
              onChange={(e) => setGstNo(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              required
              placeholder=" Company Name:"
              value={travels_name}
              onChange={(e) => setTravelsName(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full py-2 text-sm font-semibold text-center uppercase tracking-wide rounded-md transition-all ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
              }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
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
}

export default AdminSignUp;

