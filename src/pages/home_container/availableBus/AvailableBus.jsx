// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaStar, FaBusAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const AvailableBus = () => {
//   const [buses, setBuses] = useState([]);
//   const [displayBuses, setDisplayBuses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const busesPerPage = 5;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBuses = async () => {
//       setLoading(true);
//       try {
//         const cachedBuses = localStorage.getItem("availableBuses");
//         if (cachedBuses) {
//           const parsedBuses = JSON.parse(cachedBuses);
//           setBuses(parsedBuses);
//           setDisplayBuses(parsedBuses.slice(0, busesPerPage));
//           setHasMore(parsedBuses.length > busesPerPage);
//         } else {
//           const response = await axios.get(`${process.env.REACT_APP_URL}/api/buses`);
//           const newBuses = response.data.data;
//           setBuses(newBuses);
//           setDisplayBuses(newBuses.slice(0, busesPerPage));
//           setHasMore(newBuses.length > busesPerPage);
//           localStorage.setItem("busDetails", JSON.stringify(newBuses));
//         }
//       } catch (error) {
//         console.error("Error fetching buses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBuses();
//   }, []);

//   const handleLoadMore = () => {
//     const nextBuses = buses.slice(currentPage * busesPerPage, (currentPage + 1) * busesPerPage);
//     setDisplayBuses((prevBuses) => [...prevBuses, ...nextBuses]);
//     setCurrentPage((prevPage) => prevPage + 1);
//     setHasMore(buses.length > (currentPage + 1) * busesPerPage);
//   };

