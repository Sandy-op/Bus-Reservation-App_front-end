import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaTimes } from 'react-icons/fa';
import EditUserProfile from './EditUserProfile';

const Profile = ({ onClose }) => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('User'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const handleProfileUpdate = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('User', JSON.stringify(updatedUser));
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center text-white">
                <p>No profile data found.</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm p-6">
            <div className="relative w-full max-w-md bg-white bg-opacity-10 p-6 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-md">
                <button className="absolute top-3 right-3 text-white text-lg" onClick={onClose}>
                    <FaTimes />
                </button>

                <h2 className="text-center text-white text-2xl font-semibold flex items-center justify-center gap-2">
                    <FaUserEdit className="text-blue-400" /> Profile
                </h2>

                {!isEditing ? (
                    <div className="mt-4 space-y-3 text-white">
                        {["name", "email", "phone", "age", "gender"].map((key) => (
                            <div key={key}>
                                <p className="text-sm text-gray-300 capitalize">{key}:</p>
                                <p className="text-lg font-medium">{user[key] || "N/A"}</p>
                            </div>
                        ))}

                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <EditUserProfile user={user} onUpdate={handleProfileUpdate} onClose={() => setIsEditing(false)} />
                )}
            </div>
        </div>
    );
};

export default Profile;
