const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
         
        selectedCareer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Career",
    default: null
},

progress: {
    skills: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    interview: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    resources: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    projects: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
},

completedQuestions: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;