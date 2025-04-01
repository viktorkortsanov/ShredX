import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './createProgram.css';
import { useCreateForm } from '../../../hooks/useCreateForm';
import { FaTrash, FaPlus, FaArrowLeft, FaUpload } from 'react-icons/fa';
import { useEffect } from 'react';

const CreateProgram = () => {
  const { t } = useTranslation();
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
    uploadingImages,
    errors,
    notification,
    programImageFile,
    programImagePreview,
    handleProgramImageChange,
    recipeImageFiles,
    recipeImagePreviews,
    handleRecipeImageChange
  } = useCreateForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  return (
    <div className="create-program-container">
      <div className="create-program-header">
        <Link to="/adminpanel" className="back-link">
        <FaArrowLeft />
          <span>{t('admin.backToDashboard')}</span>
        </Link>
        <h1>{t('programs.create.title')}</h1>
        <p className="create-program-subtitle">{t('programs.create.subtitle')}</p>
      </div>

      {notification && (
        <div className={`notification-message ${notification.type}`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          <span>{notification.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-program-form">
        <div className="form-section">
          <h2>{t('programs.create.basicInfo')}</h2>
          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">{t('programs.create.programName')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('programs.create.programNamePlaceholder')}
              required
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className={`form-group ${errors.difficulty ? 'has-error' : ''}`}>
            <label htmlFor="difficulty">{t('programs.create.difficulty')}</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty || 'beginner'}
              onChange={handleInputChange}
              required
            >
              <option value="beginner">{t('programs.difficulty.beginner')}</option>
              <option value="intermediate">{t('programs.difficulty.intermediate')}</option>
              <option value="advanced">{t('programs.difficulty.advanced')}</option>
              <option value="all">{t('programs.difficulty.allLevels')}</option>
            </select>
            {errors.difficulty && <div className="error-text">{errors.difficulty}</div>}
          </div>

          <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
            <label htmlFor="description">{t('programs.create.description')}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={t('programs.create.descriptionPlaceholder')}
              required
            ></textarea>
            {errors.description && <div className="error-text">{errors.description}</div>}
          </div>

          <div className={`form-group ${errors.image ? 'has-error' : ''}`}>
            <label htmlFor="image">{t('programs.create.programImage')}</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="program-image-file"
                onChange={handleProgramImageChange}
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="program-image-file" className="file-upload-label">
                <FaUpload /> {programImageFile ? programImageFile.name : t('programs.create.chooseImage')}
              </label>
              
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder={t('programs.create.enterImageUrl')}
                className={programImageFile ? 'hidden' : ''}
              />
            </div>
            {errors.image && <div className="error-text">{errors.image}</div>}
            {programImagePreview ? (
              <div className="image-preview">
                <img src={programImagePreview} alt={t('programs.create.programPreview')} />
              </div>
            ) : formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt={t('programs.create.programPreview')} />
              </div>
            )}
          </div>

          <div className={`form-group ${errors.price ? 'has-error' : ''}`}>
            <label htmlFor="price">{t('programs.create.price')}</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder={t('programs.create.pricePlaceholder')}
              required
            />
            {errors.price && <div className="error-text">{errors.price}</div>}
          </div>
        </div>

        <div className="form-section">
          <h2>{t('programs.create.trainingSchedule')}</h2>
          <p className="section-description">{t('programs.create.scheduleDescription')}</p>

          {formData.days.map((day, dayIndex) => (
            <div key={dayIndex} className="day-container">
              <div className="day-header">
                <h3>{t('programs.day')} {dayIndex + 1}</h3>
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
                <label htmlFor={`day-${dayIndex}`}>{t('programs.create.dayName')}</label>
                <input
                  type="text"
                  id={`day-${dayIndex}`}
                  value={day.day}
                  onChange={(e) => handleDayChange(dayIndex, 'day', e.target.value)}
                  placeholder={t('programs.create.dayNamePlaceholder')}
                  required
                />
                {errors.days && errors.days[dayIndex] && errors.days[dayIndex].day && (
                  <div className="error-text">{errors.days[dayIndex].day}</div>
                )}
              </div>

              <div className="form-group rest-day-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={day.isRestDay || false}
                    onChange={(e) => handleDayChange(dayIndex, 'isRestDay', e.target.checked)}
                  />
                  {t('programs.restDay')}
                </label>
              </div>

              {!day.isRestDay && (
                <div className="exercises-container">
                  <h4>{t('programs.create.exercises')}</h4>
                  
                  {day.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="exercise-item">
                      <div className="exercise-fields">
                        <div className={`form-group ${errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].name ? 'has-error' : ''}`}>
                          <label htmlFor={`exercise-${dayIndex}-${exerciseIndex}`}>{t('programs.create.exerciseName')}</label>
                          <input
                            type="text"
                            id={`exercise-${dayIndex}-${exerciseIndex}`}
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                            placeholder={t('programs.create.exerciseNamePlaceholder')}
                            required
                          />
                          {errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].name && (
                            <div className="error-text">{errors.days[dayIndex].exercises[exerciseIndex].name}</div>
                          )}
                        </div>
                        
                        <div className={`form-group form-group-small ${errors.days && errors.days[dayIndex] && errors.days[dayIndex].exercises && errors.days[dayIndex].exercises[exerciseIndex] && errors.days[dayIndex].exercises[exerciseIndex].sets ? 'has-error' : ''}`}>
                          <label htmlFor={`sets-${dayIndex}-${exerciseIndex}`}>{t('programs.sets')}</label>
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
                          <label htmlFor={`reps-${dayIndex}-${exerciseIndex}`}>{t('programs.reps')}</label>
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
                    <FaPlus /> {t('programs.create.addExercise')}
                  </button>
                </div>
              )}
            </div>
          ))}

          <button 
            type="button" 
            className="add-day-btn"
            onClick={addDay}
          >
            <i className="fas fa-plus"></i> {t('programs.create.addTrainingDay')}
          </button>
        </div>

        <div className="form-section">
          <h2>{t('programs.create.nutrition')}</h2>
          <p className="section-description">{t('programs.create.nutritionDescription')}</p>

          {formData.recipes.map((recipe, recipeIndex) => (
            <div key={recipeIndex} className="recipe-container">
              <div className="recipe-header">
                <h3>{t('programs.recipe')} {recipeIndex + 1}</h3>
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
                <label htmlFor={`recipe-name-${recipeIndex}`}>{t('programs.create.recipeName')}</label>
                <input
                  type="text"
                  id={`recipe-name-${recipeIndex}`}
                  value={recipe.name}
                  onChange={(e) => handleRecipeChange(recipeIndex, 'name', e.target.value)}
                  placeholder={t('programs.create.recipeNamePlaceholder')}
                  required
                />
                {errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].name && (
                  <div className="error-text">{errors.recipes[recipeIndex].name}</div>
                )}
              </div>

              <div className={`form-group ${errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].image ? 'has-error' : ''}`}>
                <label htmlFor={`recipe-image-${recipeIndex}`}>{t('programs.create.recipeImage')}</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id={`recipe-image-file-${recipeIndex}`}
                    onChange={(e) => handleRecipeImageChange(recipeIndex, e)}
                    accept="image/*"
                    className="file-input"
                  />
                  <label htmlFor={`recipe-image-file-${recipeIndex}`} className="file-upload-label">
                    <FaUpload /> {recipeImageFiles[recipeIndex] ? recipeImageFiles[recipeIndex].name : t('programs.create.chooseImage')}
                  </label>
                  
                  <input
                    type="text"
                    id={`recipe-image-${recipeIndex}`}
                    value={recipe.image}
                    onChange={(e) => handleRecipeChange(recipeIndex, 'image', e.target.value)}
                    placeholder={t('programs.create.enterImageUrl')}
                    className={recipeImageFiles[recipeIndex] ? 'hidden' : ''}
                  />
                </div>
                {errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].image && (
                  <div className="error-text">{errors.recipes[recipeIndex].image}</div>
                )}
                {recipeImagePreviews[recipeIndex] ? (
                  <div className="image-preview small">
                    <img src={recipeImagePreviews[recipeIndex]} alt={t('programs.create.recipePreview')} />
                  </div>
                ) : recipe.image && (
                  <div className="image-preview small">
                    <img src={recipe.image} alt={t('programs.create.recipePreview')} />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>{t('programs.nutrition.ingredients')}</label>
                {recipe.ingredients.map((ingredient, ingredientIndex) => (
                  <div key={ingredientIndex} className={`ingredient-item ${errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].ingredients && errors.recipes[recipeIndex].ingredients[ingredientIndex] ? 'has-error' : ''}`}>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(recipeIndex, ingredientIndex, e.target.value)}
                      placeholder={t('programs.create.ingredientPlaceholder')}
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
                   <FaPlus /> {t('programs.create.addIngredient')}
                </button>
              </div>

              <div className={`form-group ${errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].instructions ? 'has-error' : ''}`}>
                <label htmlFor={`instructions-${recipeIndex}`}>{t('programs.nutrition.instructions')}</label>
                <textarea
                  id={`instructions-${recipeIndex}`}
                  value={recipe.instructions}
                  onChange={(e) => handleRecipeChange(recipeIndex, 'instructions', e.target.value)}
                  placeholder={t('programs.create.instructionsPlaceholder')}
                  required
                ></textarea>
                {errors.recipes && errors.recipes[recipeIndex] && errors.recipes[recipeIndex].instructions && (
                  <div className="error-text">{errors.recipes[recipeIndex].instructions}</div>
                )}
              </div>

              <div className="macros-container">
                <h4>{t('programs.create.macronutrients')}</h4>
                <div className="macros-grid">
                  <div className="form-group form-group-small">
                    <label htmlFor={`calories-${recipeIndex}`}>{t('programs.nutrition.calories')}</label>
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
                    <label htmlFor={`protein-${recipeIndex}`}>{t('programs.nutrition.protein')} (g)</label>
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
                    <label htmlFor={`fat-${recipeIndex}`}>{t('programs.nutrition.fat')} (g)</label>
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
                    <label htmlFor={`carbs-${recipeIndex}`}>{t('programs.nutrition.carbs')} (g)</label>
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
            <i className="fas fa-plus"></i> {t('programs.create.addRecipe')}
          </button>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading || uploadingImages}
          >
            {isLoading || uploadingImages ? t('programs.create.creating') : t('programs.create.createProgram')}
          </button>
          <Link to="/adminpanel" className="cancel-btn">
            {t('common.cancel')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateProgram;