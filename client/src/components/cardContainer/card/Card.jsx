import './card.css'

export default function Card(props){
    return(
        <section className="custsom-card">
            <img src={props.img}/>
            <h2 className='custom-card-title'>{props.title}</h2>
            <p className='custom-card-text'>- {props.text}</p>
        </section>
    )
}