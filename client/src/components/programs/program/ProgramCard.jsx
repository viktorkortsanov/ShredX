import React from 'react';
import './ProgramCard.css';

const ProgramCard = ({ program }) => {
    return (
        <div className="program-card" style={{ backgroundImage: `url(${program.image})` }}>
            <div className="program-info">
                <h3 className="program-name">{program.name}</h3>
                <p className="program-price">${program.price}</p>
                <button className="buy-button">Buy</button>
            </div>
        </div>
    );
};

export default ProgramCard;