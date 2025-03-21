import { Link } from 'react-router-dom';
import './ProgramCard.css';

const ProgramCard = ({ program }) => {
    return (
        <div className="program-card" style={{ backgroundImage: `url(${program.image})` }}>
            <div className="program-info">
                <h3 className="program-name">{program.name}</h3>
                <p className="program-price">${program.price}</p>
                <Link to={`/programs/pay/${program.id}`} className="buy-btn">
                    Buy
                </Link>
            </div>
        </div>
    );
};

export default ProgramCard;