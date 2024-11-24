import React, { useEffect, useState } from 'react'
import Bus from '../../assets/bus9.png';
import { FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Destination from '../../components/desitnation/Destination';
import BusSeatLayout from '../../components/seat/Seat';
import DepartAt from '../../components/departtime/DepartAt';
import axios from 'axios';


const Detail = () => {

  const location = useLocation();
  const busDetails = location.state?.busDetails;
  const [bookedSeats, setBookedSeats] = useState([]);

useEffect(() => {
  const fetchBookedSeats = async () => {
      if (busDetails && busDetails.id) {
          try {
              const response = await axios.get(
                  `${process.env.REACT_APP_URL}/api/tickets/bookedSeats/${busDetails.id}`
              );
              console.log("Response data:", response.data);

              // Extract the data and ensure it's an array of numbers
              const seats = response.data?.data?.map(seat => Number(seat)) || [];
              if (seats.length > 0) {
                    console.log("Parsed Booked Seats:", seats);
                    setBookedSeats(seats); // Set booked seats
                }
          } catch (error) {
              console.error("Error fetching booked seats:", error);
          }
      }
  };
  fetchBookedSeats();
}, [busDetails]);


  return (
    <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch] '>
      <div className="w-full grid grid-cols-2 gap-16 items-center">
        <div className="col-span-1 space-y-8">
          <img src={Bus} alt="detail img" className="w-full aspect-[3/2] rounded-md object-contain" />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              {busDetails.name}
              <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">
                ({busDetails.busNumber})
              </span>
            </h1>
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                (4.5)
              </p>
            </div>

            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nostrum. Distinctio nemo deleniti officiis dolor, esse repellat harum quaerat, similique dicta odio maiores perspiciatis quisquam.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam sapiente alias eius ab dolor quaerat similique autem, repudiandae ea voluptate.
            </p>
          </div>
        </div>
        <div className="col-span-1 sapce-y-10">
          <div className="space-y-6 mb-4">
            {/* {Destination card} */}
            <Destination busDetails={busDetails} />

            {/* { Departure card} */}
            <DepartAt busDetails={busDetails} />
          </div>

          {/* {Seat Selection } */}
          <BusSeatLayout busDetails={busDetails} bookedSeats={bookedSeats || []} />

          {/* {Checkout Btn} */}
          <div className="flex">
            <Link
              to={'/bus/bus-details/checkout'}
              state={{ busDetails: busDetails}}
              className='w-fit bg-violet-600 text-neutral-50 font-medium text-base px-6 py-2 rounded-md hover:bg-violet-700 ease-in-out duration-300'>
              Processed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail