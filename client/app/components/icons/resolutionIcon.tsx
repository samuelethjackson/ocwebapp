"use client"

import React, { useState } from 'react';

interface ResolutionIconProps {
    highRes: boolean;
    setHighRes: (value: boolean) => void;
}

const ResolutionIcon: React.FC<ResolutionIconProps> = ({ highRes, setHighRes }) => {

    const handleClick = () => {
        setHighRes(!highRes);
    };

    return (
        <div className='cursor-pointer' onClick={handleClick}>
            {highRes ? (
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='text-black dark:text-white stroke-current' x="5.20078" y="7.4" width="11.2" height="11.2" rx="1.2" strokeWidth="0.8" />
                <path className='text-black dark:text-white stroke-current' d="M10.8008 7.40015V18.6001" strokeWidth="0.8" />
                <path className='text-black dark:text-white stroke-current' d="M16.8008 13L5.60078 13" strokeWidth="0.8" />
                <rect className='text-black dark:text-white fill-current' x="14" y="11" width="12" height="12" rx="1.6" />
            </svg>
            ) : (
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className='text-black dark:text-white fill-current' x="5" y="7" width="12" height="12" rx="1.6" />
                <rect className='text-black dark:text-white stroke-current' x="14.2008" y="11.4" width="11.2" height="11.2" rx="1.2" strokeWidth="0.8" />
                <path className='text-black dark:text-white stroke-current' d="M19.8008 11.4001V22.6001" strokeWidth="0.8" />
                <path className='text-black dark:text-white stroke-current' d="M25.8008 17L14.6008 17" strokeWidth="0.8" />
            </svg>
            )}
        </div>
    );
};

export default ResolutionIcon;
