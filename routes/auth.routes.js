import { Router } from "express";
import jwt from "jsonwebtoken"; // ✅ Correct import
const { sign } = jwt; 
import { signUp , signIn , signOut } from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in',signIn);
authRouter.post('/sign-out', authorize ,signOut);

export default authRouter;