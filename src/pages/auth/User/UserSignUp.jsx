import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaTransgender, FaLock, FaBirthdayCake, FaEyeSlash, FaEye } from "react-icons/fa";

export default function UserSignUp() {
  const nav = useNavigate();
  const [message, setMessage] = useState('');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const addUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = JSON.stringify({ name, phone, email, age, gender, password });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/users`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage(
          "New User Has Been Added Successfully! Please activate your account via the email link."
        );
        nav("/userAuth");
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
          User Sign Up
        </h1>
        <form onSubmit={addUser} className="space-y-3">
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
              placeholder="you@gmail.com"
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
              max={10}
              placeholder="Enter your 10 digit mobile no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaTransgender className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <select
              type="text"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-gray-700 bg-opacity-50 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          <div className="relative">
            <FaBirthdayCake className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="number"
              required
              min={1}
              max={100}
              placeholder=" Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
