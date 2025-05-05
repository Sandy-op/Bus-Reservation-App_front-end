import React from "react";
import { Link } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { FaUser, FaTicketAlt, FaSignOutAlt } from "react-icons/fa";
import useLogout from "../../security/AuthContext";

const AdminMyAccount = ({ isOpen, onClose, openProfile }) => {
    const logout = useLogout();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
            onClose();
        }
    };

    return (
        <>
            {/* Sidebar Drawer */}
            <div
                className={`fixed top-0 right-0 h-screen w-80 bg-neutral-50 dark:bg-neutral-800 shadow-xl transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Drawer Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">
                        My Account
                    </h2>
                    <button onClick={onClose} className="text-neutral-600 dark:text-neutral-300 hover:text-red-500">
                        <LiaTimesSolid className="text-2xl" />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="flex flex-col p-6 gap-y-4">
                    <button
                        className="flex items-center gap-x-3 text-neutral-700 dark:text-neutral-50 hover:text-violet-500 transition-all"
                        onClick={openProfile}
                    >
                        <FaUser className="text-lg" />
                        <span>Profile</span>
                    </button>

                    <Link
                        to="/my-tickets"
                        className="flex items-center gap-x-3 text-neutral-700 dark:text-neutral-50 hover:text-violet-500 transition-all"
                        onClick={onClose}
                    >
                        <FaTicketAlt className="text-lg" />
                        <span>My Tickets</span>
                    </Link>

                    <button
                        className="flex items-center gap-x-3 text-red-500 hover:text-red-600 transition-all"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminMyAccount;
