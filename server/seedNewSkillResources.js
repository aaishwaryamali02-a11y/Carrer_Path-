const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Resource = require("./models/Resource");
const Skill = require("./models/Skill");

const resources = [

    // Android
    {
        title: "Android Documentation",
        type: "Documentation",
        url: "https://developer.android.com/docs",
        skill: "Android",
        description: "Official Android development documentation."
    },
    {
        title: "Android Development Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=android+development+full+course",
        skill: "Android",
        description: "Learn Android application development from basics."
    },
    {
        title: "Android Interview Notes",
        type: "Notes",
        url: "https://developer.android.com/guide",
        skill: "Android",
        description: "Important Android concepts for interview preparation."
    },

    // Kotlin
    {
        title: "Kotlin Documentation",
        type: "Documentation",
        url: "https://kotlinlang.org/docs/home.html",
        skill: "Kotlin",
        description: "Official Kotlin programming documentation."
    },
    {
        title: "Kotlin Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=kotlin+full+course",
        skill: "Kotlin",
        description: "Learn Kotlin programming from beginner to advanced concepts."
    },
    {
        title: "Kotlin Interview Notes",
        type: "Notes",
        url: "https://kotlinlang.org/docs/basic-syntax.html",
        skill: "Kotlin",
        description: "Important Kotlin concepts for interview preparation."
    },

    // Cybersecurity
    {
        title: "Cybersecurity Documentation",
        type: "Documentation",
        url: "https://owasp.org/www-project-top-ten/",
        skill: "Cybersecurity",
        description: "Security concepts and common web application vulnerabilities."
    },
    {
        title: "Cybersecurity Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=cybersecurity+full+course",
        skill: "Cybersecurity",
        description: "Learn cybersecurity fundamentals, networking and security concepts."
    },
    {
        title: "Cybersecurity Interview Notes",
        type: "Notes",
        url: "https://owasp.org/www-project-top-ten/",
        skill: "Cybersecurity",
        description: "Important cybersecurity concepts for interview preparation."
    },

    // Cloud Computing
    {
        title: "AWS Cloud Documentation",
        type: "Documentation",
        url: "https://docs.aws.amazon.com/",
        skill: "Cloud Computing",
        description: "Official AWS documentation for cloud computing."
    },
    {
        title: "Cloud Computing Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=cloud+computing+full+course",
        skill: "Cloud Computing",
        description: "Learn cloud computing, AWS, deployment and cloud services."
    },
    {
        title: "Cloud Computing Interview Notes",
        type: "Notes",
        url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html",
        skill: "Cloud Computing",
        description: "Important cloud computing concepts for interview preparation."
    }
];

const seedNewSkillResources = async () => {
    try {
        await connectDB();

        for (const resource of resources) {

            const skill = await Skill.findOne({
                name: resource.skill
            });

            if (!skill) {
                console.log(
                    `Skill not found: ${resource.skill}`
                );
                continue;
            }

            const existingResource =
                await Resource.findOne({
                    title: resource.title
                });

            if (existingResource) {
                console.log(
                    `Already exists: ${resource.title}`
                );
                continue;
            }

            await Resource.create({
                title: resource.title,
                type: resource.type,
                url: resource.url,
                skill: skill._id,
                description: resource.description
            });

            console.log(
                `Added: ${resource.title}`
            );
        }

        console.log("New skill resources completed.");

        await mongoose.connection.close();

    } catch (error) {
        console.log(
            "Seed Error:",
            error.message
        );

        process.exit(1);
    }
};

seedNewSkillResources();