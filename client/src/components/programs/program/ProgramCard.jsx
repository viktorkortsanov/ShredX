import { Link } from 'react-router-dom';
import './ProgramCard.css';

const ProgramCard = ({ program }) => {
    const purchasedPrograms = JSON.parse(localStorage.getItem('purchasedPrograms')) || [];
    const isPurchased = purchasedPrograms.includes(program.id.toString());

    return (
        <div className="program-card" style={{ backgroundImage: `url(${program.image})` }}>
            <div className="program-info">
                <h3 className="program-name">{program.name}</h3>
                <p className="program-price">${program.price}</p>
                {isPurchased ? (
                    <Link to={`/programs/${program.id}/details`} className="buy-btn">
                        Show Program
                    </Link>
                ) : (
                    <Link to={`/programs/pay/${program.id}`} className="buy-btn">
                        Buy
                    </Link>
                )}
            </div>
        </div>
    );
};
export default ProgramCard;