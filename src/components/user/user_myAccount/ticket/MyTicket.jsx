import React, { useState, useEffect } from "react";
import axios from "axios";
import { LiaTimesSolid } from "react-icons/lia";

const MyTicket = ({ onClose }) => {
  const [ticketResponse, setTicketResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    if (!storedUser) {
      setError("User ID not found! Please log in.");
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/tickets/find-ticket/${storedUser.id}`
        );
        setTicketResponse(response.data);
      } catch (err) {
        setError("Failed to fetch ticket. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, []);

  const handleDownload = async (ticketId) => {
    setDownloading(ticketId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/tickets/download/${ticketId}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket_${ticketId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Ticket downloaded successfully!");
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Error downloading the ticket.");
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>;
  }

  if (error || !ticketResponse) {
    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">No Ticket Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{error || "Please book a ticket first."}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Close</button>
      </div>
    </div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl relative">
        <button className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white" onClick={onClose}>
          <LiaTimesSolid className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-4">🎟️ My Ticket</h1>
        <div className="max-h-[60vh] overflow-y-auto px-2 space-y-4">
          {ticketResponse?.data?.length > 0 ? (
            ticketResponse.data.map((ticket) => (
              <div key={ticket.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h1 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-2">🎟️ Ticket</h1>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p><strong>Ticket ID:</strong> {ticket.id}</p>
                  <p><strong>Name:</strong> {ticket.username}</p>
                  <p><strong>Seats:</strong> {ticket.numberOfSeatsBooked} ({ticket.bookedSeats.join(", ")})</p>
                  <p><strong>Bus:</strong> {ticket.busName}</p>
                  <p><strong>Route:</strong> {ticket.source} → {ticket.destination}</p>
                  <p><strong>Departure:</strong> {ticket.dateOfDeparture}, {ticket.departureTime}</p>
                  <p><strong>Boarding:</strong> {ticket.boardingPoint}</p>
                  <p><strong>Dropping:</strong> {ticket.droppingPoint}</p>
                  <p>
                    <strong>Status:</strong>
                    <span className={ticket.status === "BOOKED" ? "text-green-600" : "text-red-600"}>
                      {ticket.status}
                    </span>
                  </p>
                </div>
                <button 
                  onClick={() => handleDownload(ticket.id)} 
                  className="mt-3 w-full py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition flex justify-center items-center" 
                  disabled={downloading === ticket.id}
                >
                  {downloading === ticket.id ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    "Download Ticket"
                  )}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-center">No tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTicket;
