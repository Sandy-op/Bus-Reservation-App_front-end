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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFromChange = (e) => setFrom(e.target.value);
  const handleToChange = (e) => setTo(e.target.value);

  const searchBus = (e) => {
    e.preventDefault();
    setSearched(false);
    setLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_URL}/api/buses/find?from=${from}&to=${to}&dateOfDeparture=${dateOfDeparture}`
      )
      .then((res) => {
        const fetchedBuses = res.data.data;
        setBuses(fetchedBuses);
        setSearched(true);
        setLoading(false);

        if (fetchedBuses.length > 0) {
          const searchData = { from, to, dateOfDeparture, buses: fetchedBuses };
          localStorage.setItem("searchData", JSON.stringify(searchData));
          navigate("/bus", { state: searchData }); 
        }
      })
      .catch((err) => {
        console.error("Error fetching buses:", err);
        setSearched(true);
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[45vh] p-6 bg-gray-100 dark:bg-gray-900">
      <div className="relative w-full max-w-6xl">
        <h1 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">
          Search for Buses
        </h1>
        <motion.form
          onSubmit={searchBus}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0">
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

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          </div>
        )}

        {searched && !loading && (
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
