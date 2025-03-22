const programs = [
    {
        id: 1,
        name: "Push, Pull, Legs",
        image: "/images/ppl.webp",
        price: "29,99",
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
                ingredients: ["1 banana", "1 scoop whey protein", "200 ml almond milk"],
                instructions: "Blend all ingredients together for a delicious smoothie."
            },
            {
                name: "Grilled Chicken Salad",
                ingredients: ["200g chicken breast", "mixed greens", "olive oil"],
                instructions: "Grill the chicken, chop veggies, and mix together with olive oil."
            }
        ]
    },
    {
        id: 2,
        name: "Upper Lower",
        image: "/images/ul.webp",
        price: "19,99",
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
                ingredients: ["1 cup oats", "100g mixed berries", "honey"],
                instructions: "Cook the oats and top with fresh berries and a drizzle of honey."
            },
            {
                name: "Grilled Salmon with Veggies",
                ingredients: ["200g salmon", "mixed veggies", "olive oil"],
                instructions: "Grill salmon and veggies with olive oil, salt, and pepper."
            }
        ]
    },
    {
        id: 3,
        name: "Full Body",
        image: "/images/fb.webp",
        price: "39,99",
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
        ]
}]

export default programs;