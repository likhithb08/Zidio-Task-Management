import Task from '../models/task.model.js';
import User from '../models/user.model.js';

// ✅ Create Task
export const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

// ✅ Get User's Tasks
export const getUserTasks = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const authenticatedUserId = req.user._id.toString();
        const requestedUserId = req.params.id;

        // Authorization Check
        if (authenticatedUserId !== requestedUserId) {
            return res.status(403).json({ success: false, message: "You are not authorized to access these tasks!" });
        }

        // Fetch Tasks
        const tasks = await Task.find({ user: requestedUserId });

        if (!tasks.length) {
            return res.status(404).json({ success: false, message: "No tasks found for this user" });
        }

        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        next(error);
    }
};

// ✅ Update Task
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params; // Task ID from URL
        const { name, description, status } = req.body; // Fields to update

        // Find the task by ID
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Authorization Check
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to update this task' });
        }

        // Update task fields if provided
        if (name) task.name = name;
        if (description) task.description = description;
        if (status) task.status = status;

        // Save the updated task
        const updatedTask = await task.save();

        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        console.error('Update Task Error:', error.message);
        next(error);
    }
};export const deleteTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { id } = req.params; // Task ID from URL

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Find the task by ID and only fetch the 'user' field
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Debugging logs
        console.log("Task User ID (from DB):", task.user.toString());
        console.log("Authenticated User ID (from token):", req.user._id.toString());

        // Ensure only the task owner can delete it
        if (!task.user.equals(userId)) 
            {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this task' });
        }

        // Delete the task and remove it from the user's task list
        await Task.findByIdAndDelete(id)

        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete Task Error:', error.message);
        next(error);
    }
};
