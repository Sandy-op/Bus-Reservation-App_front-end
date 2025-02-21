import React, { useState } from 'react';
import AddBus from '../../components/admin/AddBus';
import ViewAllBus from '../../components/admin/ViewAllBus';
import EditBus from '../../components/admin/EditBus';
import { FaBus, FaTicketAlt, FaEye, FaHome } from 'react-icons/fa';
import Theme from '../../components/Theme/Theme';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [isViewBusOpen, setIsViewBusOpen] = useState(false);
  const [isEditBusOpen, setIsEditBusOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName");

  const handleEditBus = (bus) => {
    setSelectedBus(bus);
    setIsEditBusOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black p-6">
      <div className='absolute top-8 right-16'><Theme /></div>
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-16 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition-all"
      >
        <FaHome />
      </button>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">Welcome, {adminName}</h1>
        <p className="text-lg text-purple-800 dark:text-yellow-300 p-4">Manage your bus reservation's with ease.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
        {['Total Buses', 'Total Bookings', "Today's Revenue"].map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all mx-auto w-60">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{item}</h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">108</p>
          </div>
        ))}
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Quick Actions</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              setIsAddBusOpen(true);
              setIsViewBusOpen(false);
              setIsEditBusOpen(false);
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
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition-all"
          >
            <FaEye /> View All Buses
          </button>
          <button
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
      </div>

    </div>
  );
};

export default AdminHomePage;
