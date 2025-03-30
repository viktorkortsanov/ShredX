import User from '../models/user.js';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
import bcrypt from 'bcrypt';
import { isAdmin } from '../middlewares/authMiddleware.js';

const authService = {
    async register(username, email, password, rePassword) {
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (password !== rePassword) {
            throw new Error('Passwords do not match');
        }

        if (user) {
            throw new Error('User already exists');
        }

        const isAdmin = email === 'shredxadmin@gmail.com' && password === 'admin123456';

        const newUser = await User.create({
            username,
            email,
            password,
            isAdmin,
        });

        const token = await this.generateToken(newUser);
        return {
            token,
            user: { _id: newUser._id, email: newUser.email, username: newUser.username, isAdmin: newUser.isAdmin },
        };
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

        const token = await this.generateToken(user);

        return {
            token,
            user: { _id: user._id, email: user.email, username: user.username, isAdmin: user.isAdmin },
        };
    },

    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
        };

        const token = await jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '14d' });
        return token;
    },
};

export default authService;
