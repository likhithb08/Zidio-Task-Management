import mongoose from "mongoose";
import User from "../models/user.model.js";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this task"],
        trim: true,
        maxlength: [20, "Name cannot be more than 20 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description for this task"],
        maxlength: [200, "Description cannot be more than 100 characters"],
    },
    status: {
        type: String,
        enum: ["active", "Completed", "incomplete"],
        default: "active",
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide a start date for this task"],
    },
    dueDate: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide a due date for this task"],
        validate: {
            validator: function (dueDate) {
                return this.startDate <= dueDate;
            },
            message: "Due date must be greater than start date",
        },
    },
    category: {
        type: String,
        enum: ["Work", "Hobby", "Game", "Study", "task", "Other", "Personal"],
        default: "task",
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium",
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
});

// taskSchema.index({ user: 1, name: 1 }, { unique: true });

// ✅ Improved 'save' hook to handle undefined and missing user
taskSchema.pre("save", async function (next) {
    if (!this.isModified("user")) return next();

    try {
        const user = await User.findById(this.user);

        // Handle if the user doesn't exist
        if (!user) {
            throw new Error("User not found. Cannot assign task.");
        }

        // Ensure 'tasks' array is initialized
        if (!user.tasks) {
            user.tasks = [];
        }

        // Avoid duplicate task IDs
        if (!user.tasks.includes(this._id)) {
            user.tasks.push(this._id);
            await user.save();
        }

        next();
    } catch (err) {
        console.error("Error in task pre-save hook:", err);
        next(err);
    }
});

// Populate 'user' details on all find queries
taskSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name email",
    });
    next();
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
