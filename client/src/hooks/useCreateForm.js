import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';

export const useCreateForm = () => {
  const { onSubmitProgram } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    days: [
      {
        day: 'Day 1',
        exercises: [
          { name: '', sets: 0, reps: 0 }
        ]
      }
    ],
    recipes: [
      {
        name: '',
        image: '',
        ingredients: [''],
        instructions: '',
        macros: {
          calories: 0,
          protein: 0,
          fat: 0,
          carbs: 0
        }
      }
    ]
  });

  useEffect(() => {
    // Проверка дали има грешки и тяхното изчистване при коригиране
  
const validateField = (name, value) => {
    let fieldErrors = {};
    
    if (name === 'name') {
      if (value.trim().length < 3) {
        fieldErrors.name = 'Program name must be at least 3 characters';
      }
    } else if (name === 'description') {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount < 5) {
        fieldErrors.description = 'Description must contain at least 5 words';
      }
    } else if (name === 'price') {
      if (isNaN(parseFloat(value.replace(',', '.')))) {
        fieldErrors.price = 'Price must be a number';
      }
    }
    
    return fieldErrors;
  };
    
    // Валидираme всяко поле и актуализирай грешките
    let newErrors = {};
    
    if (formData.name) {
      const nameErrors = validateField('name', formData.name);
      if (nameErrors.name) newErrors.name = nameErrors.name;
    }
    
    if (formData.description) {
      const descErrors = validateField('description', formData.description);
      if (descErrors.description) newErrors.description = descErrors.description;
    }
    
    if (formData.price) {
      const priceErrors = validateField('price', formData.price);
      if (priceErrors.price) newErrors.price = priceErrors.price;
    }
    
    setErrors(newErrors);
  }, [formData]);

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    
    // Автоматично скриваmе нотификацията след 5 секунди
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // prowerqwame cenata dali e 4islo  s regex
    if (name === 'price') {
      const priceValue = value.replace(/[^0-9.,]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: priceValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Обновяваме  ден
  const handleDayChange = (index, field, value) => {
    const updatedDays = [...formData.days];
    updatedDays[index] = {
      ...updatedDays[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

  // Добавяне на нов ден
  const addDay = () => {
    setFormData(prev => ({
      ...prev,
      days: [
        ...prev.days,
        {
          day: `Day ${prev.days.length + 1}`,
          exercises: []
        }
      ]
    }));
  };

  // Премахване на ден
  const removeDay = (index) => {
    const updatedDays = [...formData.days];
    updatedDays.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

  // Обновяване на упражнение
  const handleExerciseChange = (dayIndex, exerciseIndex, field, value) => {
    const updatedDays = [...formData.days];
    

    if (field === 'sets' || field === 'reps') {
      value = value.replace(/[^0-9]/g, '');
      value = parseInt(value) || 0;
    }
    
    updatedDays[dayIndex].exercises[exerciseIndex] = {
      ...updatedDays[dayIndex].exercises[exerciseIndex],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

  // ново упражнение
  const addExercise = (dayIndex) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises.push({ name: '', sets: 0, reps: 0 });
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

  // Премахване на упражнение
  const removeExercise = (dayIndex, exerciseIndex) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

  // Обновяване на рецепта
  const handleRecipeChange = (index, field, value) => {
    const updatedRecipes = [...formData.recipes];
    
    if (field.includes('macros.')) {
      const macroField = field.split('.')[1];
      
      // За макросите приемаме само числови стойности
      value = value.replace(/[^0-9]/g, '');
      value = parseInt(value) || 0;
      
      updatedRecipes[index] = {
        ...updatedRecipes[index],
        macros: {
          ...updatedRecipes[index].macros,
          [macroField]: value
        }
      };
    } else {
      updatedRecipes[index] = {
        ...updatedRecipes[index],
        [field]: value
      };
    }
    
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  // Обновяване на съставки на рецепта
  const handleIngredientChange = (recipeIndex, ingredientIndex, value) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes[recipeIndex].ingredients[ingredientIndex] = value;
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  // Добавяне на нова съставка
  const addIngredient = (recipeIndex) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes[recipeIndex].ingredients.push('');
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  // Премахване на съставка
  const removeIngredient = (recipeIndex, ingredientIndex) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  // Добавяне на нова рецепта
  const addRecipe = () => {
    setFormData(prev => ({
      ...prev,
      recipes: [
        ...prev.recipes,
        {
          name: '',
          image: '',
          ingredients: [''],
          instructions: '',
          macros: {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0
          }
        }
      ]
    }));
  };

  // Премахване на рецепта
  const removeRecipe = (index) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  // Валидация на цялата форма
  const validateForm = () => {
    let formErrors = {};
    
    // Валидация на основните полета
    if (!formData.name.trim()) {
      formErrors.name = 'Program name is required';
    } else if (formData.name.trim().length < 3) {
      formErrors.name = 'Program name must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      formErrors.description = 'Description is required';
    } else {
      const wordCount = formData.description.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount < 5) {
        formErrors.description = 'Description must contain at least 5 words';
      }
    }
    
    if (!formData.image.trim()) {
      formErrors.image = 'Image URL is required';
    }
    
    if (!formData.price) {
      formErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price.replace(',', '.')))) {
      formErrors.price = 'Price must be a number';
    }
    
    // Валидация на дните и упражненията
    let dayErrors = [];
    formData.days.forEach((day, dayIndex) => {
      let dayError = {};
      
      if (!day.day.trim()) {
        dayError.day = 'Day name is required';
      }
      
      let exerciseErrors = [];
      day.exercises.forEach((exercise, exerciseIndex) => {
        let exerciseError = {};
        
        if (!exercise.name.trim()) {
          exerciseError.name = 'Exercise name is required';
        }
        
        if (exercise.sets <= 0) {
          exerciseError.sets = 'Sets must be greater than 0';
        }
        
        if (exercise.reps <= 0) {
          exerciseError.reps = 'Reps must be greater than 0';
        }
        
        if (Object.keys(exerciseError).length > 0) {
          exerciseErrors[exerciseIndex] = exerciseError;
        }
      });
      
      if (exerciseErrors.length > 0) {
        dayError.exercises = exerciseErrors;
      }
      
      if (Object.keys(dayError).length > 0) {
        dayErrors[dayIndex] = dayError;
      }
    });
    
    if (dayErrors.length > 0) {
      formErrors.days = dayErrors;
    }
    
    // Валидация на рецептите
    let recipeErrors = [];
    formData.recipes.forEach((recipe, recipeIndex) => {
      let recipeError = {};
      
      if (!recipe.name.trim()) {
        recipeError.name = 'Recipe name is required';
      }
      
      if (!recipe.image.trim()) {
        recipeError.image = 'Recipe image URL is required';
      }
      
      if (!recipe.instructions.trim()) {
        recipeError.instructions = 'Instructions are required';
      }
      
      let ingredientErrors = [];
      recipe.ingredients.forEach((ingredient, ingredientIndex) => {
        if (!ingredient.trim()) {
          ingredientErrors[ingredientIndex] = 'Ingredient is required';
        }
      });
      
      if (ingredientErrors.length > 0) {
        recipeError.ingredients = ingredientErrors;
      }
      
      if (Object.keys(recipeError).length > 0) {
        recipeErrors[recipeIndex] = recipeError;
      }
    });
    
    if (recipeErrors.length > 0) {
      formErrors.recipes = recipeErrors;
    }
    
    return formErrors;
  };

  // Подаване на формата
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидирай формата преди изпращане
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      // Показваме нотификация за грешка
      showNotification('Please fix the errors in the form before submitting', 'error');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Трансформиране на данни ако е необходимо
      const processedData = {
        ...formData,
        price: formData.price.toString()
      };
      
      await onSubmitProgram(processedData);
      
      // Показваме нотификация за успех
      showNotification('Program created successfully!', 'success');
      
      // Ресетване на формата след успешно изпращане
      setFormData({
        name: '',
        description: '',
        image: '',
        price: '',
        days: [
          {
            day: 'Day 1',
            exercises: [
              { name: '', sets: 0, reps: 0 }
            ]
          }
        ],
        recipes: [
          {
            name: '',
            image: '',
            ingredients: [''],
            instructions: '',
            macros: {
              calories: 0,
              protein: 0,
              fat: 0,
              carbs: 0
            }
          }
        ]
      });
      
    } catch (err) {
      // Показваме нотификация за грешка
      showNotification(err.message || 'Error creating program', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};