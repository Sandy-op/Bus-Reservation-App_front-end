import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { busDetails, selectedSeats } = location.state || {};
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_URL}/api/tickets/${busDetails.id}/${user.id}/${selectedSeats.length}/${selectedSeats}`
          );
          const ticketResponse =response.data;
          navigate('/bus/bus-details/checkout/ticket',{ state: { ticketResponse: ticketResponse } })
          alert('Ticket booked sucessfully!')
          console.log(ticketResponse.id);
          
          
        } catch (error) {
          setError(error.response.data.message); 
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        const savedUser = localStorage.getItem("User");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <div className='w-full px-4 sm:px-7 md:px-16 lg:px-28 my-[10ch]'>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-3 space-y-2 lg:pr-32">
                    <h2 className="text-xl py-3 text-neutral-800 dark:text-neutral-100 font-medium">
                        Passenger Information
                    </h2>
                    <div className="space-y-2">
                        <div>
                            <p className='block mb-2 font-semibold'>Full Name</p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.name}
                            </p>
                        </div>
                        <div>
                            <p className='block mb-2 font-semibold'>Email Address</p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.email}
                            </p>
                            <small className="block mt-1 text-green-500 dark:text-green-600 font-normal">
                                You will get your ticket via this email address.
                            </small>
                        </div>
                        <div>
                            <p className='block mb-2 font-semibold'>Phone No.</p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.phone}
                            </p>
                        </div>
                        <div>
                            <p className='block mb-2 font-semibold'>Age</p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.age}
                            </p>
                        </div>
                        <div>
                            <p className='block mb-2 font-semibold'>Gender</p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.gender}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-7 mt-auto">
                    <div className="bg-neutral-200/50 dark:bg-neutral-900/70 rounded-md py-5 px-7">
                        <h2 className="text-xl text-center py-3 text-neutral-800 dark:text-neutral-100 font-medium border-b-2 border-neutral-200 dark:border-neutral-800/40 pb-3 mb-4">
                            Your Booking Status
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                    Your Destination
                                </h6>
                                <div className="w-full flex items-center gap-x-3">
                                    <div className="w-fit text-base font-medium">
                                        From: <span className="ml-1">{busDetails.from}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-full h-[1px] border border-dashed border-neutral-400 dark:border-neutral-700/80"></div>
                                    </div>
                                    <div className="w-fit text-base font-medium">
                                        To: <span className="ml-1">{busDetails.to}</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-x-3">
                                    <div className="w-fit text-base font-medium">
                                        Arrive at: <span className="ml-1">{busDetails.reportingTime}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-full h-[1px] border border-dashed border-neutral-400 dark:border-neutral-700/80"></div>
                                    </div>
                                    <div className="w-fit text-base font-medium">
                                        Depart at: <span className="ml-1">{busDetails.departureTime}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-full flex items-center justify-between">
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            Selected seat no.
                                        </h6>
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            <div className="flex flex-wrap">
                                                {selectedSeats.map(seat => (
                                                    <div
                                                        key={seat}
                                                        className="w-10 h-10 rounded-md m-1.5 text-sm font-sm bg-violet-600/30 flex items-center justify-center">
                                                        {seat}
                                                    </div>
                                                ))}
                                            </div>

                                            <span className="text-xs">(Driver side)</span>
                                        </h6>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-full flex items-center justify-between">
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            Total Amount
                                        </h6>
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            Rs. {selectedSeats.length * busDetails.costPerSeat}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center gap-3">
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full px-8 h-12 bg-violet-600 text-neutral-50 text-base font-normal rounded-md flex items-center justify-center gap-x-2">
                            {loading ? 'Booking...' : 'Book Ticket'} <FaArrowRightLong />
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

