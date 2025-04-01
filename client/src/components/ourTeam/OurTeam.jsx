import TrainerCard from "./trainerCard/TrainerCard.jsx";
import { useTranslation } from "react-i18next";
import './ourteam.css'

const trainers = [
    {
        nameKey: "name1",
        image: "/images/viko.jpg",
        descriptionKey: "desc1",
        socials: {
            facebook: "https://www.facebook.com/profile.php?id=100015649865699",
            instagram: "https://www.instagram.com/v_kortsanov",
            youtube: "https://www.youtube.com/@Viktor-rf4jx",
        },
    },
    {
        nameKey: "name2",
        image: "/images/vtask.jpg",
        descriptionKey: "desc2",
        socials: {
            facebook: "https://www.facebook.com/viktor.cappie",
            instagram: "https://www.instagram.com/thevtask",
            youtube: "https://www.youtube.com/@MichelleVtaskFitnessJourney",
        },
    },
    {
        nameKey: "name3",
        image: "/images/georgikk.jpg",
        descriptionKey: "desc3",
        socials: {
            facebook: "https://www.facebook.com/gkkcoaching",
            instagram: "https://www.instagram.com/georgiikk",
            youtube: "https://www.youtube.com/@georgiikk",
        },
    },
    {
        nameKey: "name4",
        image: "/images/valentin-petrov.jpg",
        descriptionKey: "desc4",
        socials: {
            facebook: "https://www.facebook.com/ifbbprovalentin",
            instagram: "https://www.instagram.com/valentinpetrov_ifbbpro",
            youtube: "https://www.youtube.com/@IFBBValentinPetrov",
        },
    }
];


const OurTeam = () => {
    const { t } = useTranslation();

    return (
        <section className="our-team">
            <div className="team-container">
                {trainers.map((trainer, index) => (
                    <TrainerCard
                        key={index}
                        trainer={{
                            ...trainer,
                            name: t(`our_team.${trainer.nameKey}`),
                            description: t(`our_team.${trainer.descriptionKey}`)
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default OurTeam;