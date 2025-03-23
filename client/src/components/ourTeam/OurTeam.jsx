import TrainerCard from "./trainerCard/TrainerCard.jsx";
import './ourteam.css'

const trainers = [
    {
        name: "Viktor Kortsanov",
        image: "/images/viktork.jpg",
        description: "Viktor Kortsanov is the ShredX team leader, young and motivated, always ready to help others achieve their fitness goals with enthusiasm and dedication.",
        socials: {
            facebook: "https://www.facebook.com/profile.php?id=100015649865699",
            instagram: "https://www.instagram.com/v_kortsanov",
            youtube: "https://www.youtube.com/@Viktor-rf4jx",
        },
    },
    {
        name: "Viktor Taskov",
        image: "/images/vtask.jpg",
        description: "Viktor Taskov is a part of the team at ShredX. As a coach, his mission is to reach as wide an audience as possible and help them achieve their goals in a quick and safe manner.",
        socials: {
            facebook: "https://www.facebook.com/viktor.cappie",
            instagram: "https://www.instagram.com/thevtask",
            youtube: "https://www.youtube.com/@MichelleVtaskFitnessJourney",
        },
    },
    {
        name: "Georgi Krustev",
        image: "/images/georgikk.jpg",
        description: "Georgi Krastsev is a 32-year-old Senior Full Stack Developer and professional bodybuilder with over 14 years of fitness experience, believing in discipline and consistency to achieve goals.",
        socials: {
            facebook: "https://www.facebook.com/gkkcoaching",
            instagram: "https://www.instagram.com/georgiikk",
            youtube: "https://www.youtube.com/@georgiikk",
        },
    },
    {
        name: "Valentin Petrov",
        image: "/images/valentin-petrov.jpg",
        description: "Valentin Petrov is a professional bodybuilder with years of experience and a certified trainer. Passionate about fitness, he combines his expertise in bodybuilding with coaching, helping others achieve their goals through discipline and dedication.",
        socials: {
            facebook: "https://www.facebook.com/ifbbprovalentin",
            instagram: "https://www.instagram.com/valentinpetrov_ifbbpro",
            youtube: "https://www.youtube.com/@IFBBValentinPetrov",
        },
    }
];

const OurTeam = () => {
    return (
        <section className="our-team">
            <div className="team-container">
                {trainers.map((trainer, index) => (
                    <TrainerCard key={index} trainer={trainer} />
                ))}
            </div>
        </section>
    );
};

export default OurTeam;