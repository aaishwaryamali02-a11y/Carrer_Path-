const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        career: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Career",
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner"
        },

        technologies: [
            {
                type: String
            }
        ],

        features: [
            {
                type: String
            }
        ],

        githubUrl: {
            type: String,
            trim: true
        },

        liveUrl: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;