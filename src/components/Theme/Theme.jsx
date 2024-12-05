import React, { useState, useEffect } from "react";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";


const Theme = () => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState(localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light'));


    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme',theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <button onClick={toggleTheme} className='dark:text-yellow-400 text-neutral-800 text-lg w-10 h-10 rounded-full bg-yellow-300 dark:bg-neutral-800/80 flex items-center justify-center'>
            {
                theme === 'dark'
                    ?
                    <MdOutlineNightlightRound />
                    :
                    <MdLightMode />
            }
        </button>
    )
}

export default Theme