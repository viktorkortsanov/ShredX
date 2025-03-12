import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from "../constants.js";

const authService = {
    async register(username, email, password, rePassword) {
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (password !== rePassword) {
            throw new Error('Passwords do not match');
        }

        if (user) {
            throw new Error('User already exists');
        }

        const newUser = await User.create({
            username,
            email,
            password
        });

        return this.generateToken(newUser);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        return this.generateToken(user);
    },

    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        };

        const token = await jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        return token;
    }
};

export default authService;