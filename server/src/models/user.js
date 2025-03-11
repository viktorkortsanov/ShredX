import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 2
    },

    email: {
        type: String,
        required: true,
        minLength: 10
    },

    password: {
        type: String,
        required: true,
        minLength: 4
    },
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
});

const User = model('User', userSchema);

export default User;