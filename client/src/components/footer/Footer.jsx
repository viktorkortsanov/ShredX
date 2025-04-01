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
                </div>
                <div className='footer-logos'>
                    <Link to="https://www.facebook.com/groups/654526977191660">
                        <img src="/images/facebook.png" alt="Facebook" />
                    </Link>
                    <Link to="https://www.instagram.com/shredx2025/">
                        <img src="/images/instagram.webp" alt="Instagram" />
                    </Link>
                    <Link to="https://www.tiktok.com/@shredx2025">
                        <img src="/images/tiktok.webp" alt="TikTok" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}