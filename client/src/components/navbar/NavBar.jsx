import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './navbar.css';
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi.js";
import { logout as logoutAction, setProfileImg } from "../../store/authSlice.js";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

export default function NavBar() {
    const { t } = useTranslation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.isAdmin;
    const userId = useSelector((state) => state.auth.user?._id);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const userDropdownRef = useRef(null);
    const aboutDropdownRef = useRef(null);
    const [userProfileImg, setUserProfileImg] = useState(null);
    const profileImg = useSelector((state) => state.auth?.profileImg);
    
    useEffect(() => {
        const getUserImage = async () => {
            if (!userId) return;

            try {
                const response = await userApi.getProfileImage(userId);
                if (response?.profileImage) {
                    setUserProfileImg(response.profileImage);
                    dispatch(setProfileImg({profileImg: response.profileImage}));
                    localStorage.setItem('profileImg', response.profileImage);
                }
            } catch (error) {
                console.error("Грешка при взимане на снимка:", error);
            }
        };

        getUserImage();
    }, [userId, profileImg]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
                setIsAboutMenuOpen(false);
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

    const toggleAboutMenu = () => {
        setIsAboutMenuOpen(!isAboutMenuOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await userApi.logout();
        dispatch(logoutAction());
        dispatch(setProfileImg({ profileImg: null }));
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
        setIsAboutMenuOpen(false);
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
                    
                    {/* About Us Dropdown */}
                    <li className="about-dropdown" ref={aboutDropdownRef}>
                        <div onClick={toggleAboutMenu} className="about-menu-trigger">
                            {t('navigation.aboutUs')} <span className="dropdown-arrow">▼</span>
                        </div>
                        {isAboutMenuOpen && (
                            <ul className="dropdown-menu-about">
                                <li>
                                    <Link to="/ourteam" onClick={handleNavLinkClick}>
                                        {t('navigation.ourTeam')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ourstory" onClick={handleNavLinkClick}>
                                        {t('navigation.ourStory')}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/programs" onClick={handleNavLinkClick}>{t('navigation.programs')}</Link></li>
                            {isAdmin && <li><Link to="/adminpanel" onClick={handleNavLinkClick}>{t('navigation.admin')}</Link></li>}
                            <li className="user-icon" ref={userDropdownRef}>
                                <div onClick={toggleMenu} className="user-profile-trigger">
                                    <img src={profileImg || "/images/null-profile.png"} alt="User Icon" />
                                    <span className="mobile-only">{t('navigation.profile')}</span>
                                </div>
                                {isMenuOpen && (
                                    <ul className="dropdown-menu-navi">
                                        <li className="user-info-navi">
                                            <img
                                                src={profileImg || "/images/null-profile.png"}
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