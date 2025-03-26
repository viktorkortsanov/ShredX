import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProgramCard.css';
import { useSelector } from 'react-redux';
import userApi from '../../../api/userApi';

const ProgramCard = ({ program }) => {
    const [loading, setLoading] = useState(true);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
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
    }, []);

    const isPurchased = purchasedPrograms.includes(program.id.toString());

    if (loading) {
        return <div>Loading...</div>;
    }

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