import React from 'react'
import { FaMapPin } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full lg:px-28 md:px-16 sm:px-7 px-4 py-8 bg-blue-200/60 dark:bg-neutral-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        
        <div className="space-y-5 col-span-2">
          <Link to="/" className='text-xl text-neutral-800 dark:text-neutral-200 font-bold'>
            <img src={Logo} alt="logo" className="w-44 h-auto object-contain" />
          </Link>
          <p className="text-neutral-600 dark:text-neutral-500 text-base font-normal pr-10">
            Gbus is an innovative online bus ticketing platform designed to make your travel experience seamless and hassle-free.
            With Gbus, users can search, compare, and book bus tickets for a variety of routes effortlessly.
            Our user-friendly interface ensures quick navigation, while real-time seat availability and detailed bus information empower travelers to make informed decisions.
            Whether you're planning a short trip or a long journey, Gbus connects you to reliable bus operators, offering convenience, comfort, and value for your travel needs.
          </p>
        </div>

        <div className="space-y-7">
          <h1 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">About Us</h1>
          <ul className="space-y-2 text-blue-600 dark:text-blue-500 text-base font-normal">
            <li><Link to="/about" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>About Us</Link></li>
            <li><Link to="#" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>Contact Us</Link></li>
            <li><Link to="#" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>Privacy Policy</Link></li>
            <li><Link to="#" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>Terms and Conditions</Link></li>
          </ul>
        </div>

        <div className="space-y-7">
          <h1 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Services</h1>
          <ul className="space-y-2 text-blue-600 dark:text-blue-500 text-base font-normal">
            <li><Link to="#" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>Safety Guarantee</Link></li>
            <li><Link to="#" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>FAQ & Support</Link></li>
            <li><Link to="#" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>Luxury Buses</Link></li>
            <li><Link to="#" className='hover:text-violet-600 hover:underline ease-in-out duration-300'>Enough Facilities</Link></li>
          </ul>
        </div>

        <div className="space-y-7">
          <h1 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Get In Touch</h1>
          <div className="space-y-4">
            <div className="flex gap-x-2">
              <FaMapPin className='text-2xl text-neutral-600 dark:text-neutral-500' />
              <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-500">For Support & Reservations</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">93/b, Industrial Area, Patna, BHARAT</p>
              </div>
            </div>
            <div className="flex gap-x-2">
              <FaMapPin className='text-2xl text-neutral-600 dark:text-neutral-500' />
              <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-500">For Support & Reservations</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">NH-306, Hajipur, Vaishali, BHARAT</p>
              </div>
            </div>
            <div className="flex gap-x-2">
              <FaMapPin className='text-2xl text-neutral-600 dark:text-neutral-500' />
              <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-500">For Support & Reservations</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">123, Deep Town, Bengaluru, BHARAT</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
