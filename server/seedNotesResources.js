const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Resource = require("./models/Resource");
const Skill = require("./models/Skill");

const resources = [
    {
        title: "JavaScript Interview Notes",
        type: "Notes",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        skill: "JavaScript",
        description: "Quick JavaScript notes for interview preparation and revision."
    },

    {
        title: "HTML Interview Notes",
        type: "Notes",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        skill: "HTML",
        description: "Important HTML concepts, tags and interview revision notes."
    },

    {
        title: "CSS Interview Notes",
        type: "Notes",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        skill: "CSS",
        description: "CSS concepts including Flexbox, Grid, positioning and responsive design."
    },

    {
        title: "React.js Interview Notes",
        type: "Notes",
        url: "https://react.dev/learn",
        skill: "React.js",
        description: "React components, props, state, hooks and important interview concepts."
    },

    {
        title: "Node.js Interview Notes",
        type: "Notes",
        url: "https://nodejs.org/docs/latest/api/",
        skill: "Node.js",
        description: "Node.js fundamentals, modules, APIs and backend concepts."
    },

    {
        title: "MongoDB Interview Notes",
        type: "Notes",
        url: "https://www.mongodb.com/docs/",
        skill: "MongoDB",
        description: "MongoDB CRUD, collections, documents, queries and database concepts."
    },

    {
        title: "Python Interview Notes",
        type: "Notes",
        url: "https://docs.python.org/3/tutorial/",
        skill: "Python",
        description: "Python syntax, data types, functions, OOP and interview revision."
    },

    {
        title: "Machine Learning Interview Notes",
        type: "Notes",
        url: "https://scikit-learn.org/stable/user_guide.html",
        skill: "Scikit-learn",
        description: "Machine learning algorithms, model training and evaluation notes."
    },

    {
        title: "Pandas Interview Notes",
        type: "Notes",
        url: "https://pandas.pydata.org/docs/",
        skill: "Pandas",
        description: "Pandas DataFrame, Series, data cleaning and data analysis notes."
    },

    {
        title: "SQL Interview Notes",
        type: "Notes",
        url: "https://www.w3schools.com/sql/",
        skill: "SQL",
        description: "SQL queries, joins, grouping, subqueries and important interview concepts."
    },

    {
        title: "Selenium Interview Notes",
        type: "Notes",
        url: "https://www.selenium.dev/documentation/",
        skill: "Selenium",
        description: "Selenium automation concepts, locators, WebDriver and testing notes."
    },

    {
        title: "Postman API Testing Notes",
        type: "Notes",
        url: "https://learning.postman.com/docs/",
        skill: "Postman",
        description: "API testing, requests, responses, collections and Postman concepts."
    }
];

const seedNotesResources = async () => {
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

        console.log("Notes resources completed.");

        await mongoose.connection.close();

    } catch (error) {
        console.log(
            "Seed Error:",
            error.message
        );

        process.exit(1);
    }
};

seedNotesResources();