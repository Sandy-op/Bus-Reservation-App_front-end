import React, { useState } from 'react';
import axios from 'axios';
import { FaBus, FaTimes } from 'react-icons/fa';

const AddBus = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '', dateOfDeparture: '', busNumber: '', from: '', to: '',
        numberOfSeats: '', availableSeats: '', costPerSeat: '',
        reportingTime: '00:00', departureTime: '00:00',
        boardingPoint: '', droppingPoint: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const admin = JSON.parse(localStorage.getItem('Admin'));

    const addBusData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_URL}/api/buses/${admin.id}`, formData);
            alert('Bus Details Added Successfully');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Invalid Data Format');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm p-6 overflow-y-auto">
            <div className="relative w-full max-w-md bg-white bg-opacity-10 p-6 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-md mt-60">
                <button className="absolute top-3 right-3 text-white text-lg" onClick={onClose}><FaTimes /></button>
                <h2 className="text-center text-white text-2xl font-semibold flex items-center justify-center gap-2">
                    <FaBus className="text-yellow-400" /> Add New Bus
                </h2>
                <form onSubmit={addBusData} className="mt-4 space-y-3">
                    {Object.keys(formData).map((key) => (
                        <input
                            key={key}
                            type={key.includes('Time') ? 'time' : key === 'dateOfDeparture' ? 'date' : key.includes('Seats') || key === 'costPerSeat' ? 'number' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                            className="w-full px-4 py-2 text-white bg-gray-700 bg-opacity-50 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                            disabled={loading}
                        />
                    ))}
                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">{loading ? "Adding..." : "Add Bus"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBus;
