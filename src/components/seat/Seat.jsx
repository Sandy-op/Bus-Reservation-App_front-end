import { useState } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineChair } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';

const Seat = ({ isSelected, isBooked, onClick }) => {
    return (
        <MdOutlineChair
            className={`text-3xl -rotate-90 cursor-pointer ${isBooked ? 'text-rose-600' : isSelected ? 'text-violet-600' : 'text-green-500'
                }`}
            onClick={!isBooked ? onClick : null}
        />
    );
};

const BusSeatLayout = ({ busDetails, bookedSeats = [], onSeatsChange }) => {
    const totalSeats = busDetails.numberOfSeats || 40;
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seatNumber) => {
        const newSelectedSeats = selectedSeats.includes(seatNumber)
            ? selectedSeats.filter(seat => seat !== seatNumber)
            : selectedSeats.length < 10
                ? [...selectedSeats, seatNumber]
                : selectedSeats;

        if (newSelectedSeats !== selectedSeats) {
            setSelectedSeats(newSelectedSeats);
            if (onSeatsChange) {
                onSeatsChange(newSelectedSeats); 
            }
        } else if (selectedSeats.length >= 10) {
            alert("You can only select a maximum of 10 seats.");
        }
    };

    const renderSeats = () => {
        let seats = [];
        for (let i = 1; i <= totalSeats; i++) {
            const isBooked = bookedSeats.includes(i);
            const isSelected = selectedSeats.includes(i);
            seats.push(
                <Seat
                    key={i}
                    seatNumber={i}
                    isBooked={isBooked}
                    isSelected={isSelected}
                    onClick={() => handleSeatClick(i)}
                />
            );
        }
        return seats;
    };

    return (
        <div className="space-y-5 my-4">
            <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
                Choose a Seat
            </h2>
            <div className="flex flex-col lg:flex-row">
                {/* Seat Layout */}
                <div className="w-full flex flex-col">
                    <div className="w-full flex justify-center rotate-90 sm:rotate-0">
                        <div className="w-10 border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
                            <GiSteeringWheel className='text-3xl mt-6 text-violet-600 -rotate-90' />
                        </div>

                        {/* Seat Layout */}
                        <div className="flex flex-col items-center md:space-y-2 space-y-6 p-6 sm:p-6">
                            <div className="w-full grid grid-cols-10 gap-x-1.5">
                                {renderSeats().slice(0, 10)}
                            </div>
                            <div className="w-full grid grid-cols-10 gap-x-1.5">
                                {renderSeats().slice(10, 20)}
                            </div>
                            <div className="w-full grid grid-cols-10 gap-x-1.5">
                                <div className="col-span-9"></div>
                                {renderSeats().slice(20, 21)}
                            </div>
                            <div className="w-full grid grid-cols-10 gap-x-1.5">
                                {renderSeats().slice(21, 31)}
                            </div>
                            <div className="w-full grid grid-cols-10 gap-x-1.5">
                                {renderSeats().slice(31, 41)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions and Information */}
                <div className="space-y-4 mt-12 m-auto">
                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className='text-lg text-green-500 -rotate-90' />
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                            Available
                        </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className='text-lg text-rose-600 -rotate-90' />
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                            Booked
                        </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className='text-lg text-violet-600 -rotate-90' />
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                            Selected
                        </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <RiMoneyRupeeCircleLine className='text-lg text-yellow-600' />
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                            Rs. { }
                        </p>
                    </div>
                </div>
            </div>

            {/* Selected seats */}
            {selectedSeats.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-lg font-bold">
                        Selected Seats:
                    </h3>
                    <div className="flex flex-wrap">
                        {selectedSeats.map(seat => (
                            <div
                                key={seat}
                                className="w-10 h-10 rounded-md m-1.5 text-lg font-medium bg-violet-600/30 flex items-center justify-center">
                                {seat}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Calculated price */}
            {selectedSeats.length > 0 && (
                <div className="mt-5 flex items-center gap-x-4">
                    <h3 className="text-lg font-bold">
                        Total Fair Prices:
                    </h3>
                    <p className="text-lg font-medium">
                        Rs.{selectedSeats.length * busDetails.costPerSeat}
                    </p>
                    <span className="text-sm text-neutral-400 dark:text-neutral-600 font-normal">
                        (Including all taxes)
                    </span>
                </div>
            )}
        </div>
    );
};

export default BusSeatLayout;
