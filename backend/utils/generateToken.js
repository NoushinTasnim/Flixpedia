import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign(
        {
            userId
        },
        ENV_VARS.JWT_SECRET,
        {
            expiresIn: '150d'
        }
    );
    
    res.cookie(
        'jwt-flixpedia', 
        token, 
        {
            maxAge: 150*24* 3600,
            httpOnly: true,
            sameSite: 'strict',
            secure: ENV_VARS.NODE_ENV !== 'development'
        }
    );

    return token;
}