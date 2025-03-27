import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi.js";
import { logout as logoutAction } from "../../store/authSlice.js";
 
export default function NavBar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.isAdmin;
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
 
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
 
        window.addEventListener('scroll', handleScroll);
 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
 
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
        <header className={isScrolled ? 'scrolled' : ''}>
            <nav>
                <ul>
                    <li>
                        <Link to="/" id="nav-logo">
                            <img src="/images/shredx-logo.png" alt="Logo" />
                        </Link>
                    </li>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/forum">FORUM</Link></li>
                    <li><Link to="/ourteam">OUR TEAM</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/programs">PROGRAMS</Link></li>
                            {isAdmin && <li><Link to="/adminpanel">ADMIN</Link></li>}
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
                                                <img src="../../../public/images/profile.svg" alt="Profile Icon" />
                                                PROFILE
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/logout" onClick={handleLogout}>
                                                <img src="../../../public/images/logout.svg" alt="Logout Icon" />
                                                LOGOUT
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">LOGIN</Link></li>
                            <li><Link to="/register">REGISTER</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}