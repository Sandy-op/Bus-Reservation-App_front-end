import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TicketDownload = () => {
  const location = useLocation();
  
  const getStoredData = () => {
    if (location.state?.ticketResponse) {
      return location.state.ticketResponse;
    }
    const storedData = localStorage.getItem("ticketResponse");
    return storedData ? JSON.parse(storedData).ticketResponse : [];
  };
  
  const ticketResponse = getStoredData();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!ticketResponse || !ticketResponse.id) {
      alert("🚨 No ticket information found! Did your ticket vanish into the multiverse?");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/tickets/download/${ticketResponse.id}`,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket_${ticketResponse.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert(`🎉 Ticket downloaded successfully! Have an epic journey, ${ticketResponse.username}!`);
      navigate('/');
    } catch (error) {
      console.error('Error downloading the PDF:', error);
      alert("😭 Oh no! The ticket couldn't be downloaded. Curse the digital gremlins!");
    } finally {
      setLoading(false);
    }
  };

  if (!ticketResponse) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <h1 className="text-5xl font-extrabold mb-4 animate-pulse">🙈 Uh-oh!</h1>
        <p className="text-lg font-medium">
          Looks like you're lost in the ticket-less dimension. 🌀 Book a ticket first!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-600 text-white p-8 mt-[8ch]">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-10 transform hover:rotate-1 hover:scale-105 transition-all duration-500">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
          🎟️ Ticket Confirmed: Ready for Adventure!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-gray-700">
            <p><strong>🆔 Ticket ID:</strong> {ticketResponse.id}</p>
            <p><strong>🧑 Name:</strong> {ticketResponse.username}</p>
            <p><strong>🎂 Age:</strong> {ticketResponse.age}</p>
            <p><strong>⚧ Gender:</strong> {ticketResponse.gender}</p>
            <p><strong>📱 Phone No.:</strong> {ticketResponse.phone}</p>
            <p><strong>💰 Cost:</strong> ₹{ticketResponse.cost}</p>
            <p><strong>🔑 Status:</strong> {ticketResponse.status}</p>
            <p><strong>🚌 Bus Name:</strong> {ticketResponse.busName}</p>
          </div>
          <div className="space-y-4 text-gray-700">
            <p><strong>🚩 Source:</strong> {ticketResponse.source}</p>
            <p><strong>🏁 Destination:</strong> {ticketResponse.destination}</p>
            <p><strong>🔢 Bus Number:</strong> {ticketResponse.busNumber}</p>
            <p><strong>📅 Date Of Departure:</strong> {ticketResponse.dateOfDeparture}</p>
            <p><strong>💺 Seats Booked:</strong> {ticketResponse.numberOfSeatsBooked}</p>
            <p><strong>⏰ Reporting Time:</strong> {ticketResponse.reportingTime}</p>
            <p><strong>🛫 Departure Time:</strong> {ticketResponse.departureTime}</p>
            <p><strong>📍 Boarding Point:</strong> {ticketResponse.boardingPoint}</p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className={`mt-10 w-full py-3 px-6 text-white text-lg font-bold rounded-full shadow-xl transition-all duration-500 transform ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-l animate-bounce'}`}
          disabled={loading}
        >
          {loading ? '⏳ Downloading...' : '🚀 Download My Ticket'}
        </button>
      </div>
    </div>
  );
};

export default TicketDownload;
