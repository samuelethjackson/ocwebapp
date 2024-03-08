"use client"

import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes"

const InvertIcon: React.FC = () => {
    const { theme,setTheme } = useTheme()

    return (
        <div className='cursor-pointer transition-opacity duration-500 ease-in-out opacity-50 hover:opacity-100' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "light" ? (
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className='text-black dark:text-white stroke-current' cx="12.602" cy="12.4" r="5.2" strokeWidth="0.8" />
                <circle className='text-black dark:text-white fill-current' cx="16.602" cy="17.6" r="5.6" />
            </svg>
            ) : (
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className='text-black dark:text-white fill-current' cx="12.602" cy="12.6" r="5.6" />
                <circle className='text-black dark:text-white stroke-current' cx="16.602" cy="17.4" r="5.2" strokeWidth="0.8" />
            </svg>
            )}
        </div>
    );
};

export default InvertIcon;