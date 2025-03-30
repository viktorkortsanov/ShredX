import './footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 ShredX. All rights reserved.</p>
                <div className="footer-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-service">Terms of Service</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className='footer-logos'>
                    <Link>
                        <img src="/images/facebook.png" alt="Instagram" />
                    </Link>
                    <Link>
                        <img src="/images/instagram.webp" alt="Instagram" />
                    </Link>
                    <Link>
                        <img src="/images/tiktok.webp" alt="Instagram" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}