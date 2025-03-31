import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext.jsx';
import './programdetails.css';

const ProgramDetails = () => {
    const { programId } = useParams();
    const { programs, getAllPrograms } = useAuth();
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('schedule');
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
                    <h1>Loading Program...</h1>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (!program) {
        return (
            <div className="program-not-found">
                <div className="container">
                    <h1>Program Not Found</h1>
                    <p>The program you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    const getDifficultyLabel = () => {
        if (program.difficulty === 'beginner') return { label: 'Beginner', color: '#4CAF50' };
        if (program.difficulty === 'intermediate') return { label: 'Intermediate', color: '#FF9800' };
        if (program.difficulty === 'advanced') return { label: 'Advanced', color: '#F44336' };
        return { label: 'All Levels', color: '#2196F3' };
    };

    const difficulty = getDifficultyLabel();

    return (
        <div className="program-details-page">
            <div className="program-header" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${program.background || '/images/fitness-bg.jpg'})`}}>
                <div className="container-hero">
                    <div className="program-badge-details" style={{backgroundColor: difficulty.color}}>
                        {difficulty.label}
                    </div>
                    <h1 className="program-title">{program.name}</h1>
                    <p className="program-description">{program.description}</p>
                    
                    <div className="program-meta">
                        <div className="program-meta-item">
                            <i className="far fa-calendar-alt"></i>
                            <span>{program.days.length} Days</span>
                        </div>
                        <div className="program-meta-item">
                            <i className="fas fa-fire-alt"></i>
                            <span>{program.calories || '~2000'} cal</span>
                        </div>
                        <div className="program-meta-item">
                            <i className="fas fa-stopwatch"></i>
                            <span>{program.duration || '4-6'} weeks</span>
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
                            Training Schedule
                        </button>
                        <button 
                            className={`tab-button-program ${activeTab === 'nutrition' ? 'active' : ''}`}
                            onClick={() => setActiveTab('nutrition')}
                        >
                            Nutrition Plan
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
                                                                <span className="sets">{exercise.sets} sets</span>
                                                                <span className="reps">{exercise.reps} reps</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="rest-day">
                                                    <span>Rest Day</span>
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
                                                        <span className="macro-label">protein</span>
                                                    </div>
                                                    <div className="macro-item">
                                                        <span className="macro-value">{recipe.macros.carbs}g</span>
                                                        <span className="macro-label">carbs</span>
                                                    </div>
                                                    <div className="macro-item">
                                                        <span className="macro-value">{recipe.macros.fat}g</span>
                                                        <span className="macro-label">fat</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="recipe-details">
                                                    <div className="ingredients-section">
                                                        <h4>Ingredients</h4>
                                                        <ul className="ingredients-list">
                                                            {recipe.ingredients.map((ingredient, idx) => (
                                                                <li key={idx}>{ingredient}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    
                                                    <div className="instructions-section">
                                                        <h4>Instructions</h4>
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