import { AUTH_COOKIE_NAME, JWT_SECRET } from "../constants.js"
import jsonwebtoken from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jsonwebtoken.verify(token, JWT_SECRET);
        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;
        next();
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
    }
}

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    next();
}

export const isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('404');
    };

    next();
}