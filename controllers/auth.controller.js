import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

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

        const newUsers = await User.create([{ username, email, password: hashedPassword }], { session });


        // ✅ Corrected _id usage
        const token = jwt.sign(
            { userId: newUsers[0]._id }, 
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
                user : newUsers[0]
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
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, User.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Unauthorized" });
        }

        // ✅ Moved token generation outside if block
        const token = jwt.sign({ userId: User._id },process.env.JWT_SECRET, { expiresIn:  process.env.JWT_EXPIRE });
        

        res.status(200).json({ success: true, token, message: "User logged in successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const signOut = async (req, res, next) => {};

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// import User from '../models/user.model.js'
// import { JWT_SECRET, JWT_EXPIRE } from '../config/env.js'

// export const signUp = async (req, res, next) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { name, email, password } = req.body;

//     // Check if a user already exists
//     const existingUser = await User.findOne({ email });

//     if(existingUser) {
//       const error = new Error('User already exists');
//       error.statusCode = 409;
//       throw error;
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

//     const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json({
//       success: true,
//       message: 'User created successfully',
//       data: {
//         token,
//         user: newUsers[0],
//       }
//     })
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     next(error);
//   }
// }

// export const signIn = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if(!user) {
//       const error = new Error('User not found');
//       error.statusCode = 404;
//       throw error;
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if(!isPasswordValid) {
//       const error = new Error('Invalid password');
//       error.statusCode = 401;
//       throw error;
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

//     res.status(200).json({
//       success: true,
//       message: 'User signed in successfully',
//       data: {
//         token,
//         user,
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export const signOut = async (req, res, next) => {}
