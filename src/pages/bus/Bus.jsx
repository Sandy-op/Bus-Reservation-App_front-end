import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import bus1 from "../../assets/bus1.png";
import bus2 from "../../assets/bus2.png";
import bus3 from "../../assets/bus3.png";
import bus4 from "../../assets/bus4.png";
import bus5 from "../../assets/bus5.png";
import bus6 from "../../assets/bus6.png";
import bus7 from "../../assets/bus7.png";
import bus8 from "../../assets/bus8.png";
import bus9 from "../../assets/bus9.png";
import bus10 from "../../assets/bus10.png";

const busImages = [bus1, bus2, bus3, bus4, bus5, bus6, bus7, bus8, bus9, bus10];

const Bus = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [buses, setBuses] = useState([]);
    const [displayBuses, setDisplayBuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const busesPerPage = 6;
    const [hasMore, setHasMore] = useState(false);
    const busListRef = useRef(null);
    const prevBusesRef = useRef([]); // Track previous bus data

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

    useEffect(() => {
        const getStoredData = () => {
            if (location.state?.buses) {
                return location.state.buses;
            }
            const storedData = localStorage.getItem("searchData");
            return storedData ? JSON.parse(storedData).buses : [];
        };
    
        const storedBuses = getStoredData();
    
        // Compare storedBuses with previous data to prevent infinite loops
        if (storedBuses.length > 0 && JSON.stringify(storedBuses) !== JSON.stringify(prevBusesRef.current)) {
            setBuses(storedBuses);
            setDisplayBuses(storedBuses.slice(0, busesPerPage));
            setHasMore(storedBuses.length > busesPerPage);
            prevBusesRef.current = storedBuses; // Update reference
        }
    }, [location]);

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

    const handleBusClick = (bus) => {
        localStorage.setItem("busDetails", JSON.stringify(bus));
    };

    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-8'>
            {/* Search & filter */}
            <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md p-4 md:p-6 items-center">
                <div className="flex items-center gap-x-2.5 col-span-1 md:col-span-2">
                    <input type="number" id='seat' placeholder='Search buses...' name='seat' className='w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800' />
                    <button className="bg-violet-600 h-11 px-4 rounded-md text-base text-neutral-50">
                        <FaSearch />
                    </button>
                </div>
                <div className="hidden md:block col-span-2"></div>

                <div className="col-span-1 md:col-span-2">
                    <select className='w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800 cursor-pointer'>
                        <option value="location4">Select Bus Type</option>
                        <option value="location4">Recliner Bus</option>
                        <option value="location5">AC Sleeper Bus</option>
                        <option value="location7">Deluxe Bus</option>
                    </select>
                </div>
            </div>

            {/* Bus cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayBuses.map((bus) => {
                    const busImage = busImages[Math.floor(Math.random() * busImages.length)];

                    return (
                        <Link key={bus.id}
                            to="/bus/bus-details"
                            state={{ busDetails: bus }}
                            onClick={() => handleBusClick(bus)}
                            className='bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-3 sm:p-4'
                        >
                            <img
                                src={busImage}
                                alt="Bus Img"
                                className="w-full aspect-video object-contain object-center"
                            />
                            <div className="px-2 py-3 sm:px-3 sm:py-4 space-y-1 sm:space-y-2">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                                        {bus.name}
                                    </h1>
                                    <p className="text-xs sm:text-sm font-normal text-neutral-800 dark:text-neutral-50">
                                        {bus.numberOfSeats} Seats
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {loading && <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500 mx-auto"></div>}
            {hasMore && !loading && (
                <div className="text-center mt-6">
                    <button onClick={handleLoadMore} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all shadow-md">View More Buses</button>
                </div>
            )}
        </div>
    );
};

export default Bus;
