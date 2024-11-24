// import React, { useState } from "react";
// import "../../../../";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function UserSignUp() {
//   const nav = useNavigate();
//   let [name, setName] = useState("");
//   let [phone, setPhone] = useState("");
//   let [email, setEmail] = useState("");
//   let [gender, setGender] = useState("");
//   let [age, setAge] = useState("");
//   let [password, setPassword] = useState("");
//   let [loading, setLoading] = useState(false);

//   const addUser = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let data = JSON.stringify({
//       name,
//       phone,
//       email,
//       age,
//       gender,
//       password,
//     });

//     try {
//       const response = await axios.post(`http://deepmindstech.in:8080/api/users`, data, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         console.log(response);
//         alert("New User Has Been Added Successfully! Please activate your user account by clicking on link sent to your email");
//         nav("/userlogin")
//         return; // Prevent further execution after success
//       }
//       console.error("Unexpected response status:", response.status);
//       alert(`An error occurred. Status code: ${response.status}. Please try again.`); // More specific message
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred. Please check your details and try again.");
//     }finally{
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="AdminSignUp">
//       {loading ? (
//         <div className="spinner-border text-primary" role="status"> {/* Changed here */}
//           <span className="sr-only">Loading...</span>
//         </div>
//       ) : (
//       <form onSubmit={addUser} action="">
//         <label htmlFor="">Name</label>
//         <input
//           type="text"
//           required
//           placeholder="Enter the Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <label htmlFor="">Email</label>
//         <input
//           type="email"
//           required
//           placeholder="Enter the Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label htmlFor="">Phone</label>
//         <input
//           type="tel"
//           pattern="[0-9]{10}"
//           required
//           placeholder="Enter the Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <label htmlFor="">Gender</label>
//         <input
//           type="text"
//           required
//           placeholder="Enter the gender "
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//         />
//         <label htmlFor="">age</label>
//         <input
//           type="number"
//           required
//           placeholder="Enter your age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <label htmlFor="">Password</label>
//         <input
//           type="password"
//           required
//           placeholder="Enter the Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="btn btn-danger">Register</button>
//       </form>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaTransgender, FaLock, FaBirthdayCake, FaEyeSlash, FaEye } from "react-icons/fa";

export default function UserSignUp() {
  const nav = useNavigate();
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
        alert(
          "New User Has Been Added Successfully! Please activate your account via the email link."
        );
        nav("/userAuth");
        return;
      }
      alert(`Unexpected response. Status code: ${response.status}.`);
    } catch (err) {
      alert("An error occurred. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-14 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
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
              placeholder="Email"
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
              placeholder="Phone"
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
              placeholder="Gender"
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
              placeholder="Age"
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
      </div>
    </div>
  );
}
