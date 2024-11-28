// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Bus from '../../assets/bus9.png';
// import { FaStar } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom';
// import Destination from '../../components/desitnation/Destination';
// import BusSeatLayout from '../../components/seat/Seat';
// import DepartAt from '../../components/departtime/DepartAt';


// const Detail = () => {

//   const location = useLocation();
//   console.log("Login State on Redirect:", location.state);
//   const busDetails = location.state?.busDetails;
//   const [bookedSeats, setBookedSeats] = useState([]);


//   useEffect(() => {
//     const fetchBookedSeats = async () => {
//       if (busDetails && busDetails.id) {
//         try {
//           const response = await axios.get(
//             `${process.env.REACT_APP_URL}/api/tickets/bookedSeats/${busDetails.id}`
//           );
//           console.log("Response data:", response.data);
//           const seats = response.data?.data?.map(seat => Number(seat)) || [];
//           if (seats.length > 0) {
//             console.log("Parsed Booked Seats:", seats);
//             setBookedSeats(seats);
//           }
//         } catch (error) {
//           console.error("Error fetching booked seats:", error);
//         }
//       }
//     };
//     fetchBookedSeats();
//   }, [busDetails]);


//   return (
//     <div className='w-full lg:px-28 md:px-16 sm:px-7 my-[8ch]'>
//       <div className="w-full grid grid-cols-2 gap-16 items-center">
//         <div className="col-span-1 space-y-8">
//           <img src={Bus} alt="detail img" className="w-full aspect-[3/2] rounded-md object-contain" />
//           <div className="space-y-4">
//             <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
//               {busDetails.name}
//               <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">
//                 ({busDetails.busNumber})
//               </span>
//             </h1>
//             <div className="flex items-center gap-x-2">
//               <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600">
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//               </div>
//               <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
//                 (4.5)
//               </p>
//             </div>

//             <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nostrum. Distinctio nemo deleniti officiis dolor, esse repellat harum quaerat, similique dicta odio maiores perspiciatis quisquam.
//               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam sapiente alias eius ab dolor quaerat similique autem, repudiandae ea voluptate.
//             </p>
//           </div>
//         </div>
//         <div className="col-span-1 sapce-y-10">
//           <div className="space-y-6 mb-4">
//             <Destination busDetails={busDetails} />
//             <DepartAt busDetails={busDetails} />
//           </div>
//           <BusSeatLayout busDetails={busDetails} bookedSeats={bookedSeats || []} />
//           <div className="flex">
//             <Link
//               to={'/bus/bus-details/checkout'}
//               state={{ busDetails: busDetails }}
//               className='w-full bg-violet-600 text-neutral-50 font-medium text-base px-8 h-12 rounded-md hover:bg-violet-700 ease-in-out duration-300 flex items-center justify-center gap-x-2'
//               >
//               Processed to Checkout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Detail;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Bus from '../../assets/bus9.png';
import { FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Destination from '../../components/desitnation/Destination';
import BusSeatLayout from '../../components/seat/Seat';
import DepartAt from '../../components/departtime/DepartAt';

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
          const seats = response.data?.data?.map((seat) => Number(seat)) || [];
          setBookedSeats(seats);
        } catch (error) {
          console.error('Error fetching booked seats:', error);
        }
      }
    };
    fetchBookedSeats();
  }, [busDetails]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-28 my-[8ch]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Bus Image and Description */}
        <div className="">
          <img
            src={Bus}
            alt="Bus Detail"
            className="w-full aspect-[3/2] rounded-md object-contain"
          />
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              {busDetails.name}
              <span className="text-sm sm:text-base font-normal text-neutral-400 dark:text-neutral-500 ml-2">
                ({busDetails.busNumber})
              </span>
            </h1>
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-1 text-sm sm:text-base text-yellow-500 dark:text-yellow-600">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-neutral-900 dark:text-neutral-200 text-sm">
                (4.5)
              </p>
            </div>
            <p className="text-neutral-900 dark:text-neutral-200 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nostrum. 
              Distinctio nemo deleniti officiis dolor, esse repellat harum quaerat, 
              similique dicta odio maiores perspiciatis quisquam. Lorem ipsum dolor sit, 
              amet consectetur adipisicing elit. Laboriosam sapiente alias eius ab dolor 
              quaerat similique autem, repudiandae ea voluptate.
            </p>
          </div>
        </div>

        {/* Destination, Departure, Seat Layout */}
        <div className="flex flex-col justify-center h-full">
          <div className="space-y-5">
            <Destination busDetails={busDetails} />
            <DepartAt busDetails={busDetails} />
          </div>
          <BusSeatLayout busDetails={busDetails} bookedSeats={bookedSeats || []} />
          <div className="flex">
            <Link
              to="/bus/bus-details/checkout"
              state={{ busDetails }}
              className="w-full bg-violet-600 text-neutral-50 font-medium text-sm sm:text-base px-6 sm:px-8 h-10 sm:h-12 rounded-md hover:bg-violet-700 transition duration-300 flex items-center justify-center gap-x-2"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

