import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext.jsx';
import './programdetails.css';
import { useTranslation } from 'react-i18next';

const ProgramDetails = () => {
    const { programId } = useParams();
    const { programs, getAllPrograms } = useAuth();
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('schedule');
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const loadProgram = async () => {
            try {
                setLoading(true);
                if (!programs || programs.length === 0) {
                    const fetchedPrograms = await getAllPrograms();
                    const foundProgram = fetchedPrograms.find(prog => prog.id.toString() === programId.toString());
                    if (foundProgram) {
                        setProgram(foundProgram);
                    } else {
                        navigate('/programs');
                    }
                } else {
                    const foundProgram = programs.find(prog => prog.id.toString() === programId.toString());
                    if (foundProgram) {
                        setProgram(foundProgram);
                    } else {
                        navigate('/programs');
                    }
                }
            } catch (error) {
                console.error("Error loading program:", error);
                navigate('/programs');
            } finally {
                setLoading(false);
            }
        };

        loadProgram();
    }, [programId, programs, getAllPrograms, navigate]);

    if (loading) {
        return (
            <div className="program-loading">
                <div className="container">
                    <h1>{t('program.loadingProgram')}...</h1>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (!program) {
        return (
            <div className="program-not-found">
                <div className="container">
                    <h1>{t('program.programNotFound')}</h1>
                    <p>{t('program.programNotExist')}</p>
                </div>
            </div>
        );
    }

    const getDifficultyLabel = () => {
        if (program.difficulty === 'beginner') return { label: t('programs.difficulty.beginner'), color: '#4CAF50' };
        if (program.difficulty === 'intermediate') return { label: t('programs.difficulty.intermediate'), color: '#FF9800' };
        if (program.difficulty === 'advanced') return { label: t('programs.difficulty.advanced'), color: '#F44336' };
        return { label: t('programs.difficulty.allLevels'), color: '#2196F3' };
    };

    const difficulty = getDifficultyLabel();

    return (
        <div className="program-details-page">
            <div className="program-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${program.background || '/images/fitness-bg.jpg'})` }}>
                <div className="container-hero">
                    <div className="program-badge-details" style={{ backgroundColor: difficulty.color }}>
                        {difficulty.label}
                    </div>
                    <h1 className="program-title">{program.name}</h1>
                    <p className="program-description">{program.description}</p>

                    <div className="program-meta">
                        <div className="program-meta-item">
                            <i className="far fa-calendar-alt"></i>
                            <span>{program.days.length} {t('programs.days')}</span>
                        </div>
                        <div className="program-meta-item">
                            <i className="fas fa-fire-alt"></i>
                            <span>{program.calories || '~2000'} cal</span>
                        </div>
                        <div className="program-meta-item">
                            <i className="fas fa-stopwatch"></i>
                            <span>{program.duration || '4-6'} {t('programs.weeks')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="program-content">
                <div className="container-programs">
                    <div className="program-tabs">
                        <button
                            className={`tab-button-program ${activeTab === 'schedule' ? 'active' : ''}`}
                            onClick={() => setActiveTab('schedule')}
                        >
                            {t('programs.tabs.trainingSchedule')}
                        </button>
                        <button
                            className={`tab-button-program ${activeTab === 'nutrition' ? 'active' : ''}`}
                            onClick={() => setActiveTab('nutrition')}
                        >
                            {t('programs.tabs.nutritionPlan')}
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'schedule' && (
                            <div className="training-schedule">
                                <div className="days-grid">
                                    {program.days.map((day, index) => (
                                        <div key={index} className="day-card">
                                            <div className="day-header">
                                                <span className="day-number">{index + 1}</span>
                                                <h3>{day.day}</h3>
                                            </div>
                                            {day.exercises.length > 0 ? (
                                                <div className="exercises-list">
                                                    {day.exercises.map((exercise, idx) => (
                                                        <div key={idx} className="exercise-item">
                                                            <div className="exercise-name">{exercise.name}</div>
                                                            <div className="exercise-details">
                                                                <span className="sets">{exercise.sets} {t('programs.sets')}</span>
                                                                <span className="reps">{exercise.reps} {t('programs.reps')}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="rest-day">
                                                    <span>{t('programs.restDay')}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'nutrition' && (
                            <div className="nutrition-plan">
                                <div className="recipes-grid">
                                    {program.recipes.map((recipe, index) => (
                                        <div key={index} className="recipe-card">
                                            <div className="recipe-image-container">
                                                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                                                <div className="recipe-overlay">
                                                    <h3 className="recipe-title">{recipe.name}</h3>
                                                </div>
                                            </div>

                                            <div className="recipe-content">
                                                <div className="macros-strip">
                                                    <div className="macro-item">
                                                        <span className="macro-value">{recipe.macros.calories}</span>
                                                        <span className="macro-label">cal</span>
                                                    </div>
                                                    <div className="macro-item">
                                                        <span className="macro-value">{recipe.macros.protein}g</span>
                                                        <span className="macro-label">{t('programs.nutrition.protein')}</span>
                                                    </div>
                                                    <div className="macro-item">
                                                        <span className="macro-value">{recipe.macros.carbs}g</span>
                                                        <span className="macro-label">{t('programs.nutrition.carbs')}</span>
                                                    </div>
                                                    <div className="macro-item">
                                                        <span className="macro-value">{recipe.macros.fat}g</span>
                                                        <span className="macro-label">{t('programs.nutrition.fat')}</span>
                                                    </div>
                                                </div>

                                                <div className="recipe-details">
                                                    <div className="ingredients-section">
                                                        <h4>{t('programs.nutrition.ingredients')}</h4>
                                                        <ul className="ingredients-list">
                                                            {recipe.ingredients.map((ingredient, idx) => (
                                                                <li key={idx}>{ingredient}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="instructions-section">
                                                        <h4>{t('programs.nutrition.instructions')}</h4>
                                                        <p>{recipe.instructions}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetails;