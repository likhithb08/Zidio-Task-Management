import { Router } from "express";
import { getUser , getUsers } from "../controllers/user.controller.js";
import authorize from '../middlewares/auth.middleware.js'

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize , getUser);

// userRouter.post('/users', (req, res) => {  
//     res.send({message : 'POST , create a new user'});
// } );

userRouter.put('/profile/:id', (req, res) => {   
  res.send({message : 'PUT your profile'});
});

userRouter.delete('/profile/:id', (req, res) => {   
  res.send({message : 'Delete your profile'});
});

export default userRouter;