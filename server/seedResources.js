const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Resource = require("./models/Resource");
const Skill = require("./models/Skill");

const resources = [
    {
        title: "JavaScript MDN Documentation",
        type: "Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        skill: "JavaScript",
        description:
            "Official JavaScript documentation for syntax, concepts, APIs and web development."
    },

    {
        title: "HTML MDN Documentation",
        type: "Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        skill: "HTML",
        description:
            "Official HTML documentation for learning web page structure and HTML elements."
    },

    {
        title: "CSS MDN Documentation",
        type: "Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        skill: "CSS",
        description:
            "Official CSS documentation for styling, layouts, responsive design and animations."
    },

    {
        title: "React Documentation",
        type: "Documentation",
        url: "https://react.dev/",
        skill: "React.js",
        description:
            "Official React documentation for components, hooks, JSX and modern React development."
    },

    {
        title: "Node.js Documentation",
        type: "Documentation",
        url: "https://nodejs.org/docs/latest/api/",
        skill: "Node.js",
        description:
            "Official Node.js API documentation for backend JavaScript development."
    },

    {
        title: "MongoDB Documentation",
        type: "Documentation",
        url: "https://www.mongodb.com/docs/",
        skill: "MongoDB",
        description:
            "Official MongoDB documentation for databases, queries, collections and Atlas."
    },

    {
        title: "Python Documentation",
        type: "Documentation",
        url: "https://docs.python.org/3/",
        skill: "Python",
        description:
            "Official Python documentation covering syntax, libraries and programming concepts."
    },

    {
        title: "Scikit-learn Documentation",
        type: "Documentation",
        url: "https://scikit-learn.org/stable/",
        skill: "Scikit-learn",
        description:
            "Official scikit-learn documentation for machine learning algorithms and tools."
    },

    {
        title: "Pandas Documentation",
        type: "Documentation",
        url: "https://pandas.pydata.org/docs/",
        skill: "Pandas",
        description:
            "Official Pandas documentation for data manipulation and analysis."
    },

    {
        title: "SQL Documentation",
        type: "Documentation",
        url: "https://dev.mysql.com/doc/",
        skill: "SQL",
        description:
            "MySQL documentation covering SQL queries, databases and relational data."
    },

    {
        title: "Android Developers Documentation",
        type: "Documentation",
        url: "https://developer.android.com/docs",
        skill: "Android",
        description:
            "Official Android documentation for application development and Android APIs."
    },

    {
        title: "Kotlin Documentation",
        type: "Documentation",
        url: "https://kotlinlang.org/docs/home.html",
        skill: "Kotlin",
        description:
            "Official Kotlin documentation for Kotlin programming and Android development."
    },

    {
        title: "Selenium Documentation",
        type: "Documentation",
        url: "https://www.selenium.dev/documentation/",
        skill: "Selenium",
        description:
            "Official Selenium documentation for browser automation and automated testing."
    },

    {
        title: "Postman Documentation",
        type: "Documentation",
        url: "https://learning.postman.com/docs/",
        skill: "Postman",
        description:
            "Official Postman documentation for API testing and development."
    },

    {
        title: "OWASP Documentation",
        type: "Documentation",
        url: "https://owasp.org/",
        skill: "Cybersecurity",
        description:
            "OWASP provides security resources and documentation for web application security."
    }
];

const seedResources = async () => {
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

        console.log("Documentation resources completed.");

        await mongoose.connection.close();

    } catch (error) {
        console.log("Seed Error:", error.message);
        process.exit(1);
    }
};

seedResources();