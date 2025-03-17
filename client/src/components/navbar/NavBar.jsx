import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi.js";
import { logout as logoutAction } from "../../store/authSlice.js";
import '../../../public/images/profile.png';

export default function NavBar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user); // Потребителски данни от Redux
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await userApi.logout();
        dispatch(logoutAction());
        navigate('/');
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/" id="nav-logo">
                            <img src="/images/shredx-logo.png" alt="Logo" />
                        </Link>
                    </li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/forum">Forum</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/programs">Programs</Link></li>
                            <li className="user-icon" onClick={toggleMenu}>
                                <img src="/images/personalization.png" alt="User Icon" />
                                {isMenuOpen && (
                                    <ul className="dropdown-menu">
                                        <li className="user-info">
                                            <img 
                                                src="../../../public/images/user-logo.png"
                                                alt="User Logo" 
                                                className="user-logo" 
                                            />
                                            <div className="user-details">
                                                <p className="username">{user?.username}</p>
                                                <p className="email">{user?.email}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/profile">
                                                <img src="../../../public/images/profile.png" alt="Profile Icon" />
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/logout" onClick={handleLogout}>
                                                <img src="../../../public/images/logout.png" alt="Logout Icon" />
                                                Logout
                                            </Link>
                                        </li>
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