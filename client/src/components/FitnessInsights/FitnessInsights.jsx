import './fitnessInsights.css';
import InsightCard from './InsightCard/InsightCard';

const insightsData = [
    {
        trainer: {
            name: "Viktor Kortsanov",
            image: "/images/viktork.jpg",
            socials: {
                facebook: "https://www.facebook.com/profile.php?id=100015649865699",
                instagram: "https://www.instagram.com/v_kortsanov",
                youtube: "https://www.youtube.com/@Viktor-rf4jx",
            },
        },
        quote: "Consistency is key. It's better to train moderately four times a week for a year than intensely every day for a month and then quit.",
        position: "left"
    },
    {
        trainer: {
            name: "Viktor Taskov",
            image: "/images/vtask.jpg",
            socials: {
                facebook: "https://www.facebook.com/viktor.cappie",
                instagram: "https://www.instagram.com/thevtask",
                youtube: "https://www.youtube.com/@MichelleVtaskFitnessJourney",
            },
        },
        quote: "Your body achieves what your mind believes. Set clear goals, visualize your success, and let your determination fuel your transformation.",
        position: "right"
    },
    {
        trainer: {
            name: "Georgi Krustev",
            image: "/images/georgikk.jpg",
            socials: {
                facebook: "https://www.facebook.com/gkkcoaching",
                instagram: "https://www.instagram.com/georgiikk",
                youtube: "https://www.youtube.com/@georgiikk",
            },
        },
        quote: "The weight room is not just about building muscles, it's about building discipline, resilience, and character that extends beyond fitness.",
        position: "left"
    },
    {
        trainer: {
            name: "Valentin Petrov",
            image: "/images/valentin-petrov.jpg",
            socials: {
                facebook: "https://www.facebook.com/ifbbprovalentin",
                instagram: "https://www.instagram.com/valentinpetrov_ifbbpro",
                youtube: "https://www.youtube.com/@IFBBValentinPetrov",
            },
        },
        quote: "Progress happens when you step outside your comfort zone. Challenge yourself with each workout, and your body will respond with growth.",
        position: "right"
    }
];

const FitnessInsights = () => {
    return (
        <section className="fitness-insights">
            <h2 className="insights-title">Wisdom From Our Experts</h2>
            <div className="insights-container">
                {insightsData.map((insight, index) => (
                    <InsightCard 
                        key={index} 
                        trainer={insight.trainer} 
                        quote={insight.quote} 
                        position={insight.position}
                    />
                ))}
            </div>
        </section>
    );
};

export default FitnessInsights;