import { useState, useEffect } from 'react';
import './CookieConsent.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function CookieConsentFooter() {
    const [isVisible, setIsVisible] = useState(true);
    const { t } = useTranslation();

    const acceptCookies = () => {
        setIsVisible(false);
        localStorage.setItem('cookieConsent', 'true');
    };

    useEffect(() => {
        const hasConsent = localStorage.getItem('cookieConsent') === 'true';
        if (hasConsent) {
            setIsVisible(false);
        }
    }, []);

    if (!isVisible) return null;

    const CookieIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M16 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M7 14v.01" />
        </svg>
    );

    return (
        <div className="cookie-footer-container">
            <div className="cookie-footer-content">
                <div className="cookie-icon">
                    <CookieIcon />
                </div>

                <div className="cookie-text">
                    {t('cookie.text')}<Link to="/privacy-policy"><span>{t('cookie.text2')}</span></Link>
                </div>

                <button
                    onClick={acceptCookies}
                    className="cookie-accept-button"
                >
                    {t('common.accept')}
                </button>
            </div>
        </div>
    );
}