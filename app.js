import env from './config/env.js';
import express from 'express';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true 
// }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Task Management App');
});

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

app.listen(env.PORT || 3000, () => {    

  console.log(`Server is running on http://localhost:${env.PORT }`);

  connectDB();
});



