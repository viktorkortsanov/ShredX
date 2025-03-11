import HeroSection from "../heroSection/HeroSection.jsx"
import CardContainer from "../cardContainer/CardContainer.jsx"
import MyCarousel from "../carousel/Carousel.jsx"
import './mainContent.css'

export default function MainContent() {
    return (
        <>
            <article className="main-container">
                <HeroSection />
                <CardContainer />
                <MyCarousel />
            </article>
        </>
    )
}