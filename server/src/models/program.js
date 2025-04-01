import mongoose from 'mongoose';

const programsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            min: [0, 'Price cannot be negative'],
            get: (v) => v.toFixed(2),
            set: (v) => parseFloat(v.toString().replace(',', '.')),
        },
        difficulty: {
            type: String,
            trim: true,
            enum: ['beginner', 'intermediate', 'advanced', 'allLevels'],
            default: 'beginner',
        },
        days: [
            {
                day: {
                    type: String,
                    trim: true,
                },
                isRestDay: {
                    type: Boolean,
                },
                exercises: [
                    {
                        name: {
                            type: String,
                            trim: true,
                        },
                        sets: {
                            type: Number,
                            min: [1, 'Sets must be greater than 0'],
                        },
                        reps: {
                            type: Number,
                            min: [1, 'Reps must be greater than 0'],
                        },
                    },
                ],
            },
        ],
        recipes: [
            {
                name: {
                    type: String,
                    trim: true,
                },
                image: {
                    type: String,
                    trim: true,
                },
                ingredients: [
                    {
                        type: String,
                        trim: true,
                    },
                ],
                instructions: {
                    type: String,
                    trim: true,
                },
                macros: {
                    calories: {
                        type: Number,
                        default: 0,
                        min: [0, 'Calories cannot be negative'],
                    },
                    protein: {
                        type: Number,
                        default: 0,
                        min: [0, 'Protein cannot be negative'],
                    },
                    carbs: {
                        type: Number,
                        default: 0,
                        min: [0, 'Carbs cannot be negative'],
                    },
                    fat: {
                        type: Number,
                        default: 0,
                        min: [0, 'Fat cannot be negative'],
                    },
                },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
            transform: function (doc, ret) {
                function removeIds(obj) {
                    if (Array.isArray(obj)) {
                        obj.forEach(removeIds);
                    } else if (obj && typeof obj === 'object') {
                        delete obj._id;
                        delete obj.id;
                        Object.values(obj).forEach(removeIds);
                    }
                }

                removeIds(ret.days);
                removeIds(ret.recipes);
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

const Program = mongoose.model('Program', programsSchema);

export default Program;
