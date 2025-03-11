import { Link } from 'react-router-dom';
import './herosection.css';

export default function HeroSection() {
    return (
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className='hero-title'>Welcome to ShredX</h1>
                    <p>The Ultimate Fitness App for Workouts and Community Support.</p>
                    <Link to="/programs" className="cta-btn">Get Started</Link>
                </div>
            </section>
    );
}