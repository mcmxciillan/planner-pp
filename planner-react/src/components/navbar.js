import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from './logOutButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const user = useSelector(selectUser);

    function isUserLoggedIn() {
        return user._id !== null
    }

    function isVendor() {
        return user.roles.indexOf('Vendor') > 0
    }
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {`{PP++}`}
            </div>
            { user && isUserLoggedIn() ? 
                <ul className="navbar-links">
                    <li className="navbar-link">
                        <Link to={`/home/${user._id}`}>Home</Link>
                    </li>
                    <li className="navbar-link">
                        {isVendor() ? <></> : <Link to="/vendorSignup">Vendor Signup</Link>}
                    </li>
                    <li className="navbar-link">
                        {isVendor() ? <Link to="/vendor/services">My Services</Link> :<></>}
                    </li>
                    <li className="navbar-link">
                        <Link to={'/messages'}>Messages</Link>
                    </li>
                    <li className="navbar-link">
                        <LogOutButton />
                    </li>
                </ul> : <></>
            }
            <div className="navbar-dropdown">
                <button className="navbar-dropdown-toggle" onClick={toggleDropdown}>
                    <i className="fas fa-user"></i>
                </button>
                {isDropdownOpen && (
                    <ul className="navbar-dropdown-menu">
                        <li className="navbar-dropdown-menu-item">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li className="navbar-dropdown-menu-item">
                            {isVendor ? <></> : <Link to="/vendorSignup">Vendor Signup</Link>}
                        </li>
                        <li className="navbar-dropdown-menu-item">
                            {isUserLoggedIn() ? <LogOutButton /> : <></>}
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};
