const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: [
                "Documentation",
                "YouTube",
                "Notes"
            ],
            trim: true
        },

        url: {
            type: String,
            required: true,
            trim: true
        },

        skill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
            required: true
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

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;