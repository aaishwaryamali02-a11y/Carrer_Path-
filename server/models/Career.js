const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner"
        },

        skills: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

const Career = mongoose.model("Career", careerSchema);

module.exports = Career;