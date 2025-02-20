
import { Router } from "express";
import autharize from '..//middlewares/auth.middleware.js'
import { createTask , getUserTasks} from "../controllers/tasks.controller.js";
import { checkBlacklist } from '../middlewares/checkBlacklist.js';
import { updateTask, deleteTask } from '../controllers/tasks.controller.js';
const taskRouter = Router();

taskRouter.get('/', (req, res) => {   
  res.send({message : 'GET , all tasks'});
});

taskRouter.post('/tasks', autharize ,createTask );

taskRouter.put('/tasks/:id', autharize, checkBlacklist, updateTask);

taskRouter.get('/tasks/:id', autharize, checkBlacklist, getUserTasks);

taskRouter.delete('/tasks/:id', autharize,deleteTask);

taskRouter.get('/user/:id', autharize ,getUserTasks);


export default taskRouter;