import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from './logOutButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const user = useSelector(selectUser);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {`{PP++}`}
            </div>
            { user ? <ul className="navbar-links">
                <li className="navbar-link"><Link to={user ? `/home/${user._id}` : `/`}>Home</Link></li>
                        <li className="navbar-link">
                        {user.roles.indexOf('Vendor') > 0 ? <></> : <Link to="/vendorSignup">Vendor Signup</Link>}
                        </li>
                <li className="navbar-link"><LogOutButton /></li>
            </ul> : <></>}
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
                            {user.roles.indexOf('Vendor') > 0 ? <></> : <Link to="/vendorSignup">Vendor Signup</Link>}
                        </li>
                        <li className="navbar-dropdown-menu-item">
                            {user ? <LogOutButton /> : <></>}
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};
