// middlewares/checkBlacklist.js
import BlacklistedToken from '../models/BlacklistedToken.model.js';

export const checkBlacklist = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract the token

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        // Check if the token is blacklisted
        const isBlacklisted = await BlacklistedToken.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({ success: false, message: 'Token is invalidated. Please log in again.' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Blacklist Check Error:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};