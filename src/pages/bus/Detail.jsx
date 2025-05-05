import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Destination from "../../components/desitnation/Destination";
import BusSeatLayout from "../../components/seat/Seat";
import DepartAt from "../../components/departtime/DepartAt";

import bus1 from "../../assets/bg1.jpg";
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

const getBusImage = (id) => {
  if (!id) return busImages[0];
  return busImages[id % busImages.length];
};

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getStoredData = () => {
    if (location.state?.busDetails) {
      return location.state.busDetails;
    }
    const storedData = localStorage.getItem("busDetails");
    return storedData ? JSON.parse(storedData).busDetails : [];
  };

  const busDetails = getStoredData();
  const busImage = getBusImage(busDetails?.id);

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const isDisabled = selectedSeats.length === 0;

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (busDetails?.id) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_URL}/api/tickets/bookedSeats/${busDetails.id}`
          );
          const seats = response.data?.data?.map((seat) => Number(seat)) || [];
          setBookedSeats(seats);
        } catch (error) {
          console.error("Error fetching booked seats:", error);
        }
      }
    };
    fetchBookedSeats();
  }, [busDetails]);

  const handleSeatsChange = (seats) => {
    setSelectedSeats(seats);
  };

  const handleProceed = () => {
    if (isDisabled) {
      alert("🚨 Please select at least one seat before proceeding!");
      return;
    }

    localStorage.setItem("busDetails", JSON.stringify(busDetails));
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    navigate("/bus/bus-details/checkout", {
      state: { busDetails, selectedSeats },
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-28 my-[8ch]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Bus Image and Description */}
        <div>
          <img
            src={busImage}
            alt="Bus Detail"
            className="w-full aspect-[3/2] rounded-md object-contain"
          />
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              {busDetails?.name}
              <span className="text-sm sm:text-base font-normal text-neutral-400 dark:text-neutral-500 ml-2">
                ({busDetails?.busNumber})
              </span>
            </h1>
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-1 text-sm sm:text-base text-yellow-500 dark:text-yellow-600">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-neutral-900 dark:text-neutral-200 text-sm">
                (4.5)
              </p>
            </div>
            <div>
              <h2 class="text-xl font-bold mb-2">🚌 About Our Buses</h2>
              <p class="text-gray-700 dark:text-gray-200">
                Travel comfortably in our modern buses with <strong>AC, recliner seats</strong>, and essential amenities. Enjoy a smooth journey with professional drivers and timely departures. <br />
                <strong>Sit back, relax, and let us handle the rest! 🌟</strong>
              </p>

            </div>
          </div>
        </div>

        {/* Destination, Departure, Seat Layout */}
        <div className="flex flex-col justify-center h-full">
          <div className="space-y-5">
            <Destination busDetails={busDetails} />
            <DepartAt busDetails={busDetails} />
          </div>
          <BusSeatLayout
            busDetails={busDetails}
            bookedSeats={bookedSeats}
            onSeatsChange={handleSeatsChange}
          />
          <div className="flex">
            <button
              onClick={handleProceed}
              disabled={isDisabled}
              className={`w-full font-medium text-sm sm:text-base px-6 sm:px-8 h-10 sm:h-12 rounded-lg transition-all duration-300 flex items-center justify-center gap-x-2
            ${isDisabled
                  ? "cursor-not-allowed opacity-75 bg-gray-400"
                  : "bg-violet-600 text-white hover:bg-violet-700 hover:scale-105 shadow-md shadow-violet-500/40"
                }`}
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Detail;
