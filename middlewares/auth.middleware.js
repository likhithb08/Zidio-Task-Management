import jwt from 'jsonwebtoken'
import  {JWT_SECRET}  from '../config/env.js'
import User from '../models/user.model.js'
const authorize = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Correct: 'split'

        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, no token provided' });
        }

        console.log("Received Token:", token); // Debugging Step
        console.log("New User:", newUser);


        const decoded = jwt.verify(token, JWT_SECRET); // Ensure JWT_SECRET is correct

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized, user not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

export default authorize;