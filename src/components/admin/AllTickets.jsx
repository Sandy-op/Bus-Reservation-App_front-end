import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AllTickets() {
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_URL}/api/tickets`)
            .then((res) => {
                setTickets(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="search ticket id, seat no..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-12 mt-6 p-3 px-10 rounded-lg border border-gray-300 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
                />
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : tickets.length === 0 ? (
                <div className="text-center text-red-600 text-xl font-semibold mt-10">
                    No tickets found.
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-12 w-full">
                    {tickets
                        .filter(ticket =>
                        (searchTerm === '' ||
                            ticket.id.toString().includes(searchTerm) ||
                            (Array.isArray(ticket.bookedSeats) ? ticket.bookedSeats.join(", ").includes(searchTerm) : ticket.bookedSeats?.toString().includes(searchTerm)))
                        )
                        .map((ticket) => (
                            <div key={ticket.id} className="bg-gradient-to-r from-purple-400 to-blue-400 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-lg w-80 text-gray-900 dark:text-gray-100 transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                                <h3 className="text-xl font-bold">Ticket ID: {ticket.id}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Booking Status: {ticket.status}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Seat No.: {Array.isArray(ticket.bookedSeats) ? ticket.bookedSeats.join(", ") : ticket.bookedSeats}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Date of Booking: {ticket.dateOfBooking}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Total Seats Booked: {ticket.numberOfSeatsBooked}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Ticket Fare: ₹{ticket.cost}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
