import React, { useState } from 'react';
import AddBus from '../../components/admin/AddBus';
import ViewAllBus from '../../components/admin/ViewAllBus';
import EditBus from '../../components/admin/EditBus';
import { FaBus, FaTicketAlt, FaEye, FaHome, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import Theme from '../../components/Theme/Theme';
import { useNavigate } from 'react-router-dom';
import AdminStats from '../../components/admin/AdminStats';
import AllTickets from '../../components/admin/AllTickets';
import AdminMyAccount from '../../components/admin/admin_myAccount/AdminMyAccount';
import AdminProfile from '../../components/admin/admin_myAccount/AdminProfile';
import useLogout from '../../components/security/AuthContext';

const AdminHomePage = () => {
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [isViewBusOpen, setIsViewBusOpen] = useState(false);
  const [isEditBusOpen, setIsEditBusOpen] = useState(false);
  const [isAllTicketOpen, setIsAllTicketOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAccountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const logout = useLogout();

  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName");

  const handleEditBus = (bus) => {
    setSelectedBus(bus);
    setIsEditBusOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black p-6 relative">

      {/* Hamburger Menu Button */}
      <div className="absolute top-4 left-4 md:hidden z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Left Sliding Sidebar for Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <button
            onClick={() => {
              logout()
              navigate("/")
            }} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <FaHome /> Home
          </button>
          <button
            onClick={() => {
              setAccountDrawerOpen(true);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200"
          >
            <FaUser /> My Account
          </button>
          <Theme />
        </div>
      </div>

      {/* Overlay Click to Close Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Home, Theme, and My Account Buttons for Larger Screens */}
      <div className="hidden md:flex absolute top-9 right-64"><Theme /></div>
      <button
        onClick={() => {
          logout()
          navigate("/")
        }}
        className="hidden md:flex absolute top-8 left-16 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all"
      >
        <FaHome />
      </button>
      <button
        onClick={() => setAccountDrawerOpen(true)}
        className="hidden md:flex absolute top-8 right-16 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all"
      >
        <FaUser className="text-lg" />
        <span>My Account</span>
      </button>

      <header className="text-center mb-8 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">Welcome, {adminName}</h1>
        <p className="text-lg text-purple-800 dark:text-yellow-300 p-4">Manage your bus reservation with ease.</p>
      </header>

      <AdminStats />

      <section className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setIsAddBusOpen(true);
              setIsViewBusOpen(false);
              setIsEditBusOpen(false);
              setIsAllTicketOpen(false);
              setAccountDrawerOpen(false);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            <FaBus /> Add Bus
          </button>
          <button
            onClick={() => {
              setIsViewBusOpen(true);
              setIsAddBusOpen(false);
              setIsEditBusOpen(false);
              setIsAllTicketOpen(false);
              setAccountDrawerOpen(false);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition-all"
          >
            <FaEye /> View All Buses
          </button>
          <button
            onClick={() => {
              setIsAllTicketOpen(true);
              setIsViewBusOpen(false);
              setIsAddBusOpen(false);
              setIsEditBusOpen(false);
              setAccountDrawerOpen(false);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all"
          >
            <FaTicketAlt /> View All Tickets
          </button>
        </div>
      </section>

      <div className="flex justify-center items-center">
        {isAddBusOpen && <AddBus onClose={() => setIsAddBusOpen(false)} />}
        {isViewBusOpen && <ViewAllBus onEditBus={handleEditBus} />}
        {isEditBusOpen && selectedBus && <EditBus bus={selectedBus} onClose={() => setIsEditBusOpen(false)} />}
        {isAllTicketOpen && <AllTickets onClose={() => setIsAllTicketOpen(false)} />}

        {/* MyAccount Sidebar */}
        {isAccountDrawerOpen && (
          <AdminMyAccount
            isOpen={isAccountDrawerOpen}
            onClose={() => setAccountDrawerOpen(false)}
            openProfile={() => {
              setAccountDrawerOpen(false); // Close MyAccount
              setTimeout(() => setIsProfileOpen(true), 300); // Open Profile after delay
            }}
          />
        )}

        {/* Profile Modal */}
        {isProfileOpen && <AdminProfile onClose={() => setIsProfileOpen(false)} />}
      </div>
    </div>
  );
};

export default AdminHomePage;
