import Card from "./card/Card.jsx"
import './cardcontainer.css'

export default function CardContainer(){
    return(
        <article id="features-section">
            <Card img="../../../public/images/personalization.png" title="Personalization" text="Customized workout and nutrition plans based on user goals."/>
            <Card img="../../../public/images/community.png" title="Community" text="Forum for sharing experiences, tips, and motivation."/> 
            <Card img="../../../public/images/task.png" title="All-in-One" text="A single platform for workouts, nutrition, and discussions."/>  
        </article>
    )
}