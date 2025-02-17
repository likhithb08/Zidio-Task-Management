
import { Router } from "express";
import autharize from '..//middlewares/auth.middleware.js'
const taskRouter = Router();

taskRouter.get('/', (req, res) => {   
  res.send({message : 'GET , all tasks'});
});

taskRouter.post('/tasks', autharize ,(req, res) => {  
    res.send({message : 'POST , create a new task'});
} );

taskRouter.get('/tasks/:id', (req, res) => {    
  res.send({message : 'GET , a task'});
});

taskRouter.put('/tasks/:id', (req, res) => {    
  res.send({message : 'PUT , update a task'});
});

taskRouter.delete('/tasks/:id', (req, res) => {    
  res.send({message : 'Delete a task'});
});

taskRouter.get('/user/:id', (req, res) => { 
  res.send({message : 'All task of a user '});
});


export default taskRouter;