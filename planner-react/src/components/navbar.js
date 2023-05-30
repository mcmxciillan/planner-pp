import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from './logOutButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';

export default function Navbar() {
    const user = useSelector(selectUser);

    function isUserLoggedIn() {
        return user !== null
    }

    function isVendor() {
        return user.roles.indexOf('Vendor') > 0
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        if (isUserLoggedIn())
            setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };
    useEffect(() =>
        closeNavbar()
    , [user])

    return (
        <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <Link to={isUserLoggedIn() ? `/home/${user._id}`: '/'} className="text-white font-bold text-lg">Plannette</Link>
            </div>
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    {!isUserLoggedIn() ? <></> : <Link to={`/home/${user._id}`} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>}
                    <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                    {isUserLoggedIn() && isVendor() ? <></> : <Link to="/vendorSignup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Vendor Signup</Link>}
                    {isUserLoggedIn() && isVendor() ? <Link to="/vendor/services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Services</Link> :<></>}
                    <Link to={'/messages'} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Messages</Link>
                    <LogOutButton />
                </div>
            </div>
            <div className="md:hidden">
                <button onClick={toggleNavbar} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
                </button>
            </div>
            </div>
        </div>
        {isOpen && isUserLoggedIn() && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to={`/home/${user._id}`} onClick={closeNavbar} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/profile" onClick={closeNavbar} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                        {isVendor() ? <></> : <Link to="/vendorSignup" onClick={closeNavbar} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Vendor Signup</Link>}
                        {isVendor() ? <Link to="/vendor/services" onClick={closeNavbar} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Services</Link> :<></>}
                        <Link to={'/messages'} onClick={closeNavbar} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Messages</Link>
                        <LogOutButton className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"/>
                </div>
            </div>
        )}
        </nav>
    );
};
