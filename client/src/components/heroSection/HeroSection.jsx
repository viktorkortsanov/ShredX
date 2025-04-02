import { Link } from 'react-router-dom';
import './herosection.css';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
    const { t } = useTranslation()

    return (
        <section className="hero-section">
            <div className="video-background">
                <video autoPlay muted playsInline loop>
                    <source src="/videos/cbum-video.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className='hero-title'>{t('hero_section.title_1_text')} Shred<strong className='title-word'>X</strong></h1>
                <p>{t('hero_section.title_2_text')} </p>
                <Link to="/register" className="cta-btn">{t('hero_section.button')}</Link>
            </div>
        </section>
    );
}