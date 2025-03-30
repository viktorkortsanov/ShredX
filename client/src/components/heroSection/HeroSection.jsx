import { Link } from 'react-router-dom';
import './herosection.css';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="video-background">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/uNN62f55EV0?autoplay=1&mute=1&loop=1&playlist=uNN62f55EV0&controls=0&showinfo=0&cc_load_policy=0&cc_lang_pref=en"
                    title="GYM MOTIVATION - Chris Bumstead &quot;CBUM&quot; - ROYALTY 🔥" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                ></iframe>
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className='hero-title'>Welcome to ShredX</h1>
                <p>The Ultimate Fitness App for Workouts and Community Support.</p>
                <Link to="/register" className="cta-btn">GET STARTED</Link>
            </div>
        </section>
    );
}