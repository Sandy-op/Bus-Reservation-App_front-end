import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const InfoMessage = () => {
    const [showModal, setShowModal] = useState(false);
    const requestCount = useRef(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisited");

        if (!hasVisited) {
            setShowModal(true);
            localStorage.setItem("hasVisited", "true");
        }

        const requestInterceptor = axios.interceptors.request.use((config) => {
            requestCount.current++;

            // If request takes more than 5s, show modal
            timeoutRef.current = setTimeout(() => {
                if (requestCount.current > 0) setShowModal(true);
            }, 5000);

            return config;
        });
        
        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                requestCount.current--;
                clearTimeout(timeoutRef.current);
                if (requestCount.current === 0) setShowModal(false);
                return response;
            },
            (error) => {
                requestCount.current--;
                clearTimeout(timeoutRef.current);
                if (requestCount.current === 0) setShowModal(false);
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full text-center transform transition-all duration-300">
                <h2 className="text-xl font-bold text-red-600 mb-3">⏳ Please Note!</h2>
                <p className="text-gray-700 leading-relaxed">
                    The first request may take <span className="font-bold">5-7 minutes </span>
                    as the backend server on Render sleeps after <span className="font-bold">15 minutes</span> of inactivity.
                    After that, every request works <span className="text-green-600 font-bold">instantly!</span> 🚀
                </p>
                <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

export default InfoMessage;