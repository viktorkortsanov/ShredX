import './card.css'

export default function Card(props) {
  return (
    <section className="custom-card-prop">
      {props.img && <img className="custom-card-image" src={props.img} alt={props.title} />}
      <h2 className='custom-card-title'>{props.title}</h2>
      <p className='custom-card-text'>- {props.text}</p>
      {props.buttonText && (
        <a href={props.buttonLink} className="custom-card-button">
          {props.buttonText}
        </a>
      )}
    </section>
  )
}