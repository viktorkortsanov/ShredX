import './trainercard.css'

const TrainerCard = ({ trainer }) => {
    return (
        <div className="trainer-card">
            <img
                src={trainer.image}
                alt={trainer.name}
                className="trainer-image"
            />
            <h3 className="trainer-name">{trainer.name}</h3>
            <p className="trainer-description">{trainer.description}</p>
            <div className="trainer-socials">
                <a href={trainer.socials.facebook} target="_blank">
                    <img src="/images/facebook.png" alt="Facebook" className="social-icon" />
                </a>
                <a href={trainer.socials.instagram} target="_blank">
                    <img src="/images/instagram.webp" alt="Instagram" className="social-icon" />
                </a>
                <a href={trainer.socials.youtube} target="_blank">
                    <img src="/images/youtube.png" alt="Twitter" className="social-icon" />
                </a>
            </div>
        </div>
    );
};

export default TrainerCard;  