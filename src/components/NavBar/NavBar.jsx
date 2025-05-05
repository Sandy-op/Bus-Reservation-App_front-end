import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBars, FaPhone, FaUser } from 'react-icons/fa';
import Theme from '../Theme/Theme';
import MyAccount from "../user/user_myAccount/MyAccount";


const NavBar = () => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("User") || localStorage.getItem("Admin");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/bus", label: "Bus" },
    ...(!isLoggedIn ? [{ href: "/userAuth", label: "Login/SignUp" }] : []),
  ];

  return (
    <div className="w-full h-[8ch] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-between px-4 sm:px-7 md:px-16 lg:px-28 fixed top-0 z-50">
      {/* Logo Section */}
      <Link to="/" className="mr-16">
        <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
      </Link>

      {/* Navigation Links (Desktop) */}
      <div className="hidden lg:flex flex-1 items-center gap-x-5 text-neutral-600 dark:text-neutral-500 font-medium">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="no-underline text-neutral-600 dark:text-neutral-50 dark:hover:text-violet-600 hover:text-violet-600 hover:underline ease-in-out duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Section: Need Help & Theme (Visible when not logged in) */}
      <div className="hidden lg:flex items-center gap-x-5">
        {!isLoggedIn ? (
          <>
            {/* Admin Button on lg */}
            <div className="mr-8 lg:flex hidden ">
              <Link
                to={'/adminAuth'}
                className='w-fit bg-red-500 text-neutral-50 no-underline font-medium text-base px-6 py-2 rounded-md hover:bg-gray-500 ease-in-out duration-300'>
                Admin
              </Link>
            </div>

            {/* Need Help */}
            <div className="relative bg-violet-600 rounded-md px-8 py-2 w-fit cursor-pointer">
              <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-9 h-9 rounded-full bg-violet-600 border-4 border-neutral-100 dark:border-neutral-900 flex items-center justify-center">
                <FaPhone className="text-neutral-50 text-sm" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-neutral-200 font-light">Need Help?</p>
                <p className="text-xs font-normal text-neutral-50 tracking-wide">+91 9931122072</p>
              </div>
            </div>
          </>
        ) : (
          /* Show My Account when logged in */
          <button
            onClick={() => setAccountDrawerOpen(true)}
            className="flex items-center gap-x-2 text-neutral-600 dark:text-neutral-50 hover:text-violet-600 ease-in-out duration-300"
          >
            <FaUser className="text-lg" />
            <span>My Account</span>
          </button>
        )}

        {/* Theme Toggle Button */}
        <Theme />
      </div>



      {/* Hamburger Menu Button (Mobile) */}
      <button
        onClick={() => setMenuDrawerOpen(true)}
        className="lg:hidden text-neutral-600 dark:text-neutral-300 ease-in-out duration-300 flex items-center justify-end"
      >
        <FaBars className="text-xl" />
      </button>

      {/*  Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-neutral-50 dark:bg-neutral-800 shadow-xl transform ${menuDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Menu</h2>
          <button onClick={() => setMenuDrawerOpen(false)} className="text-neutral-600 dark:text-neutral-300">
            <LiaTimesSolid className="text-2xl" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col p-6 gap-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-neutral-700 dark:text-neutral-50 hover:text-violet-600"
              onClick={() => setMenuDrawerOpen(false)} // Close drawer when clicked
            >
              {link.label}
            </Link>
          ))}

          {/* Admin Button (Inside Mobile Drawer) */}
          {!isLoggedIn && (
            <Link
              to="/adminAuth"
              className="block text-neutral-700 dark:text-neutral-50 hover:text-violet-600 bg-red-500 text-center font-medium px-6 py-2 rounded-md"
              onClick={() => setMenuDrawerOpen(false)}
            >
              Admin
            </Link>
          )}
          {/* My Account inside the Mobile Menu */}
          {isLoggedIn && (
            <button
              onClick={() => {
                setAccountDrawerOpen(true);
                setMenuDrawerOpen(false);
              }}
              className="flex items-center gap-x-3 text-neutral-700 dark:text-neutral-50 hover:text-violet-600 mt-5 border-t border-neutral-300 dark:border-neutral-700 pt-3"
            >
              <FaUser className="text-lg" />
              <span>My Account</span>
            </button>
          )}

          {/* Theme Button inside Mobile Menu */}
          <div className="mt-5">
            <Theme />
          </div>
        </div>
      </div>

      <MyAccount isOpen={accountDrawerOpen} onClose={() => setAccountDrawerOpen(false)} />

      {/* Overlay for both drawers */}
      {
        (menuDrawerOpen || accountDrawerOpen) && (
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => {
            setMenuDrawerOpen(false);
            setAccountDrawerOpen(false);
          }}></div>
        )
      }
    </div >
  );
};

export default NavBar;
