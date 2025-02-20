import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import BlacklistedToken from '../models/BlacklistedToken.model.js';

dotenv.config(); // ✅ Load .env variables

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { username, email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            session.endSession();
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{ username, email, password: hashedPassword }], { session });


        // ✅ Corrected _id usage
        const token = jwt.sign(
            { userId: newUser[0]._id }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: process.env.JWT_EXPIRE || '1H' }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            token,
            message: "User created successfully",
            data : {
                token,
                user : newUser[0]
            }
        });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const existingUser = await User.findOne({ email });

        // If user doesn't exist, return error
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Unauthorized" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: existingUser._id }, // Use existingUser._id
            process.env.JWT_SECRET || 'secret', // Fallback to 'secret' if JWT_SECRET is not defined
            { expiresIn: process.env.JWT_EXPIRE || '1H' } // Fallback to '1H' if JWT_EXPIRE is not defined
        );

        // Return success response with token
        res.status(200).json({ 
            success: true, 
            token, 
            message: "User logged in successfully",
            data: {
                token,
                user: existingUser // Include user details in the response
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract the token

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        // Add the token to the blacklist
        await BlacklistedToken.create({ token });

        res.status(200).json({ success: true, message: 'User signed out successfully' });
    } catch (error) {
        console.error('Sign Out Error:', error.message);
        next(error);
    }
};

