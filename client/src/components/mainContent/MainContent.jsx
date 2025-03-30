import { useRef, useEffect } from "react";
import HeroSection from "../heroSection/HeroSection.jsx";
import CardContainer from "../cardContainer/CardContainer.jsx";
import MyCarousel from "../carousel/Carousel.jsx";
import './mainContent.css';

export default function MainContent() {
    const heroRef = useRef(null);

    useEffect(() => {
        
        const observer = new IntersectionObserver(
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
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
            document.body.classList.remove('hide-footer');
        };
    }, []);

    return (
        <>
            <article className="main-container">
                <div ref={heroRef}>
                    <HeroSection />
                </div>
                <CardContainer />
                <MyCarousel />
            </article>
        </>
    );
}