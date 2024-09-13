import jwt from 'jsonwebtoken';
import { errorHandle } from './error.js';
import dotenv from 'dotenv';
dotenv.config()

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandle(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandle(403, 'Token is not valid!'));

        req.user = user;
        next();
    });


}