import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [2, 'Username must be at least 2 characters long']
    },

    email: {
        type: String,
        required: true,
        minLength: [10, 'Email must be at least 10 characters long']
    },

    password: {
        type: String,
        required: true,
        minLength: [4, 'Password must be at least 4 characters long']
    },

    isAdmin: {
        type: Boolean,
        require: true,
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
});

const User = model('User', userSchema);

export default User;