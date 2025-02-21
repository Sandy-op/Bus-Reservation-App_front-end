import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewBookedTickets() {
    const { busId } = useParams();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!busId) return; 

        axios.get(`${process.env.REACT_APP_URL}/api/tickets/find/${busId}`)
            .then((res) => {
                setTickets(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tickets:", err);
                setLoading(false);
            });
    }, [busId]);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Booked Tickets for Bus {busId}
            </h2>

            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : tickets.length === 0 ? (
                <div className="text-center text-gray-700 dark:text-gray-300 text-xl font-semibold mt-10">
                    No tickets found for this bus.
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-10 w-full">
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className="bg-gradient-to-r from-purple-400 to-blue-400 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-lg w-80 text-gray-900 dark:text-gray-100 transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                            <h3 className="text-xl font-bold">Ticket ID: {ticket.id}</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Seat No.: {ticket.bookedSeats.join(", ")}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Passenger: {ticket.username}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Phone NO.: {ticket.phone}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Gender: {ticket.gender}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Date of Journey: {ticket.dateOfDeparture}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">From: {ticket.source}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">To: {ticket.destination}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Boarding Point: {ticket.boardingPoint}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Bus NO.{ticket.busNumber}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Ticket Fare: ₹{ticket.cost}</p>
                        </div>
                    ))}
                </div>
            )}

            <button
                className="mt-6 px-6 py-3 bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
        </div>
    );
}
