import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './navbar.css'
import { AuthContext } from "../../contexts/authContext.jsx";

export default function NavBar() {
    const { isAuthenticated } = useContext(AuthContext);

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
                            <li><Link to="/logout">Logout</Link></li>
                            <Link to="/profile" id="profile-logo">
                            <img src="../../public/images/personalization.png" />
                            </Link>
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