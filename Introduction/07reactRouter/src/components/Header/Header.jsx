import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// It's better to manage the logo path. If you move this component, the path might break.
// A common practice is to place assets in a public folder or manage paths with a config.
// For this example, we'll assume the path is correct relative to this file's location.
// import OpenStartLogo from '../../assets/OpenStartLogo.jpg'; 

// Using a placeholder for the logo so the component is self-contained and runnable.
const OpenStartLogo = 'https://placehold.co/100x100/1e1b4b/ffffff?text=OS&font=inter';

// SVG Icons for the mobile menu toggle for a clean, dependency-free implementation.
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export default function Header() {
    // State to manage the visibility of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation links data for easier mapping and maintenance
    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/about", text: "About" },
        { to: "/contact", text: "Contact" },
        { to: "/github", text: "Github" },
    ];

    // Style for NavLink, making it reusable
    const navLinkClass = ({ isActive }) =>
        `relative font-medium text-white transition-colors duration-300 hover:text-indigo-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-indigo-400 after:transition-transform after:duration-300 after:origin-left ${
            isActive ? "text-indigo-400 after:scale-x-100" : ""
        }`;

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
            {/* The 'container' and 'mx-auto' classes have been removed for a true full-width design */}
            <nav className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src={OpenStartLogo}
                            className="h-14 w-14 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                            alt="OpenStart Logo"
                        />
                    </Link>

                    {/* Desktop Navigation Links - Centered */}
                    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:gap-x-10">
                        {navLinks.map((link) => (
                             <NavLink key={link.to} to={link.to} className={navLinkClass}>
                                {link.text}
                            </NavLink>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                        <Link
                            to="#"
                            className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                        >
                            Log in
                        </Link>
                        <Link
                            to="#"
                            className="rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
                        >
                            Get started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {navLinks.map((link) => (
                             <NavLink 
                                key={link.to} 
                                to={link.to} 
                                className={({isActive}) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                onClick={() => setIsMenuOpen(false)} // Close menu on click
                            >
                                {link.text}
                            </NavLink>
                        ))}
                        <div className="border-t border-gray-700 pt-4 mt-4 flex flex-col items-start space-y-3">
                             <Link
                                to="#"
                                className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                Log in
                            </Link>
                            <Link
                                to="#"
                                className="w-full text-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-2 text-base font-medium text-white shadow-lg"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
