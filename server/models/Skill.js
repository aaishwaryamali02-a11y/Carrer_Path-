const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true
        },

        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner"
        },

        tools: [
            {
                type: String
            }
        ],

        importance: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;