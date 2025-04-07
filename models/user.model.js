import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        trim: true,
        maxlength: [20, "Username cannot be more than 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ],
        maxlength: [50, "Email cannot be more than 50 characters"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
        minlength: [6, "Password cannot be less than 6 characters"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
        minlength: [6, "Password cannot be less than 6 characters"],
    },

    role: {
        type: String,
        enum: ["manager", "admin","player"],
        default: "player",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {Timestamps: true} );

const User = mongoose.model("User", userSchema);

export default User;

