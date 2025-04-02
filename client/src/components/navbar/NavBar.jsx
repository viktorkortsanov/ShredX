import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './navbar.css';
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi.js";
import { logout as logoutAction } from "../../store/authSlice.js";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

export default function NavBar() {
    const { t } = useTranslation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.isAdmin;
    const userId = useSelector((state) => state.auth.user?._id);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [userProfileImg, setUserProfileImg] = useState(null);

    useEffect(() => {
        const getUserImage = async () => {
            if (userId) {
                const response = await userApi.getProfileImage(userId);
                setUserProfileImg(response?.profileImage);
            }
        };
        getUserImage();
    }, [userId]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await userApi.logout();
        dispatch(logoutAction());
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <nav>
                <Link to="/" id="nav-logo" onClick={handleNavLinkClick}>
                    <img src="/images/shredx-logo.png" alt="Logo" />
                </Link>

                <div className="hamburger-menu" onClick={toggleMobileMenu}>
                    <div className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                </div>

                <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <li><Link to="/" onClick={handleNavLinkClick}>{t('navigation.home')}</Link></li>
                    <li><Link to="/forum" onClick={handleNavLinkClick}>{t('navigation.forum')}</Link></li>
                    <li><Link to="/ourteam" onClick={handleNavLinkClick}>{t('navigation.ourTeam')}</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/programs" onClick={handleNavLinkClick}>{t('navigation.programs')}</Link></li>
                            {isAdmin && <li><Link to="/adminpanel" onClick={handleNavLinkClick}>{t('navigation.admin')}</Link></li>}
                            <li className="user-icon" ref={dropdownRef}>
                                <div onClick={toggleMenu} className="user-profile-trigger">
                                    <img src={userProfileImg || "/images/null-profile.png"} alt="User Icon" />
                                    <span className="mobile-only">{t('navigation.profile')}</span>
                                </div>
                                {isMenuOpen && (
                                    <ul className="dropdown-menu-navi">
                                        <li className="user-info-navi">
                                            <img
                                                src={userProfileImg || "/images/null-profile.png"}
                                                alt="User Logo"
                                                className="user-logo"
                                            />
                                            <div className="user-details-navi">
                                                <p className="username-navi">{user?.username}</p>
                                                {/* <p className="email">{user?.email}</p> */}
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/profile" onClick={handleNavLinkClick}>
                                                <img src="../../../public/images/user-icon.svg" alt="Profile Icon" />
                                                {t('navigation.profile')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/logout" onClick={handleLogout}>
                                                <img src="../../../public/images/logout.svg" alt="Logout Icon" />
                                                {t('navigation.logout')}
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" onClick={handleNavLinkClick}>{t('navigation.login')}</Link></li>
                            <li><Link to="/register" onClick={handleNavLinkClick}>{t('navigation.register')}</Link></li>
                        </>
                    )}
                </ul>

                <LanguageSwitcher />
            </nav>
        </header>
    );
}