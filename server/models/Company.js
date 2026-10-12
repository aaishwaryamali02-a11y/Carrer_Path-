const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        hiringMonths: [
            {
                type: String
            }
        ],

        eligibleDegrees: [
            {
                type: String
            }
        ],

        experienceLevel: {
            type: String,
            required: true
        },

        roles: [
            {
                type: String
            }
        ],

        selectionProcess: [
            {
                type: String
            }
        ],

        requiredSkills: [
            {
                type: String
            }
        ],

        officialCareerUrl: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;