"use client"

import { useState, useEffect } from 'react';
import { SidebarTrigger } from '../ui/sidebar';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollThreshold = 10; // Pixels scrolled down to trigger the change

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has scrolled past the threshold
            if (window.scrollY > scrollThreshold) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Base classes for the navbar
    const baseClasses = 'fixed top-0 left-0 w-full z-10 transition-all duration-100 ease-in-out';

    // Classes for the default (top) state: transparent background, transparent border
    const defaultStateClasses = 'bg-transparent border-transparent';

    // Classes for the scrolled state: white background, gray border, subtle shadow
    const scrolledStateClasses = 'bg-white border-b sm:border-0 border-gray-200';

    return (
        <header
            className={`${baseClasses} ${isScrolled ? scrolledStateClasses : defaultStateClasses
                }`}
        >
            <div className='flex items-center justify-between px-6 py-4'>
                <div className='hidden sm:flex'>
                </div>
                <div className='flex sm:hidden'>
                    <SidebarTrigger />
                </div>
                <a
                    href="https://t.me/gorkamanager"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C8384] hover:text-blue-600 transition-colors"
                >
                    Разместить вакансию
                </a>
            </div>
        </header>
    );
};