const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
    {
        career: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Career",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        steps: [
            {
                stepNumber: {
                    type: Number,
                    required: true
                },

                title: {
                    type: String,
                    required: true
                },

                topics: [
                    {
                        type: String
                    }
                ]
            }
        ]
    },
    {
        timestamps: true
    }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;