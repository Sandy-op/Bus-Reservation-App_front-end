import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PassResetLink = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/forgot-password?email=${email}`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);

      if (response.status === 200) {
        setMessage('Password reset link has been sent to your email.');
        setTimeout(() => {
          setTimeout(() => navigate('/userAuth'), 3000);
        }, 2000);
      } else {
        setMessage('Oops! An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred. Please check your email and try again.');
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
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
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

export default PassResetLink;
