// import Task from '../models/task.model.js'

// export const createTask = async (req, res, next) =>{
//     try {
//         const task = await Task.create({
//             ...req.body,
//             user : req.user._id,
//         })

//         res.status(201).json({success : true , data : task})
//     } catch (error) {
//         next(error)
//     }
// }

