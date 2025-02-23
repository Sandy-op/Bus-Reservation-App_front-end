import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewAllBus({ onEditBus }) {
    const [buses, setBuses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const adminId = localStorage.getItem("adminId");

    useEffect(() => {
        if (!adminId) {
            setLoading(false);
            return;
        };

        setLoading(true);
        axios.get(`${process.env.REACT_APP_URL}/api/buses/find/${adminId}`)
            .then((res) => {
                setBuses(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [adminId]);

    const removeBus = (id, busNumber) => {
        axios.delete(`${process.env.REACT_APP_URL}/api/buses/${id}`)
            .then(() => {
                alert(`Bus Number ${busNumber} has been removed.`);
                setBuses(buses.filter(bus => bus.id !== id));
            })
            .catch(() => alert("Cannot remove this item"));
    };

    const viewBookedTickets = (busId) => {
        navigate(`booked-tickets/${busId}`);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <input
                type="text"
                placeholder="Search by bus name or no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-12 mt-6 p-3 px-10 rounded-lg border border-gray-300 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
            />
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : buses.length === 0 ? (
                <div className="text-center text-red-600 text-xl font-semibold mt-10">
                    No buses found, Please add bus first..
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-12 w-full">
                    {buses.map((bus) => (
                        <div key={bus.id} className="bg-gradient-to-r from-green-400 to-blue-400 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-lg w-80 text-gray-900 dark:text-gray-100 transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                            <h4 className="text-xl font-bold">{bus.name}</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Seats: {bus.numberOfSeats}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">From: {bus.from}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">To: {bus.to}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Date: {bus.dateOfDeparture}</p>
                            <span className="block mt-2 font-semibold">Bus Number: {bus.busNumber}</span>
                            <span className="block mt-2 font-semibold">Booked Ticket: {bus.NumberOfSeatsBooked}</span>
                            <div className="mt-4 flex justify-between">
                                <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition" onClick={() => onEditBus(bus)}>Edit</button>
                                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition" onClick={() => removeBus(bus.id, bus.busNumber)}>Delete</button>
                            </div>
                            <div className="mt-2 flex justify-center">
                                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition" onClick={() => viewBookedTickets(bus.id)}>Booked Tickets</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

