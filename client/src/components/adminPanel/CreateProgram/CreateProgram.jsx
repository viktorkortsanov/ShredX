import { Link } from 'react-router-dom';
import './createProgram.css';
import { useCreateForm } from '../../../hooks/useCreateForm';
import { FaTrash, FaPlus, FaArrowLeft } from 'react-icons/fa';
const CreateProgram = () => {
  const {
    formData,
    handleInputChange,
    handleDayChange,
    addDay,
    removeDay,
    handleExerciseChange,
    addExercise,
    removeExercise,
    handleRecipeChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    addRecipe,
    removeRecipe,
    handleSubmit,
    isLoading,
    errors,
    notification
  } = useCreateForm();

  return (
    <div className="create-program-container">
      <div className="create-program-header">
        <Link to="/adminpanel" className="back-link">
        <FaArrowLeft />
          <span>Back to Admin Dashboard</span>
        </Link>
        <h1>Create New Training Program</h1>
        <p className="create-program-subtitle">Fill in the details to create a new training program for users</p>
      </div>

      {notification && (
        <div className={`notification-message ${notification.type}`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          <span>{notification.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-program-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">Program Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Push, Pull, Legs (min. 3 characters)"
              required
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the program and its benefits (min. 5 words)"
              required
            ></textarea>
            {errors.description && <div className="error-text">{errors.description}</div>}
          </div>

          <div className={`form-group ${errors.image ? 'has-error' : ''}`}>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="/images/program.jpg"
              required
            />
            {errors.image && <div className="error-text">{errors.image}</div>}
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Program preview" />
              </div>
            )}
          </div>

          <div className={`form-group ${errors.price ? 'has-error' : ''}`}>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g. 9,99"
              required
            />
            {errors.price && <div className="error-text">{errors.price}</div>}
          </div>
        </div>

        <div className="form-section">
          <h2>Training Schedule</h2>
          <p className="section-description">Define the training days and exercises for each day</p>

          {formData.days.map((day, dayIndex) => (
            <div key={dayIndex} className="day-container">
              <div className="day-header">
                <h3>Day {dayIndex + 1}</h3>
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeDay(dayIndex)}
                  disabled={formData.days.length <= 1}
                >
                <FaTrash />
                </button>
              </div>

              <div className={`form-group ${errors.days && errors.days[dayIndex] && errors.days[dayIndex].day ? 'has-error' : ''}`}>
                <label htmlFor={`day-${dayIndex}`}>Day Name</label>
                <input
                  type="text"
                  id={`day-${dayIndex}`}
                  value={day.day}
                  onChange={(e) => handleDayChange(dayIndex, 'day', e.target.value)}
                  placeholder="e.g. Monday - Push"
                  required
                />
                {errors.days && errors.days[dayIndex] && errors.days[dayIndex].day && (
                  <div className="error-text">{errors.days[dayIndex].day}</div>
                )}
              </div>

              <div className="exercises-container">
                <h4>Exercises</h4>
                
                {day.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="exercise-item">
                    <div className="exercise-fields">
                      <div className={`form-group ${errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].name ? 'has-error' : ''}`}>
                        <label htmlFor={`exercise-${dayIndex}-${exerciseIndex}`}>Exercise Name</label>
                        <input
                          type="text"
                          id={`exercise-${dayIndex}-${exerciseIndex}`}
                          value={exercise.name}
                          onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                          placeholder="e.g. Bench Press"
                          required
                        />
                        {errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].name && (
                          <div className="error-text">{errors.days[dayIndex].exercises[exerciseIndex].name}</div>
                        )}
                      </div>
                      
                      <div className={`form-group form-group-small ${errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].sets ? 'has-error' : ''}`}>
                        <label htmlFor={`sets-${dayIndex}-${exerciseIndex}`}>Sets</label>
                        <input
                          type="number"
                          id={`sets-${dayIndex}-${exerciseIndex}`}
                          value={exercise.sets}
                          onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', e.target.value)}
                          min="1"
                          required
                        />
                        {errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].sets && (
                          <div className="error-text">{errors.days[dayIndex].exercises[exerciseIndex].sets}</div>
                        )}
                      </div>
                      
                      <div className={`form-group form-group-small ${errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].reps ? 'has-error' : ''}`}>
                        <label htmlFor={`reps-${dayIndex}-${exerciseIndex}`}>Reps</label>
                        <input
                          type="number"
                          id={`reps-${dayIndex}-${exerciseIndex}`}
                          value={exercise.reps}
                          onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'reps', e.target.value)}
                          min="1"
                          required
                        />
                        {errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].reps && (
                          <div className="error-text">{errors.days[dayIndex].exercises[exerciseIndex].reps}</div>
                        )}
                      </div>

                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => removeExercise(dayIndex, exerciseIndex)}
                        disabled={day.exercises.length <= 1}
                      >
                    <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}

                <button 
                  type="button" 
                  className="add-btn"
                  onClick={() => addExercise(dayIndex)}
                >
                   <FaPlus /> Add Exercise
                </button>
              </div>
            </div>
          ))}

          <button 
            type="button" 
            className="add-day-btn"
            onClick={addDay}
          >
            <i className="fas fa-plus"></i> Add Training Day
          </button>
        </div>

        <div className="form-section">
          <h2>Nutrition</h2>
          <p className="section-description">Add recipes and meal plans to complement the training program</p>

          {formData.recipes.map((recipe, recipeIndex) => (
            <div key={recipeIndex} className="recipe-container">
              <div className="recipe-header">
                <h3>Recipe {recipeIndex + 1}</h3>
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeRecipe(recipeIndex)}
                  disabled={formData.recipes.length <= 1}
                >
                <FaTrash />
                </button>
              </div>

              <div className={`form-group ${errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].name ? 'has-error' : ''}`}>
                <label htmlFor={`recipe-name-${recipeIndex}`}>Recipe Name</label>
                <input
                  type="text"
                  id={`recipe-name-${recipeIndex}`}
                  value={recipe.name}
                  onChange={(e) => handleRecipeChange(recipeIndex, 'name', e.target.value)}
                  placeholder="e.g. Protein Smoothie"
                  required
                />
                {errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].name && (
                  <div className="error-text">{errors.recipes[recipeIndex].name}</div>
                )}
              </div>

              <div className={`form-group ${errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].image ? 'has-error' : ''}`}>
                <label htmlFor={`recipe-image-${recipeIndex}`}>Image URL</label>
                <input
                  type="text"
                  id={`recipe-image-${recipeIndex}`}
                  value={recipe.image}
                  onChange={(e) => handleRecipeChange(recipeIndex, 'image', e.target.value)}
                  placeholder="/images/smoothie.jpg"
                  required
                />
                {errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].image && (
                  <div className="error-text">{errors.recipes[recipeIndex].image}</div>
                )}
                {recipe.image && (
                  <div className="image-preview small">
                    <img src={recipe.image} alt="Recipe preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                {recipe.ingredients.map((ingredient, ingredientIndex) => (
                  <div key={ingredientIndex} className={`ingredient-item ${errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].ingredients && errors.recipes[recipeIndex].ingredients[ingredientIndex] ? 'has-error' : ''}`}>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(recipeIndex, ingredientIndex, e.target.value)}
                      placeholder="e.g. 1 banana"
                      required
                    />
                    <button 
                      type="button" 
                      className="remove-btn"
                      onClick={() => removeIngredient(recipeIndex, ingredientIndex)}
                      disabled={recipe.ingredients.length <= 1}
                    >
                     <FaTrash />
                    </button>
                    {errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].ingredients && errors.recipes[recipeIndex].ingredients[ingredientIndex] && (
                      <div className="error-text ingredient-error">{errors.recipes[recipeIndex].ingredients[ingredientIndex]}</div>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-btn small"
                  onClick={() => addIngredient(recipeIndex)}
                >
                   <FaPlus /> Add Ingredient
                </button>
              </div>

              <div className={`form-group ${errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].instructions ? 'has-error' : ''}`}>
                <label htmlFor={`instructions-${recipeIndex}`}>Instructions</label>
                <textarea
                  id={`instructions-${recipeIndex}`}
                  value={recipe.instructions}
                  onChange={(e) => handleRecipeChange(recipeIndex, 'instructions', e.target.value)}
                  placeholder="How to prepare the recipe"
                  required
                ></textarea>
                {errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].instructions && (
                  <div className="error-text">{errors.recipes[recipeIndex].instructions}</div>
                )}
              </div>

              <div className="macros-container">
                <h4>Macronutrients</h4>
                <div className="macros-grid">
                  <div className="form-group form-group-small">
                    <label htmlFor={`calories-${recipeIndex}`}>Calories</label>
                    <input
                      type="number"
                      id={`calories-${recipeIndex}`}
                      value={recipe.macros.calories}
                      onChange={(e) => handleRecipeChange(recipeIndex, 'macros.calories', e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group form-group-small">
                    <label htmlFor={`protein-${recipeIndex}`}>Protein (g)</label>
                    <input
                      type="number"
                      id={`protein-${recipeIndex}`}
                      value={recipe.macros.protein}
                      onChange={(e) => handleRecipeChange(recipeIndex, 'macros.protein', e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group form-group-small">
                    <label htmlFor={`fat-${recipeIndex}`}>Fat (g)</label>
                    <input
                      type="number"
                      id={`fat-${recipeIndex}`}
                      value={recipe.macros.fat}
                      onChange={(e) => handleRecipeChange(recipeIndex, 'macros.fat', e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group form-group-small">
                    <label htmlFor={`carbs-${recipeIndex}`}>Carbs (g)</label>
                    <input
                      type="number"
                      id={`carbs-${recipeIndex}`}
                      value={recipe.macros.carbs}
                      onChange={(e) => handleRecipeChange(recipeIndex, 'macros.carbs', e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            type="button" 
            className="add-recipe-btn"
            onClick={addRecipe}
          >
            <i className="fas fa-plus"></i> Add Recipe
          </button>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Program'}
          </button>
          <Link to="/adminpanel" className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateProgram;