import Card from "./card/Card.jsx";
import './cardcontainer.css';
import { Link } from "react-router-dom";

export default function CardContainer() {
    return (
        <article id="features-section">
            <Link to="/programs">
                <Card 
                    img="../../../public/images/personalization.png" 
                    title="Personalization" 
                    text="Customized workout and nutrition plans based on user goals."
                />
            </Link>
            <Link to="/forum">
                <Card 
                    img="../../../public/images/community.png" 
                    title="Community" 
                    text="Forum for sharing experiences, tips, and motivation."
                />
            </Link>
            <Link to="/">
                <Card 
                    img="../../../public/images/task.png" 
                    title="All-in-One" 
                    text="A single platform for workouts, nutrition, and discussions."
                />
            </Link>
        </article>
    );
}
