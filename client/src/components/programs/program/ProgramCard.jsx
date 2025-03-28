import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProgramCard.css';
import { useSelector } from 'react-redux';
import userApi from '../../../api/userApi';

const ProgramCard = ({ program }) => {
    const [loading, setLoading] = useState(true);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const userId = useSelector(state => state.auth.user?._id);    

    useEffect(() => {
        const fetchPurchasedPrograms = async () => {
            try {
                const response = await userApi.getPurchasedPrograms(userId);
                if (response.ok) {
                    const data = await response.json();
                    const programs = data || [];
                    setPurchasedPrograms(programs);
                    if (programs.length > 0) {
                        localStorage.setItem('purchasedPrograms', JSON.stringify(programs));
                    }
                } else {
                    console.error('Error fetching purchased programs');
                }
            } catch (err) {
                console.error('Error fetching purchased programs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedPrograms();
    }, [userId]);

    const isPurchased = purchasedPrograms.includes(program.id.toString());

    if (loading) {
        return <div>Loading...</div>;
    }


return (
    <div className="program-card" style={{ backgroundImage: `url(${program.image})` }}>
        <div className="program-info-card">
            <h3 className="program-name">{program.name}</h3>
            <p className="program-price">${program.price}</p>

            <div className="buttons">
                {isPurchased ? (
                    <Link to={`/programs/${program.id}/details`} className="buy-btn">
                        Show Program
                    </Link>
                ) : (
                    <Link to={`/programs/pay/${program.id}`} className="buy-btn">
                        Buy
                    </Link>
                )}
                
                <img 
                    src="/images/program-info.svg" 
                    alt="Info" 
                    className="info-icon"
                    onClick={() => setShowInfo(!showInfo)}
                />
            </div>

            {showInfo && (
                <div className="program-description-card">
                    <p>{program.description}</p>
                </div>
            )}
        </div>
    </div>
);
};

export default ProgramCard;