//   return (
//     <section className="py-8 bg-gray-200 dark:bg-gray-800">
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Available Buses</h2>
//         <div className="space-y-4">
//           {displayBuses.length === 0 && !loading && (
//             <p className="text-center text-gray-600 dark:text-red-500">There are no available buses for now.</p>
//           )}
//           {displayBuses.map((bus) => (
//             <div key={bus.id} className="bg-white dark:bg-black shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition-shadow">
//               <div className="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
//                 <FaBusAlt className="text-red-500 text-3xl" />
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{bus.name}</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-100">{bus.type || "AC, Recliner"}</p>
//                   <div className="flex items-center text-yellow-500">
//                     <FaStar />
//                     <span className="ml-1 text-sm text-gray-600 dark:text-gray-200">{bus.rating || "N/A"} / 5</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center mb-4 md:mb-0">
//                 <p className="text-gray-600 dark:text-gray-200">Date: <span className="font-medium">{bus.dateOfDeparture}</span></p>
//                 <p className="text-gray-600 dark:text-gray-200">Time: <span className="font-medium">{bus.departureTime}</span></p>
//               </div>
//               <div className="text-center mb-4 md:mb-0">
//                 <p className="text-gray-600 dark:text-gray-200">From: <span className="font-medium">{bus.from}</span></p>
//                 <p className="text-gray-600 dark:text-gray-200">To: <span className="font-medium">{bus.to}</span></p>
//               </div>
//               <div className="text-center mb-4 md:mb-0">
//                 <p className="text-gray-600 dark:text-gray-200">Seats Available: <span className="font-medium">{bus.availableSeats}</span></p>
//                 <p className="text-gray-600 dark:text-gray-200">Price: <span className="font-medium text-green-500">₹{bus.costPerSeat}</span></p>
//               </div>
//               <button onClick={() => navigate(`/bus/bus-details`, { state: { busDetails: bus } })} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">Book Now</button>
//             </div>
//           ))}
//         </div>
//         {loading && (
//           <div className="flex justify-center mt-6">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
//           </div>
//         )}
//         {hasMore && !loading && (
//           <div className="text-center mt-6">
//             <button onClick={handleLoadMore} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition">View More Buses</button>
//           </div>
//         )}
//         {!hasMore && !loading && buses.length > 0 && (
//           <p className="text-center text-gray-600 dark:text-gray-300 mt-4">No more buses available.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AvailableBus;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaStar, FaBusAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AvailableBus = () => {
    const [buses, setBuses] = useState([]);
    const [displayBuses, setDisplayBuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const busesPerPage = 5;
    const navigate = useNavigate();
    const busListRef = useRef(null);

    useEffect(() => {
        const fetchBuses = async () => {
            setLoading(true);
            try {
                const cachedBuses = localStorage.getItem("availableBuses");
                if (cachedBuses) {
                    const parsedBuses = JSON.parse(cachedBuses);
                    setBuses(parsedBuses);
                    setDisplayBuses(parsedBuses.slice(0, busesPerPage));
                    setHasMore(parsedBuses.length > busesPerPage);
                } else {
                    const response = await axios.get(`${process.env.REACT_APP_URL}/api/buses`);
                    const newBuses = response.data.data;
                    setBuses(newBuses);
                    setDisplayBuses(newBuses.slice(0, busesPerPage));
                    setHasMore(newBuses.length > busesPerPage);
                    localStorage.setItem("availableBuses", JSON.stringify(newBuses));
                }
            } catch (error) {
                console.error("Error fetching buses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBuses();
    }, []);

    const handleLoadMore = () => {
        const nextBuses = buses.slice(currentPage * busesPerPage, (currentPage + 1) * busesPerPage);
        setDisplayBuses((prevBuses) => [...prevBuses, ...nextBuses]);
        setCurrentPage((prevPage) => prevPage + 1);
        setHasMore(buses.length > (currentPage + 1) * busesPerPage);

        setTimeout(() => {
            if (busListRef.current) {
                busListRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
            }
        }, 100);
    };

    return (
        <section className="py-8 px-4 bg-gray-200 dark:bg-gray-950">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Available Buses</h2>
                <div className="space-y-6" ref={busListRef}>
                    {displayBuses.length === 0 && !loading && (
                        <p className="text-center text-gray-600 dark:text-red-500">There are no available buses for now.</p>
                    )}
                    {displayBuses.map((bus) => (
                        <div key={bus.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-2xl transition-all w-full">

                            <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto mb-4 md:mb-0">
                                <FaBusAlt className="text-red-500 text-4xl md:text-5xl" />
                                <div>
                                    <h3 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200">{bus.name}</h3>
                                    <p className="text-sm md:text-md text-gray-600 dark:text-gray-400">{bus.type || "AC, Recliner"}</p>
                                    <div className="flex items-center text-yellow-500">
                                        <FaStar />
                                        <span className="ml-2 text-md md:text-lg text-gray-600 dark:text-gray-300">{bus.rating || "N/A"} / 5</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-center text-sm md:text-base w-full">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300">Date: <span className="font-medium">{bus.dateOfDeparture}</span></p>
                                    <p className="text-gray-600 dark:text-gray-300">Time: <span className="font-medium">{bus.departureTime}</span></p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300">From: <span className="font-medium">{bus.from}</span></p>
                                    <p className="text-gray-600 dark:text-gray-300">To: <span className="font-medium">{bus.to}</span></p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300">Seats Available: <span className="font-medium">{bus.availableSeats}</span></p>
                                    <p className="text-gray-600 dark:text-gray-300">Price: <span className="font-medium text-green-500">₹{bus.costPerSeat}</span></p>
                                </div>
                            </div>
                            <button onClick={() => navigate(`/bus/bus-details`, { state: { busDetails: bus } })} className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all shadow-md w-full md:w-auto text-sm md:text-base mt-4 md:mt-0">Book Now</button>
                        </div>
                    ))}
                </div>
                {loading && (
                    <div className="flex justify-center mt-6">
                        <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-b-4 border-purple-500"></div>
                    </div>
                )}
                {hasMore && !loading && (
                    <div className="text-center mt-6">
                        <button onClick={handleLoadMore} className="bg-blue-500 text-white py-2 md:py-3 px-6 md:px-8 rounded-lg hover:bg-blue-600 transition-all shadow-md text-sm md:text-base">View More Buses</button>
                    </div>
                )}
                {!hasMore && !loading && buses.length > 0 && (
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-4">No more buses available.</p>
                )}
            </div>
        </section>
    );
};

export default AvailableBus;
