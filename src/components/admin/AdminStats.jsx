import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRupeeSign } from 'react-icons/fa';

const AdminStats = () => {
  const [stats, setStats] = useState({ buses: 0, bookings: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [busesRes, bookingsRes, revenueRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_URL}/api/buses`),
          axios.get(`${process.env.REACT_APP_URL}/api/tickets`),
          axios.get(`${process.env.REACT_APP_URL}/api/tickets/totalRevenue`)
        ]);

        setStats({
          buses: busesRes.data.data.length,
          bookings: bookingsRes.data.data.length,
          revenue: revenueRes.data?.data || 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-300">Loading stats...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
      {[
        { title: "Total Buses", value: stats.buses },
          { title: "Total Bookings", value: stats.bookings },
        { title: "Total Revenue", value: <><FaRupeeSign className="mr-1 text-white" /> {stats.revenue}</> }
      ].map((item, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all mx-auto w-60">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{item.title}</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-4 flex items-center justify-center">
            {item.value}
          </p>
        </div>
      ))}

    </section>
  );
};

export default AdminStats;
