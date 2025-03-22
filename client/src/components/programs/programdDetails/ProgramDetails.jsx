import React from 'react';
import { useParams } from 'react-router-dom';
import programs from '../programsData.js';
import './programdetails.css';

const ProgramDetails = () => {
    const { programId } = useParams();
    const program = programs.find((prog) => prog.id.toString() === programId);

    if (!program) {
        return <p>Program not found.</p>;
    }

    return (
        <div className="program-details-container">
            <div className="program-details-info">
                <h1 className="program-details-name">{program.name}</h1>
            </div>
            <div className="program-details-training-days">
                <h2>Training Schedule</h2>
                {program.days.map((day, index) => (
                    <div key={index} className="program-details-training-day">
                        <h3>{day.day}</h3>
                        {day.exercises.length > 0 ? (
                            <ul>
                                {day.exercises.map((exercise, index) => (
                                    <li key={index}>
                                        {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No exercises for today!</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="program-details-recipes-container">
                <h2 className="program-details-recipe">Recipes</h2>
                {program.recipes.map((recipe, index) => (
                    <div key={index} className="program-details-recipe">
                        <h2>{recipe.name}</h2>
                        <img src={recipe.image} alt={recipe.name} className="program-details-recipe-image" />
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        <div className="program-details-recipe-macros">
                            <p><strong>Calories:</strong> {recipe.macros.calories} kcal</p>
                            <p><strong>Protein:</strong> {recipe.macros.protein}g</p>
                            <p><strong>Fat:</strong> {recipe.macros.fat}g</p>
                            <p><strong>Carbs:</strong> {recipe.macros.carbs}g</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramDetails;