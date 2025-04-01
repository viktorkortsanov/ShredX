import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './programcard.css';
import { useSelector } from 'react-redux';
import userApi from '../../../api/userApi';

const ProgramCard = ({ program }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [purchasedPrograms, setPurchasedPrograms] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [animateCard, setAnimateCard] = useState(false);
    const userId = useSelector(state => state.auth.user?._id);    
    const navigate = useNavigate();

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
  
                setTimeout(() => setAnimateCard(true), 100);
            }
        };

        fetchPurchasedPrograms();
    }, [userId]);

    const isPurchased = purchasedPrograms.includes(program.id.toString());

    const toggleInfo = (e) => {
        e.stopPropagation();
        setShowInfo(!showInfo);
    };

    if (loading) {
        return (
            <div className="program-card loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div 
            className={`program-card ${animateCard ? 'animate' : ''}`} 
            style={{ backgroundImage: `url(${program.image})` }}
            onClick={() => isPurchased ? 
                navigate(`/programs/${program.id}/details`) : 
                navigate(`/programs/pay/${program.id}`)
            }
        >
            <div className="program-card-overlay"></div>
            
            {isPurchased && (
                <div className="program-badge">
                    <span>{t('programs.card.purchased')}</span>
                </div>
            )}
            
            <div className="program-info-card">
                <h3 className="program-name">{program.name}</h3>
                <div className="program-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="star-icon">★</span>
                    ))}
                </div>
                <p className="program-price">${program.price}</p>

                <div className="program-features">
                    <span>{program.days.length} {t('programs.days')}</span>
                    <span>{program.days.reduce((total, day) => total + day.exercises.length, 0)} {t('programs.card.exercises')}</span>
                    <span>{program.recipes.length} {t('programs.card.recipes')}</span>
                </div>

                <div className="buttons">
                    {isPurchased ? (
                        <Link to={`/programs/${program.id}/details`} className="buy-btn">
                            {t('programs.card.startWorkout')}
                        </Link>
                    ) : (
                        <Link to={`/programs/pay/${program.id}`} className="buy-btn">
                            {t('programs.card.getStarted')}
                        </Link>
                    )}
                    
                    <button 
                        className={`info-button-card ${showInfo ? 'active' : ''}`}
                        onClick={toggleInfo}
                    >
                        <img 
                            src="/images/program-info.svg" 
                            alt={t('common.info')} 
                            className="info-icon"
                        />
                    </button>
                </div>

                <div className={`program-description-card ${showInfo ? 'show' : ''}`}>
                    <p>{program.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProgramCard;