import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserEdit, FaTimes } from 'react-icons/fa';

const EditAdminProfile = ({ admin, onClose }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (admin) {
            setFormData({ ...admin });
        }
    }, [admin]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateProfileData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`${process.env.REACT_APP_URL}/api/admins/${admin.id}`, formData);
            alert('Profile updated successfully');
            setLoading(false);
            onClose();  // Ensure UI updates correctly
        } catch (err) {
            console.error(err);
            alert('Failed to update profile');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm p-6">
            <div className="relative w-full max-w-md bg-white bg-opacity-10 p-6 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-md">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <button className="absolute top-3 right-3 text-white text-lg" onClick={onClose}>
                            <FaTimes />
                        </button>

                        <h2 className="text-center text-white text-2xl font-semibold flex items-center justify-center gap-2">
                            <FaUserEdit className="text-blue-400" /> Edit Profile
                        </h2>

                        <form onSubmit={updateProfileData} className="mt-4 space-y-3">
                            {Object.keys(formData).map((key) => 
                                key !== "password" && key !== "gst_number" && (
                                    <input
                                        key={key}
                                        type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                                        className="w-full px-4 py-2 text-white bg-gray-700 bg-opacity-50 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                        hidden={key === 'id'}
                                    />
                                )
                            )}
                            <div>
                                <p className="text-sm text-gray-300">GST Number:</p>
                                <p className="w-full px-4 py-2 text-white bg-gray-700 bg-opacity-50 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    {formData.gst_number || "N/A"}
                                </p>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                                    Update
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditAdminProfile;
