import React from 'react';

const AdminHomePage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black p-6">
      {/* Welcome Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
          Welcome, Admin
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          Manage your bus reservation system with ease.
        </p>
      </header>

      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 ">
        {['Total Buses', 'Total Bookings', "Today's Revenue"].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{item}</h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">123</p>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          {['Add Bus', 'Add Route', 'Manage Bookings', 'View Reports'].map((action, index) => (
            <button
              key={index}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              {action}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminHomePage;

