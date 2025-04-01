import { useTranslation } from 'react-i18next';
import './fitnessInsights.css';
import InsightCard from './InsightCard/InsightCard';

const insightsData = [
    {
        trainer: {
            nameKey: "name1",
            image: "/images/viko.jpg",
            socials: {
                facebook: "https://www.facebook.com/profile.php?id=100015649865699",
                instagram: "https://www.instagram.com/v_kortsanov",
                youtube: "https://www.youtube.com/@Viktor-rf4jx",
            },
        },
        quoteKey: "quote1",
        position: "left"
    },
    {
        trainer: {
            nameKey: "name2",
            image: "/images/vtask.jpg",
            socials: {
                facebook: "https://www.facebook.com/viktor.cappie",
                instagram: "https://www.instagram.com/thevtask",
                youtube: "https://www.youtube.com/@MichelleVtaskFitnessJourney",
            },
        },
        quoteKey: "quote2",
        position: "right"
    },
    {
        trainer: {
            nameKey: "name3",
            image: "/images/georgikk.jpg",
            socials: {
                facebook: "https://www.facebook.com/gkkcoaching",
                instagram: "https://www.instagram.com/georgiikk",
                youtube: "https://www.youtube.com/@georgiikk",
            },
        },
        quoteKey: "quote3",
        position: "left"
    },
    {
        trainer: {
            nameKey: "name4",
            image: "/images/valentin-petrov.jpg",
            socials: {
                facebook: "https://www.facebook.com/ifbbprovalentin",
                instagram: "https://www.instagram.com/valentinpetrov_ifbbpro",
                youtube: "https://www.youtube.com/@IFBBValentinPetrov",
            },
        },
        quoteKey: "quote4",
        position: "right"
    }
];

const FitnessInsights = () => {
    const { t } = useTranslation();

    return (
        <section className="fitness-insights">
            <h2 className="insights-title">{t("fitness_insights.title")}</h2>
            <div className="insights-container">
                {insightsData.map((insight, index) => (
                    <InsightCard
                        key={index} 
                        trainer={{
                            ...insight.trainer,
                            name: t(`fitness_insights.${insight.trainer.nameKey}`)
                        }}
                        quote={t(`fitness_insights.${insight.quoteKey}`)}
                        position={insight.position}
                    />
                ))}
            </div>
        </section>
    );
};
export default FitnessInsights;