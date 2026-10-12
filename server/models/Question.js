const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true
        },

        answer: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["Technical", "Coding", "HR"],
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy"
        },

        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
        },
         career: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Career",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;