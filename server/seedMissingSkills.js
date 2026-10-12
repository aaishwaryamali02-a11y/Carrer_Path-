const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Skill = require("./models/Skill");

const skills = [
    {
        name: "Android",
        category: "Mobile Development",
        level: "Intermediate",
        tools: ["Android Studio", "Firebase"],
        importance: "High",
        description: "Android application development using Java and Kotlin."
    },

    {
        name: "Kotlin",
        category: "Programming",
        level: "Intermediate",
        tools: ["Android Studio"],
        importance: "High",
        description: "Modern programming language widely used for Android development."
    },

    {
        name: "Cybersecurity",
        category: "Security",
        level: "Intermediate",
        tools: ["Wireshark", "Linux", "SIEM"],
        importance: "High",
        description: "Protect systems, networks and applications from security threats."
    },

    {
        name: "Cloud Computing",
        category: "Cloud",
        level: "Intermediate",
        tools: ["AWS", "Azure", "Google Cloud"],
        importance: "High",
        description: "Cloud computing concepts, services, deployment and infrastructure."
    }
];

const seedMissingSkills = async () => {
    try {
        await connectDB();

        for (const skillData of skills) {

            const existingSkill = await Skill.findOne({
                name: skillData.name
            });

            if (existingSkill) {
                console.log(
                    `Already exists: ${skillData.name}`
                );
                continue;
            }

            await Skill.create(skillData);

            console.log(
                `Added: ${skillData.name}`
            );
        }

        console.log("Missing skills completed.");

        await mongoose.connection.close();

    } catch (error) {
        console.log(
            "Seed Error:",
            error.message
        );

        process.exit(1);
    }
};

seedMissingSkills();