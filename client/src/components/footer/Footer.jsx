import './footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 ShredX. {t('footer.copyright')}</p>
                <div className="footer-links">
                    <Link to="/privacy-policy">{t('footer.privacy_policy')}</Link>
                    <Link to="/terms-of-service">{t('footer.terms_of_service')}</Link>
                    <Link to="/contact">{t('footer.contact')}</Link>
                    <Link to="/faq">{t('footer.faq')}</Link>
                </div>
                <div className='footer-logos'>
                    <a href="https://www.facebook.com/groups/654526977191660" target="_blank" rel="noopener noreferrer">
                        <img src="/images/facebook.png" alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/shredx2025/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/instagram.webp" alt="Instagram" />
                    </a>
                    <a href="https://www.tiktok.com/@shredx2025" target="_blank" rel="noopener noreferrer">
                        <img src="/images/tiktok.webp" alt="TikTok" />
                    </a>
                </div>
            </div>
        </footer>
    );
}