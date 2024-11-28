// import axios from 'axios';
// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchBus = () => {
//   let [from, setFrom] = useState("");
//   let [to, setTo] = useState("");
//   let [dateOfDeparture, setDate] = useState("");
//   let [buses, setBuses] = useState([]);
//   let [searched, setSearched] = useState(false);
//   let navigate = useNavigate();

//   const fromInputRef = useRef();
//   const toInputRef = useRef();

//   const handleFromChange = (e) => {
//     setFrom(e.target.value);
//   };

//   const handleToChange = (e) => {
//     setTo(e.target.value);
//   };

//   function searchBus(e) {
//     e.preventDefault();
//     axios.get(`${process.env.REACT_APP_URL}/api/buses/find?from=${from}&to=${to}&dateOfDeparture=${dateOfDeparture}`)
//       .then(res => {
//         const fetchedBuses = res.data.data;
//         setBuses(fetchedBuses);
//         setSearched(true);

//         if (fetchedBuses.length > 0) {
//           navigate('/bus', { state: { buses: fetchedBuses } });
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching buses:", err);
//         setSearched(true);
//       });
//   }


//   return (
//     <div className="flex flex-col items-center my-7 mx-5 p-10 font-sans bg-neutral-200/60 dark:bg-neutral-900/40 rounded-lg">
//       <form
//         onSubmit={searchBus}
//         className="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4 items-center justify-center p-10 border border-gray-300 rounded-lg shadow-md bg-gray-100 w-full  dark:bg-neutral-900/70"
//       >
//         <div className="relative w-full sm:w-55" ref={fromInputRef}>
//           <input
//             type="text"
//             required
//             value={from}
//             onChange={handleFromChange}
//             placeholder="From Location"
//             className="py-2 px-4 border border-gray-300 rounded-md text-base w-full focus:outline-none dark:bg-neutral-600/40"
//           />
//         </div>

//         <div className="relative w-full sm:w-55" ref={toInputRef}>
//           <input
//             type="text"
//             required
//             value={to}
//             onChange={handleToChange}
//             placeholder="To Location"
//             className="py-2 px-4 border border-gray-300 rounded-md text-base w-full focus:outline-none dark:bg-neutral-600/40"
//           />
//         </div>

//         <input
//           type="date"
//           required
//           value={dateOfDeparture}
//           onChange={(e) => setDate(e.target.value)}
//           className="py-2 px-4 border border-gray-300 rounded-md text-base w-full sm:w-48 focus:outline-none dark:bg-neutral-600/40"
//         />

//         <button className="py-2 w-full sm:w-auto border-none rounded-md bg-green-600 text-white text-base cursor-pointer hover:bg-green-700 transition-all duration-150">
//           Search
//         </button>
//       </form>
//       <div>
//         {searched && buses.length === 0 && (
//           <h2 className="mt-5 text-red-500 text-center">No buses available for this route</h2>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchBus;


// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const SearchBus = () => {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [dateOfDeparture, setDate] = useState("");
//   const [buses, setBuses] = useState([]);
//   const [searched, setSearched] = useState(false);
//   const navigate = useNavigate();

//   const handleFromChange = (e) => setFrom(e.target.value);
//   const handleToChange = (e) => setTo(e.target.value);

//   const searchBus = (e) => {
//     e.preventDefault();
//     axios
//       .get(
//         `${process.env.REACT_APP_URL}/api/buses/find?from=${from}&to=${to}&dateOfDeparture=${dateOfDeparture}`
//       )
//       .then((res) => {
//         const fetchedBuses = res.data.data;
//         setBuses(fetchedBuses);
//         setSearched(true);

//         if (fetchedBuses.length > 0) {
//           navigate("/bus", { state: { buses: fetchedBuses } });
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching buses:", err);
//         setSearched(true);
//       });
//   };

//   return (
//     <div className="flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
//       {/* Search Form */}
//       <motion.form
//         onSubmit={searchBus}
//         className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-xl"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//       >
//         <h1 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">
//           Search for Buses
//         </h1>
//         <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
//           {/* From Input */}
//           <div>
//             <label
//               htmlFor="from"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               From Location
//             </label>
//             <input
//               id="from"
//               type="text"
//               value={from}
//               onChange={handleFromChange}
//               placeholder="Enter starting point"
//               className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-gray-100"
//             />
//           </div>

//           {/* To Input */}
//           <div>
//             <label
//               htmlFor="to"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               To Location
//             </label>
//             <input
//               id="to"
//               type="text"
//               value={to}
//               onChange={handleToChange}
//               placeholder="Enter destination"
//               className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-gray-100"
//             />
//           </div>

//           {/* Date Input */}
//           <div>
//             <label
//               htmlFor="date"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Date of Departure
//             </label>
//             <input
//               id="date"
//               type="date"
//               value={dateOfDeparture}
//               onChange={(e) => setDate(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-gray-100"
//             />
//           </div>

//           {/* Search Button */}
//           <div>
//             <motion.button
//               type="submit"
//               className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-md shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Search Bus
//             </motion.button>
//           </div>
//         </div>
//       </motion.form>

//       {/* Search Results */}
//       {searched && (
//         <motion.div
//           className="absolute bottom-5 text-center w-full"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           {buses.length === 0 ? (
//             <p className="text-red-500 text-lg font-bold">
//               No buses available for this route!
//             </p>
//           ) : (
//             <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
//               {buses.map((bus, index) => (
//                 <motion.div
//                   key={index}
//                   className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <h3 className="font-bold text-gray-800 dark:text-gray-200">
//                     {bus.name}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Departure: {bus.departureTime}
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     Seats Available: {bus.availableSeats}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SearchBus;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchBus = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateOfDeparture, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleFromChange = (e) => setFrom(e.target.value);
  const handleToChange = (e) => setTo(e.target.value);

  const searchBus = (e) => {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_URL}/api/buses/find?from=${from}&to=${to}&dateOfDeparture=${dateOfDeparture}`
      )
      .then((res) => {
        const fetchedBuses = res.data.data;
        setBuses(fetchedBuses);
        setSearched(true);

        if (fetchedBuses.length > 0) {
          navigate("/bus", { state: { buses: fetchedBuses } });
        }
      })
      .catch((err) => {
        console.error("Error fetching buses:", err);
        setSearched(true);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[45vh] p-6 bg-gray-100 dark:bg-gray-900">
      <div className="relative w-full max-w-6xl">
        <h1 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">
          Search for Buses
        </h1>
        {/* Search Form */}
        <motion.form
          onSubmit={searchBus}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0">
            {/* From Input */}
            <div className="flex-1">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                From Location
              </label>
              <input
                id="from"
                type="text"
                value={from}
                onChange={handleFromChange}
                placeholder="Enter starting point"
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* To Input */}
            <div className="flex-1">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                To Location
              </label>
              <input
                id="to"
                type="text"
                value={to}
                onChange={handleToChange}
                placeholder="Enter destination"
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Date Input */}
            <div className="flex-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date of Departure
              </label>
              <input
                id="date"
                type="date"
                value={dateOfDeparture}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Search Button */}
            <div className="lg:w-auto">
              <motion.button
                type="submit"
                className="w-full lg:w-auto py-2 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-md shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Search Bus
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Search Results */}
        {searched && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {buses.length === 0 ? (
              <p className="text-red-500 text-2xl font-bold text-center">
                No buses available for this route!
              </p>
            ) : (
              <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                {buses.map((bus, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">
                      {bus.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Departure: {bus.departureTime}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Seats Available: {bus.availableSeats}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchBus;
