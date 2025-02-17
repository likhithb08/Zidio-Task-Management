import env from './config/env.js';
import express from 'express';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/tasks.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.use(errorMiddleware);
// console.log("Registered routes:");
// app._router.stack.forEach((middleware) => {
//     if (middleware.route) { // Check if middleware is a route
//         console.log(middleware.route);
//     } else if (middleware.name === 'router') { // Handle nested routers
//         middleware.handle.stack.forEach((nested) => {
//             if (nested.route) {
//                 console.log(nested.route);
//             }
//         });
//     }
// });

app.get('/', (req, res) => {
  res.send('Welcome to the Task Management App');
});

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

app.listen(env.PORT || 3000, () => {    

  console.log(`Task Management Server is running on http://localhost:${env.PORT }`);

  connectDB();
});



