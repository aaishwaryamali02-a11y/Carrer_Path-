const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        employmentType: {
            type: String,
            enum: [
                "Full-time",
                "Part-time",
                "Internship",
                "Contract"
            ],
            required: true
        },

        experienceLevel: {
            type: String,
            required: true
        },

        eligibleDegrees: [
            {
                type: String
            }
        ],

        requiredSkills: [
            {
                type: String
            }
        ],

        preferredSkills: [
            {
                type: String
            }
        ],

        selectionProcess: [
            {
                type: String
            }
        ],

        salary: {
            type: String,
            trim: true
        },

        applicationUrl: {
            type: String,
            required: true,
            trim: true
        },

        source: {
            type: String,
            default: "Official Company Website"
        },

        postedDate: {
            type: Date,
            default: Date.now
        },

        applicationDeadline: {
            type: Date
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;