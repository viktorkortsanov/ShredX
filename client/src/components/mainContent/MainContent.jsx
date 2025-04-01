import { useRef, useEffect, useState } from "react";
import HeroSection from "../heroSection/HeroSection.jsx";
import CardContainer from "../cardContainer/CardContainer.jsx";
import MyCarousel from "../carousel/Carousel.jsx";
import FitnessInsights from "../FitnessInsights/FitnessInsights.jsx";
import './mainContent.css';
import Sponsors from "../sponsors/Sponsors.jsx";

export default function MainContent() {
    const heroRef = useRef(null);
    const scrollMarkerRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        // Observer за Hero секцията (за скриване на футера)
        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    document.body.classList.add('hide-footer');
                } else {
                    document.body.classList.remove('hide-footer');
                }
            },
            {
                threshold: 0.3
            }
        );

        if (heroRef.current) {
            heroObserver.observe(heroRef.current);
        }

        const scrollObserver = new IntersectionObserver(
            ([entry]) => {
                setShowScrollTop(!entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: "60% 0px 0px 0px" 
            }
        );

        const markerElement = document.createElement('div');
        markerElement.style.position = 'absolute';
        markerElement.style.top = '0';
        markerElement.style.height = '1px';
        markerElement.style.width = '1px';
        markerElement.style.opacity = '0';
        document.body.appendChild(markerElement);
        scrollMarkerRef.current = markerElement;

        scrollObserver.observe(markerElement);

        return () => {
            if (heroRef.current) {
                heroObserver.unobserve(heroRef.current);
            }
            document.body.classList.remove('hide-footer');
            
            if (scrollMarkerRef.current) {
                scrollObserver.unobserve(scrollMarkerRef.current);
                scrollMarkerRef.current.remove();
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <article className="main-container">
                <div ref={heroRef}>
                    <HeroSection />
                </div>
                <FitnessInsights />
                <Sponsors />
                <CardContainer />
                <MyCarousel />
                
                {/* Стрелка за връщане към началото */}
                {showScrollTop && (
                    <button 
                        className="scroll-to-top-button"
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
                            <path id="secondary" d="M8.5,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L14.09,12,7.79,5.71A1,1,0,1,1,9.21,4.29l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,8.5,20Z" style={{fill: 'rgb(44, 169, 188)', transform: 'rotate(-90deg)', transformOrigin: 'center'}}></path>
                            <path id="primary" d="M14,20a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L19.59,12l-6.3-6.29a1,1,0,0,1,1.42-1.42l7,7a1,1,0,0,1,0,1.42l-7,7A1,1,0,0,1,14,20ZM3.71,19.71l7-7a1,1,0,0,0,0-1.42l-7-7A1,1,0,0,0,2.29,5.71L8.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0Z" style={{fill: 'rgb(255, 255, 255)', transform: 'rotate(-90deg)', transformOrigin: 'center'}}></path>
                        </svg>
                    </button>
                )}
            </article>
        </>
    );
}