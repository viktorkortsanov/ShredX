import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';

const authController = Router();

authController.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        const token = await authService.register(username, email, password, rePassword);
        res.cookie(AUTH_COOKIE_NAME, token);
        res.status(200).json(token.user);
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await authService.login(email, password);

        // Увери се, че токенът се записва правилно в cookie с правилното име
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true }); // Внимавай за опцията httpOnly

        // Връщай user данни, за да ги получи клиента
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});


authController.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(200).json({ message: 'Logged out successfully' });
});

export default authController;