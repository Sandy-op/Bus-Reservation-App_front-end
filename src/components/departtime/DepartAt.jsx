const DepartAt = ({ busDetails }) => {
    return (
        <div className='w-full space-y-4'>
            <div className="space-y-5">
                <div className="w-full flex items-center gap-x-3">
                    <div className="w-fit text-base font-semibold">
                        Bus Depart at:- <span className="m1-1.5 font-bold">{busDetails.departureTime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartAt