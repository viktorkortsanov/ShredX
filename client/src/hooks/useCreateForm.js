import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { useTranslation } from 'react-i18next';

export const useCreateForm = () => {
  const { t } = useTranslation();
  const { onSubmitProgram } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const [programImageFile, setProgramImageFile] = useState(null);
  const [programImagePreview, setProgramImagePreview] = useState(null);
  const [recipeImageFiles, setRecipeImageFiles] = useState({});
  const [recipeImagePreviews, setRecipeImagePreviews] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    difficulty: 'beginner',
    days: [
      {
        day: 'Day 1',
        isRestDay: false,
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
  
    const validateField = (name, value) => {
      let fieldErrors = {};
      
      if (name === 'name') {
        if (value.trim().length < 3) {
          fieldErrors.name = t('validation.program.name.minLength');
        }
      } else if (name === 'description') {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 5) {
          fieldErrors.description = t('validation.program.description.minWords');
        }
      } else if (name === 'price') {
        if (isNaN(parseFloat(value.replace(',', '.')))) {
          fieldErrors.price = t('validation.program.price.numeric');
        }
      }
      
      return fieldErrors;
    };

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
  }, [formData, t]);

  const handleProgramImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProgramImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProgramImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRecipeImageChange = (recipeIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipeImageFiles(prev => ({
        ...prev,
        [recipeIndex]: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeImagePreviews(prev => ({
          ...prev,
          [recipeIndex]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebase = async (file, folder) => {
    try {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file to Firebase:', error);
      throw error;
    }
  };

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });

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

  const addDay = () => {
    setFormData(prev => ({
      ...prev,
      days: [
        ...prev.days,
        {
          day: `Day ${prev.days.length + 1}`,
          isRestDay: false,
          exercises: []
        }
      ]
    }));
  };

  const removeDay = (index) => {
    const updatedDays = [...formData.days];
    updatedDays.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

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

  const addExercise = (dayIndex) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises.push({ name: '', sets: 0, reps: 0 });
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

  const removeExercise = (dayIndex, exerciseIndex) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setFormData(prev => ({
      ...prev,
      days: updatedDays
    }));
  };

  const handleRecipeChange = (index, field, value) => {
    const updatedRecipes = [...formData.recipes];
    
    if (field.includes('macros.')) {
      const macroField = field.split('.')[1];

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

  const handleIngredientChange = (recipeIndex, ingredientIndex, value) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes[recipeIndex].ingredients[ingredientIndex] = value;
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  const addIngredient = (recipeIndex) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes[recipeIndex].ingredients.push('');
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  const removeIngredient = (recipeIndex, ingredientIndex) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

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

  const removeRecipe = (index) => {
    const updatedRecipes = [...formData.recipes];
    updatedRecipes.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      recipes: updatedRecipes
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) {
      formErrors.name = t('validation.program.name.required');
    } else if (formData.name.trim().length < 3) {
      formErrors.name = t('validation.program.name.minLength');
    }
    
    if (!formData.description.trim()) {
      formErrors.description = t('validation.program.description.required');
    } else {
      const wordCount = formData.description.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount < 5) {
        formErrors.description = t('validation.program.description.minWords');
      }
    }

    if (!formData.image.trim() && !programImageFile) {
      formErrors.image = t('validation.program.image.required');
    }
    
    if (!formData.price) {
      formErrors.price = t('validation.program.price.required');
    } else if (isNaN(parseFloat(formData.price.replace(',', '.')))) {
      formErrors.price = t('validation.program.price.numeric');
    }
    
    if (!formData.difficulty) {
      formErrors.difficulty = t('validation.program.difficulty.required');
    }

    let dayErrors = [];
    formData.days.forEach((day, dayIndex) => {
      let dayError = {};
      
      if (!day.day.trim()) {
        dayError.day = t('validation.program.day.required');
      }
      
      let exerciseErrors = [];
      if (!day.isRestDay) {
        day.exercises.forEach((exercise, exerciseIndex) => {
          let exerciseError = {};
          
          if (!exercise.name.trim()) {
            exerciseError.name = t('validation.program.exercise.name');
          }
          
          if (exercise.sets <= 0) {
            exerciseError.sets = t('validation.program.exercise.sets');
          }
          
          if (exercise.reps <= 0) {
            exerciseError.reps = t('validation.program.exercise.reps');
          }
          
          if (Object.keys(exerciseError).length > 0) {
            exerciseErrors[exerciseIndex] = exerciseError;
          }
        });
      }
      
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

    let recipeErrors = [];
    formData.recipes.forEach((recipe, recipeIndex) => {
      let recipeError = {};
      
      if (!recipe.name.trim()) {
        recipeError.name = t('validation.program.recipe.name');
      }
      
      if (!recipe.image.trim() && !recipeImageFiles[recipeIndex]) {
        recipeError.image = t('validation.program.recipe.image');
      }
      
      if (!recipe.instructions.trim()) {
        recipeError.instructions = t('validation.program.recipe.instructions');
      }
      
      let ingredientErrors = [];
      recipe.ingredients.forEach((ingredient, ingredientIndex) => {
        if (!ingredient.trim()) {
          ingredientErrors[ingredientIndex] = t('validation.program.recipe.ingredient');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);

      showNotification(t('validation.program.form.fixErrors'), 'error');
      return;
    }
    
    try {
      setIsLoading(true);
      setUploadingImages(true);

      let updatedFormData = { ...formData };

      if (programImageFile) {
        const programImageUrl = await uploadImageToFirebase(programImageFile, 'program-images');
        updatedFormData.image = programImageUrl;
      }

      if (Object.keys(recipeImageFiles).length > 0) {
        const updatedRecipes = [...formData.recipes];
        
        for (const [index, file] of Object.entries(recipeImageFiles)) {
          const recipeImageUrl = await uploadImageToFirebase(file, 'recipe-images');
          updatedRecipes[index] = {
            ...updatedRecipes[index],
            image: recipeImageUrl
          };
        }
        
        updatedFormData.recipes = updatedRecipes;
      }

      const processedData = {
        ...updatedFormData,
        price: updatedFormData.price.toString()
      };
      
      await onSubmitProgram(processedData);

      showNotification(t('validation.program.form.success'), 'success');
      
      setFormData({
        name: '',
        description: '',
        image: '',
        price: '',
        difficulty: 'beginner',
        days: [
          {
            day: 'Day 1',
            isRestDay: false,
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
      

      setProgramImageFile(null);
      setProgramImagePreview(null);
      setRecipeImageFiles({});
      setRecipeImagePreviews({});
      
    } catch (err) {

      showNotification(err.message || t('validation.program.form.error'), 'error');
    } finally {
      setIsLoading(false);
      setUploadingImages(false);
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
    uploadingImages,
    errors,
    notification,

    programImageFile,
    programImagePreview,
    handleProgramImageChange,
    recipeImageFiles,
    recipeImagePreviews,
    handleRecipeImageChange
  };
};