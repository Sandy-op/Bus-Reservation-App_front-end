import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link, Navigate, useLocation } from 'react-router-dom';

const Checkout = () => {

    const location = useLocation();
    const busDetails = location.state?.busDetails;
    const [user, setUser] = useState([]);

    useEffect(() => {
        const savedUser = localStorage.getItem("User");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    if (!busDetails) {
        return <Navigate to="/some-error-page" />;
    }

    return (
        <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[10ch] mb-[8ch] '>
            <div className="grid grid-cols-5 gap-16 items-start">
                <div className="col-span-3 space-y-2 pr-32">
                    <h2 className="text-xl py-3 text-neutral-800 dark:text-neutral-100 font-medium">
                        Passenger Information
                    </h2>
                    <div className="sapce-y-6">
                        <div className="">
                            <p className='block mb-2 font-semibold'>
                                Full Name
                            </p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.name}
                            </p>
                        </div>
                        <div className="">
                            <p htmlFor="email" className='block mb-2 font-semibold'>
                                Email Address
                            </p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.email}
                            </p>
                            <small className="block mt-1-xs text-green-500 dark:text-green-600 font-normal">
                                You will get your ticket via this email address.
                            </small>
                        </div>
                        <div className="">
                            <p htmlFor="phone" className='block mb-2 font-semibold'>
                                Phone No.
                            </p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.phone}
                            </p>
                        </div>
                        <div className="">
                            <p className='block my-2 font-semibold'>
                                Age
                            </p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.age}
                            </p>
                        </div>
                        <div className="">
                            <p className='block my-2 font-semibold'>
                                Gender
                            </p>
                            <p className='w-full appearance-none flex items-center text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-10 border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800'>
                                {user.gender}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 space-y-7">
                    <div className="bg-neutral-200/50 dark:bg-neutral-900/70 rounded-md-py-5 px-7">
                        <h2 className="text-xl text-center py-3 text-neutral-800 dark:text-neutral-100 font-medium border-b-2 border-neutral-200 dark:border-neutral-800/40 pb-3 mb-4">
                            Your Booking Status
                        </h2>

                        <div className="space-y-8 pb-3">
                            <div className="space-y-4">
                                <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-meduim">
                                    Your Destination
                                </h6>

                                <div className="w-full flex items-center gap-x-3">
                                    <div className="w-fit text-base font-medium">
                                        From:- <span className="ml-1 5">
                                            {busDetails.from}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-full h-[1px] border border-dashed-neutral-400 dark:border-neutral-700/80"></div>
                                    </div>
                                    <div className="w-fit text-base font-medium">
                                        To:- <span className="ml-1 5">
                                            {busDetails.to}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-x-3">
                                    <div className="w-fit text-base font-medium">
                                        Arrive at:- <span className="ml-1 5">
                                            {busDetails.reportingTime}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-full h-[1px] border border-dashed-neutral-400 dark:border-neutral-700/80"></div>
                                    </div>
                                    <div className="w-fit text-base font-medium">
                                        Depart at:- <span className="ml-1 5">
                                            {busDetails.departureTime}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-full flex items-center justify-between">
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            Total No. of Seats
                                        </h6>
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            {busDetails.numberOfSeats} <span className="text-xs">
                                                (Driver side)
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-full flex items-center justify-between">
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            Total Amount
                                        </h6>
                                        <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                                            Rs. {busDetails.costPerSeat}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full px-8 h-12 bg-violet-600 text-neutral-50 text-base font-normal rounded-md flex items-center justify-center gap-x-2">
                        Book Ticket <FaArrowRightLong />
                    </button>
                    <div className="w-full px-8 h-12 bg-violet-600 text-neutral-50 text-base font-normal rounded-md flex items-center justify-center gap-x-2">
                    <Link
                    to={'/bus/bus-details/checkout/ticket'}
                    state={{ busDetails: busDetails, user: user }}
                    >
                    Processed to Checkout
                    </Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;