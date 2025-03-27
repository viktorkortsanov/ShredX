const programs = [
    {
        id: 1,
        name: "Push, Pull, Legs",
        description: " Build Strength & Balance! – Scientifically proven split for maximum strength and muscle growth. Focus on pushing, pulling, and legs separately for optimal recovery and gains. Includes a structured weekly plan + recipes to fuel your progress!",
        image: "/images/ppl.webp",
        price: "9,99",
        days: [
            {
                day: "Monday - Push",
                exercises: [
                    { name: "Bench Press", sets: 4, reps: 8 },
                    { name: "Overhead Press", sets: 4, reps: 8 },
                    { name: "Incline Dumbbell Press", sets: 3, reps: 10 },
                    { name: "Tricep Dips", sets: 3, reps: 12 },
                    { name: "Push-Ups", sets: 3, reps: 15 }
                ]
            },
            {
                day: "Tuesday - Pull",
                exercises: [
                    { name: "Deadlift", sets: 4, reps: 6 },
                    { name: "Pull-Ups", sets: 4, reps: 8 },
                    { name: "Barbell Rows", sets: 4, reps: 8 },
                    { name: "Face Pulls", sets: 3, reps: 12 },
                    { name: "Barbell Curls", sets: 3, reps: 10 }
                ]
            },
            {
                day: "Wednesday - Rest",
                exercises: []
            },
            {
                day: "Thursday - Legs",
                exercises: [
                    { name: "Squats", sets: 4, reps: 8 },
                    { name: "Leg Press", sets: 4, reps: 10 },
                    { name: "Romanian Deadlifts", sets: 4, reps: 8 },
                    { name: "Leg Curls", sets: 3, reps: 12 },
                    { name: "Calf Raises", sets: 3, reps: 15 }
                ]
            },
            {
                day: "Friday - Push",
                exercises: [
                    { name: "Flat Barbell Press", sets: 4, reps: 8 },
                    { name: "Dumbbell Shoulder Press", sets: 3, reps: 10 },
                    { name: "Cable Chest Fly", sets: 3, reps: 12 },
                    { name: "Dips", sets: 3, reps: 12 },
                    { name: "Tricep Pushdown", sets: 3, reps: 12 }
                ]
            },
            {
                day: "Saturday - Pull",
                exercises: [
                    { name: "Barbell Rows", sets: 4, reps: 8 },
                    { name: "Lat Pulldown", sets: 4, reps: 8 },
                    { name: "T-Bar Row", sets: 3, reps: 10 },
                    { name: "EZ Bar Curl", sets: 3, reps: 10 },
                    { name: "Hammer Curls", sets: 3, reps: 12 }
                ]
            },
            {
                day: "Sunday - Rest",
                exercises: []
            }
        ],
        recipes: [
            {
                name: "Protein Smoothie",
                image: "/images/protein-smoothie.jpg",
                ingredients: ["1 banana", "1 scoop whey protein", "200 ml almond milk"],
                instructions: "Blend all ingredients together for a delicious smoothie.",
                macros: {
                    calories: 250,
                    protein: 20,
                    fat: 7,
                    carbs: 30,
                }
            },
            {
                name: "Grilled Chicken Salad",
                image:"/images/grilled-chicken-salad.jpg",
                ingredients: ["200g chicken breast", "mixed greens", "olive oil"],
                instructions: "Grill the chicken, chop veggies, and mix together with olive oil.",
                macros: {
                    calories: 350,
                    protein: 30,
                    fat: 18,
                    carbs: 10,
                }
            }
        ]
    },
    {
        id: 2,
        name: "Upper Lower",
        description: "Efficient & Powerful! – Train upper and lower body on alternating days, maximizing muscle recovery and workout intensity. Ideal for strength & hypertrophy, with flexibility for busy schedules. Comes with a ready-made weekly plan + nutrition guide!",
        image: "/images/ul.webp",
        price: "10,99",
        days: [
            {
                day: "Monday - Upper",
                exercises: [
                    { name: "Overhead Press", sets: 4, reps: 8 },
                    { name: "Bench Press", sets: 4, reps: 8 },
                    { name: "Dumbbell Rows", sets: 4, reps: 10 },
                    { name: "Barbell Curls", sets: 3, reps: 10 },
                    { name: "Tricep Dips", sets: 3, reps: 12 }
                ]
            },
            {
                day: "Tuesday - Lower",
                exercises: [
                    { name: "Squats", sets: 4, reps: 8 },
                    { name: "Leg Press", sets: 4, reps: 10 },
                    { name: "Romanian Deadlifts", sets: 4, reps: 8 },
                    { name: "Leg Curls", sets: 3, reps: 12 },
                    { name: "Calf Raises", sets: 3, reps: 15 }
                ]
            },
            {
                day: "Wednesday - Upper",
                exercises: [
                    { name: "Dumbbell Shoulder Press", sets: 4, reps: 8 },
                    { name: "Pull-Ups", sets: 4, reps: 8 },
                    { name: "Incline Dumbbell Press", sets: 4, reps: 10 },
                    { name: "EZ Bar Curl", sets: 3, reps: 12 },
                    { name: "Skull Crushers", sets: 3, reps: 10 }
                ]
            },
            {
                day: "Thursday - Lower",
                exercises: [
                    { name: "Deadlift", sets: 4, reps: 6 },
                    { name: "Squat", sets: 4, reps: 8 },
                    { name: "Lunges", sets: 4, reps: 10 },
                    { name: "Leg Extensions", sets: 3, reps: 12 },
                    { name: "Calf Raises", sets: 3, reps: 15 }
                ]
            },
            {
                day: "Friday - Upper",
                exercises: [
                    { name: "Barbell Rows", sets: 4, reps: 8 },
                    { name: "Chest Fly", sets: 3, reps: 12 },
                    { name: "Bicep Curl", sets: 3, reps: 12 },
                    { name: "Dumbbell Shrugs", sets: 4, reps: 10 },
                    { name: "Overhead Tricep Extension", sets: 3, reps: 12 }
                ]
            },
            {
                day: "Saturday - Lower",
                exercises: [
                    { name: "Squats", sets: 4, reps: 8 },
                    { name: "Leg Press", sets: 4, reps: 10 },
                    { name: "Deadlifts", sets: 4, reps: 6 },
                    { name: "Hip Thrusts", sets: 3, reps: 10 },
                    { name: "Glute Bridges", sets: 3, reps: 12 }
                ]
            },
            {
                day: "Sunday - Rest",
                exercises: []
            }
        ],
        recipes: [
            {
                name: "Oats with Berries",
                image: "/images/oats-with-berries.jpg",
                ingredients: ["1 cup oats", "100g mixed berries", "honey"],
                instructions: "Cook the oats and top with fresh berries and a drizzle of honey.",
                macros: {
                    calories: 300,
                    protein: 6,
                    fat: 5,
                    carbs: 50,
                }
            },
            {
                name: "Grilled Salmon with Veggies",
                image: "/images/grilled-salmon-with-veggies.jpg",
                ingredients: ["200g salmon", "mixed veggies", "olive oil"],
                instructions: "Grill salmon and veggies with olive oil, salt, and pepper.",
                macros: {
                    calories: 450,
                    protein: 35,
                    fat: 28,
                    carbs: 10,
                }
            }
        ]

    },
    {
        id: 3,
        name: "Full Body",
        description: "Total Body Transformation! – Perfect for beginners & advanced lifters looking to hit every muscle group multiple times a week. Improve strength, endurance & muscle definition with a structured program & meal plan for optimal results!",
        image: "/images/fb.webp",
        price: "8,99",
        days: [
            {
                day: "Monday - Full Body",
                exercises: [
                    { name: "Deadlift", sets: 4, reps: 6 },
                    { name: "Squats", sets: 4, reps: 8 },
                    { name: "Bench Press", sets: 4, reps: 8 },
                    { name: "Pull-Ups", sets: 4, reps: 8 },
                    { name: "Overhead Press", sets: 4, reps: 8 }
                ]
            },
            {
                day: "Tuesday - Full Body",
                exercises: [
                    { name: "Romanian Deadlifts", sets: 4, reps: 8 },
                    { name: "Barbell Rows", sets: 4, reps: 8 },
                    { name: "Incline Dumbbell Press", sets: 3, reps: 10 },
                    { name: "Tricep Dips", sets: 3, reps: 12 },
                    { name: "Hammer Curls", sets: 3, reps: 12 }
                ]
            },
            {
                day: "Wednesday - Full Body",
                exercises: [
                    { name: "Squats", sets: 4, reps: 8 },
                    { name: "Deadlifts", sets: 4, reps: 6 },
                    { name: "Bench Press", sets: 4, reps: 8 },
                    { name: "Lat Pulldown", sets: 4, reps: 8 },
                    { name: "Barbell Curls", sets: 3, reps: 10 }
                ]
            },
            {
                day: "Thursday - Full Body",
                exercises: [
                    { name: "Leg Press", sets: 4, reps: 10 },
                    { name: "T-Bar Row", sets: 3, reps: 10 },
                    { name: "Incline Bench Press", sets: 4, reps: 8 },
                    { name: "Overhead Tricep Extension", sets: 3, reps: 12 },
                    { name: "EZ Bar Curl", sets: 3, reps: 10 }
                ]
            },
            {
                day: "Friday - Full Body",
                exercises: [
                    { name: "Squats", sets: 4, reps: 8 },
                    { name: "Deadlift", sets: 4, reps: 6 },
                    { name: "Pull-Ups", sets: 3, reps: 8 },
                    { name: "Dumbbell Shoulder Press", sets: 3, reps: 10 },
                    { name: "Dumbbell Lunges", sets: 3, reps: 12 },
                    { name: "Barbell Curl", sets: 3, reps: 10 },
                    { name: "Face Pulls", sets: 3, reps: 12 }
                ]
            },
            {
                day: "Saturday - Rest Day",
                exercises: []
            },
            {
                day: "Sunday - Rest Day",
                exercises: []
            },
        ],
        recipes: [
            {
                name: "Avocado Toast",
                image: "/images/avocado-toast.jpg",
                ingredients: ["1 slice whole-grain bread", "1/2 avocado", "salt", "pepper", "lemon juice"],
                instructions: "Toast the bread, mash the avocado, and spread it on the toast. Season with salt, pepper, and a squeeze of lemon juice.",
                macros: {
                    calories: 250,
                    protein: 6,
                    fat: 18,
                    carbs: 20,
                }
            },
            {
                name: "Chicken Stir-Fry",
                image: "/images/chicken-stir-fry.jpg",
                ingredients: ["200g chicken breast", "mixed veggies", "soy sauce", "olive oil", "garlic"],
                instructions: "Cook the chicken in olive oil with garlic, then add the veggies and soy sauce, and stir-fry until everything is cooked through.",
                macros: {
                    calories: 350,
                    protein: 30,
                    fat: 18,
                    carbs: 15,
                }
            }],
        },
        {
            id: 4,
            name: "Bro Split",
            description: "Classic Bodybuilding Routine! – Target one muscle group per day for insane pump and full recovery. Perfect for muscle definition & isolation work. Comes with a structured weekly training guide + meal plan to help you bulk up or shred down!",
            image: "/images/brosplit.webp",
            price: "5,99",
            days: [
                {
                    day: "Monday - Chest",
                    exercises: [
                        { name: "Bench Press", sets: 4, reps: 8 },
                        { name: "Incline Dumbbell Press", sets: 3, reps: 10 },
                        { name: "Cable Flys", sets: 3, reps: 12 },
                        { name: "Dips", sets: 3, reps: 12 },
                        { name: "Push-Ups", sets: 3, reps: 15 }
                    ]
                },
                {
                    day: "Tuesday - Back",
                    exercises: [
                        { name: "Pull-Ups", sets: 4, reps: 8 },
                        { name: "Barbell Rows", sets: 4, reps: 8 },
                        { name: "Lat Pulldown", sets: 3, reps: 10 },
                        { name: "Face Pulls", sets: 3, reps: 12 },
                        { name: "Deadlift", sets: 3, reps: 6 }
                    ]
                },
                {
                    day: "Wednesday - Shoulders",
                    exercises: [
                        { name: "Overhead Press", sets: 4, reps: 8 },
                        { name: "Lateral Raises", sets: 3, reps: 12 },
                        { name: "Rear Delt Flys", sets: 3, reps: 12 },
                        { name: "Shrugs", sets: 3, reps: 15 }
                    ]
                },
                {
                    day: "Thursday - Arms",
                    exercises: [
                        { name: "Bicep Curls", sets: 4, reps: 10 },
                        { name: "Triceps Dips", sets: 3, reps: 12 },
                        { name: "Hammer Curls", sets: 3, reps: 10 },
                        { name: "Close-Grip Bench Press", sets: 3, reps: 12 }
                    ]
                },
                {
                    day: "Friday - Legs",
                    exercises: [
                        { name: "Squats", sets: 4, reps: 8 },
                        { name: "Leg Press", sets: 4, reps: 10 },
                        { name: "Romanian Deadlifts", sets: 3, reps: 8 },
                        { name: "Leg Curls", sets: 3, reps: 12 },
                        { name: "Calf Raises", sets: 3, reps: 15 }
                    ]
                },
                {
                    day: "Saturday - Rest",
                    exercises: []
                },
                {
                    day: "Sunday - Rest",
                    exercises: []
                }
            ],
            recipes: [
                {
                    name: "Grilled Salmon with Garlic and Lemon",
                    image: "/images/grilled-salmon.jpg",
                    ingredients: ["200g salmon", "1 garlic clove", "1/2 lemon", "1 tsp olive oil"],
                    instructions: "Brush salmon with olive oil, lemon juice, and minced garlic, then grill until cooked.",
                    macros: {
                        calories: 450,
                        protein: 40,
                        fat: 25,
                        carbs: 5,
                    }
                },
                {
                    name: "Golden Rice with Vegetables and Chicken",
                    image: "/images/golden-rice.jpg",
                    ingredients: ["100g golden rice", "150g chicken breast", "1/2 red bell pepper", "1/2 carrot", "1 tsp turmeric"],
                    instructions: "Cook golden rice with turmeric, then sauté chicken and vegetables. Mix everything together.",
                    macros: {
                        calories: 500,
                        protein: 45,
                        fat: 10,
                        carbs: 60,
                    }
                }
            ]
        },
        {
            id: 5,
            name: "Arnold Split",
            description: "Train Like the Legend! – Inspired by Arnold Schwarzenegger’s iconic routine, this high-volume split will sculpt your physique like a champion. Focuses on chest/back, shoulders/arms, legs for maximum muscle growth. Includes a structured weekly plan & nutrition guide!",
            image: "/images/arnold.webp",
            price: "11,99",
            days: [
                {
                    day: "Monday - Chest",
                    exercises: [
                        { name: "Bench Press", sets: 4, reps: 8 },
                        { name: "Incline Dumbbell Press", sets: 3, reps: 10 },
                        { name: "Cable Flys", sets: 3, reps: 12 },
                        { name: "Dips", sets: 3, reps: 12 },
                        { name: "Push-Ups", sets: 3, reps: 15 }
                    ]
                },
                {
                    day: "Tuesday - Back",
                    exercises: [
                        { name: "Pull-Ups", sets: 4, reps: 8 },
                        { name: "Barbell Rows", sets: 4, reps: 8 },
                        { name: "Lat Pulldown", sets: 3, reps: 10 },
                        { name: "Face Pulls", sets: 3, reps: 12 },
                        { name: "Deadlift", sets: 3, reps: 6 }
                    ]
                },
                {
                    day: "Wednesday - Shoulders",
                    exercises: [
                        { name: "Overhead Press", sets: 4, reps: 8 },
                        { name: "Lateral Raises", sets: 3, reps: 12 },
                        { name: "Rear Delt Flys", sets: 3, reps: 12 },
                        { name: "Shrugs", sets: 3, reps: 15 }
                    ]
                },
                {
                    day: "Thursday - Arms",
                    exercises: [
                        { name: "Bicep Curls", sets: 4, reps: 10 },
                        { name: "Triceps Dips", sets: 3, reps: 12 },
                        { name: "Hammer Curls", sets: 3, reps: 10 },
                        { name: "Close-Grip Bench Press", sets: 3, reps: 12 }
                    ]
                },
                {
                    day: "Friday - Legs",
                    exercises: [
                        { name: "Squats", sets: 4, reps: 8 },
                        { name: "Leg Press", sets: 4, reps: 10 },
                        { name: "Romanian Deadlifts", sets: 3, reps: 8 },
                        { name: "Leg Curls", sets: 3, reps: 12 },
                        { name: "Calf Raises", sets: 3, reps: 15 }
                    ]
                },
                {
                    day: "Saturday - Rest",
                    exercises: []
                },
                {
                    day: "Sunday - Rest",
                    exercises: []
                }
            ],
            recipes: [
                {
                    name: "Steak with Sweet Potatoes",
                    image: "/images/steak-potates.jpg",
                    ingredients: ["200g beef steak", "1 medium sweet potato", "olive oil"],
                    instructions: "Grill the steak and bake the sweet potato.",
                    macros: {
                        calories: 500,
                        protein: 45,
                        fat: 20,
                        carbs: 40,
                    }
                },
                {
                    name: "Oatmeal with Peanut Butter",
                    image: "/images/oat-meal-butter.jfif",
                    ingredients: ["50g oats", "1 tbsp peanut butter", "200ml milk"],
                    instructions: "Cook the oats and mix with peanut butter.",
                    macros: {
                        calories: 350,
                        protein: 15,
                        fat: 12,
                        carbs: 40,
                    }
                }
            ]
        },
    ]
export default programs;