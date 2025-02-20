import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
    try {
        let token;

        // Check if the token is provided in the Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Extract the token
        }

        // If no token is provided, return an error
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized, no token provided' });
        }

        console.log("Received Token:", token); // Debugging: Log the received token

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET); // Ensure JWT_SECRET is correct
        console.log("Decoded Token:", decoded); // Debugging: Log the decoded token

        // Find the user by the decoded userId
        const user = await User.findById(decoded.userId);
        console.log("User:", user); // Debugging: Log the fetched user

        // If the user is not found, return an error
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized, user not found' });
        }

        // Attach the user to the request object
        req.user = user;
        console.log("Authenticated User:", req.user); // Debugging: Log the authenticated user

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Debugging: Log the error
        return res.status(401).json({ success: false, message: "Unauthorized", error: error.message });
    }
};

export default authorize;