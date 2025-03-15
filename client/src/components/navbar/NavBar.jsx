import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import { AuthContext } from "../../contexts/authContext.jsx";
import { logout } from "../../utils/logout.js";

export default function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout(setIsAuthenticated, navigate);
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/" id="nav-logo">
                            <img src="../../public/images/shredx-logo.png" />
                        </Link>
                    </li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/forum">Forum</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/programs">Programs</Link></li>
                            <li className="user-icon" onClick={toggleMenu}>
                                <img src="../../public/images/personalization.png" />
                                {isMenuOpen && (
                                    <ul className="dropdown-menu">
                                        <li><Link to="/profile">Profile</Link></li>
                                        <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
                                    </ul>
                                )}
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
