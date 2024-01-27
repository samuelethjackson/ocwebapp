"use client"

import local from 'next/font/local';
import React, { useEffect, useState } from 'react';

const InvertIcon: React.FC = () => {
    const [darkMode, setdarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") setdarkMode(true)
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])

    return (
        <div className='cursor-pointer' onClick={() => setdarkMode(!darkMode)}>
            {darkMode ? (
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className='text-black dark:text-white fill-current' cx="12.602" cy="12.6" r="5.6" />
                    <circle className='text-black dark:text-white stroke-current' cx="16.602" cy="17.4" r="5.2" strokeWidth="0.8" />
                </svg>
            ) : (
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className='text-black dark:text-white stroke-current' cx="12.602" cy="12.4" r="5.2" strokeWidth="0.8" />
                    <circle className='text-black dark:text-white fill-current' cx="16.602" cy="17.6" r="5.6" />
                </svg>
            )}
        </div>
    );
};

export default InvertIcon;