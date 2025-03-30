import React from 'react';
import './insightCard.css';

const InsightCard = ({ trainer, quote, position }) => {
    return (
        <div className={`insight-card ${position}`}>
            <div className="insight-image-container">
                <img src={trainer.image} alt={trainer.name} className="insight-image" />
                <div className="trainer-overlay">
                    <h3 className="trainer-name">{trainer.name}</h3>
                    <div className="trainer-socials">
                        <a href={trainer.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                            <img src="/images/facebook.png" alt="Facebook" className="social-icon" />
                        </a>
                        <a href={trainer.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                            <img src="/images/instagram.webp" alt="Instagram" className="social-icon" />
                        </a>
                        <a href={trainer.socials.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                            <img src="/images/youtube.png" alt="YouTube" className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="insight-content">
                <div className="quote-container">
                    <svg className="quote-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.13456 9H5.75C4.23122 9 3 10.2312 3 11.75V15.25C3 16.7688 4.23122 18 5.75 18H9.25C10.7688 18 12 16.7688 12 15.25V8.75C12 5.02944 9.10414 2 5.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.8654 9H17.25C15.7312 9 14.5 10.2312 14.5 11.75V15.25C14.5 16.7688 15.7312 18 17.25 18H20.75C22.2688 18 23.5 16.7688 23.5 15.25V8.75C23.5 5.02944 20.6041 2 17 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <blockquote className="quote-text">
                        {quote}
                    </blockquote>
                </div>
                
                <div className="insight-accent"></div>
                <div className="glow-effect"></div>
            </div>
        </div>
    );
};

export default InsightCard;