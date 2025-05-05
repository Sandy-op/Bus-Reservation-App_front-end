import React, { useState, useEffect } from "react";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";

const Theme = () => {
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);
    
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="dark:text-yellow-400 text-neutral-800 text-lg w-10 h-10 rounded-full bg-yellow-300 dark:bg-neutral-800/80 flex items-center justify-center"
        >
            {theme === "dark" ? <MdOutlineNightlightRound /> : <MdLightMode />}
        </button>
    );
};

export default Theme;
