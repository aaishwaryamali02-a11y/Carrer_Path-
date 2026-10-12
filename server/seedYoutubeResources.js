const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Resource = require("./models/Resource");
const Skill = require("./models/Skill");

const resources = [
    {
        title: "JavaScript Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=javascript+full+course",
        skill: "JavaScript",
        description: "Complete JavaScript learning video covering fundamentals to advanced concepts."
    },

    {
        title: "HTML Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=html+full+course",
        skill: "HTML",
        description: "Complete HTML tutorial for beginners."
    },

    {
        title: "CSS Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=css+full+course",
        skill: "CSS",
        description: "Learn CSS, layouts, Flexbox, Grid and responsive design."
    },

    {
        title: "React.js Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=react+js+full+course",
        skill: "React.js",
        description: "Learn React components, JSX, hooks, props, state and routing."
    },

    {
        title: "Node.js Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=nodejs+full+course",
        skill: "Node.js",
        description: "Learn Node.js and backend development with JavaScript."
    },

    {
        title: "MongoDB Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=mongodb+full+course",
        skill: "MongoDB",
        description: "Learn MongoDB database concepts, queries and CRUD operations."
    },

    {
        title: "Python Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=python+full+course",
        skill: "Python",
        description: "Complete Python programming tutorial for beginners."
    },

    {
        title: "Machine Learning Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=machine+learning+full+course",
        skill: "Scikit-learn",
        description: "Learn machine learning concepts, algorithms and practical implementation."
    },

    {
        title: "Pandas Data Analysis Tutorial",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=pandas+data+analysis+tutorial",
        skill: "Pandas",
        description: "Learn Pandas for data cleaning, manipulation and analysis."
    },

    {
        title: "SQL Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=sql+full+course",
        skill: "SQL",
        description: "Learn SQL queries, joins, grouping, subqueries and database concepts."
    },

    {
        title: "Android Development Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=android+development+full+course",
        skill: "Android",
        description: "Learn Android application development and core Android concepts."
    },

    {
        title: "Kotlin Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=kotlin+full+course",
        skill: "Kotlin",
        description: "Learn Kotlin programming for Android development."
    },

    {
        title: "Selenium Automation Testing",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=selenium+automation+testing+full+course",
        skill: "Selenium",
        description: "Learn Selenium browser automation and automation testing."
    },

    {
        title: "Postman API Testing",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=postman+api+testing+tutorial",
        skill: "Postman",
        description: "Learn API testing using Postman."
    },

    {
        title: "Cybersecurity Full Course",
        type: "YouTube",
        url: "https://www.youtube.com/results?search_query=cybersecurity+full+course",
        skill: "Cybersecurity",
        description: "Learn cybersecurity fundamentals, networking, threats and security concepts."
    }
];

const seedYoutubeResources = async () => {
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

        console.log("YouTube resources completed.");

        await mongoose.connection.close();

    } catch (error) {
        console.log("Seed Error:", error.message);
        process.exit(1);
    }
};

seedYoutubeResources();