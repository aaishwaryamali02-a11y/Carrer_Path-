require("dotenv").config();

const mongoose = require("mongoose");

const Skill = require("./models/Skill");
const Question = require("./models/Question");
const Career = require("./models/Career");

const skillsData = [
    {
        name: "HTML",
        category: "Frontend",
        level: "Beginner",
        tools: ["VS Code", "Chrome DevTools"],
        importance: "High",
        description: "HTML is used to create the structure of web pages."
    },
    {
        name: "CSS",
        category: "Frontend",
        level: "Intermediate",
        tools: ["VS Code", "Chrome DevTools"],
        importance: "High",
        description: "CSS is used to style and design web pages."
    },
    {
        name: "JavaScript",
        category: "Programming",
        level: "Intermediate",
        tools: ["VS Code", "Chrome DevTools"],
        importance: "High",
        description: "JavaScript adds logic and interactivity to web applications."
    },
    {
        name: "React.js",
        category: "Frontend",
        level: "Intermediate",
        tools: ["VS Code", "React Developer Tools"],
        importance: "High",
        description: "React.js is a JavaScript library for building user interfaces."
    },
    {
        name: "REST API",
        category: "Backend Integration",
        level: "Intermediate",
        tools: ["Postman", "Hoppscotch"],
        importance: "High",
        description: "REST APIs allow frontend applications to communicate with backend services."
    },
    {
        name: "Git",
        category: "Version Control",
        level: "Beginner",
        tools: ["Git", "GitHub"],
        importance: "High",
        description: "Git is used for tracking code changes and collaboration."
    }
];

const questionsData = [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language. It is used to create the structure of web pages using elements such as headings, paragraphs, links and images.",
        type: "Technical",
        difficulty: "Easy",
        skill: "HTML"
    },
    {
        question: "What is the difference between div and semantic HTML elements?",
        answer: "A div is a generic container, while semantic elements such as header, nav, section, article and footer describe the meaning and structure of the content.",
        type: "Technical",
        difficulty: "Easy",
        skill: "HTML"
    },
    {
        question: "What is CSS?",
        answer: "CSS stands for Cascading Style Sheets. It is used to style HTML elements and control layout, colors, spacing, fonts and responsiveness.",
        type: "Technical",
        difficulty: "Easy",
        skill: "CSS"
    },
    {
        question: "What is responsive web design?",
        answer: "Responsive web design means creating websites that adjust their layout and appearance according to different screen sizes such as mobile, tablet and desktop.",
        type: "Technical",
        difficulty: "Easy",
        skill: "CSS"
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language used to add logic, interactivity and dynamic behavior to web applications.",
        type: "Technical",
        difficulty: "Easy",
        skill: "JavaScript"
    },
    {
        question: "What is the difference between let, const and var?",
        answer: "var is function-scoped, while let and const are block-scoped. let allows reassignment, but const does not allow reassignment.",
        type: "Technical",
        difficulty: "Medium",
        skill: "JavaScript"
    },
    {
        question: "What is the DOM?",
        answer: "DOM stands for Document Object Model. It represents an HTML document as a tree of objects that JavaScript can access and modify.",
        type: "Technical",
        difficulty: "Easy",
        skill: "JavaScript"
    },
    {
        question: "What is React.js?",
        answer: "React.js is a JavaScript library developed by Meta for building reusable and interactive user interfaces using components.",
        type: "Technical",
        difficulty: "Easy",
        skill: "React.js"
    },
    {
        question: "What is a component in React?",
        answer: "A component is a reusable building block of a React application. It can contain UI structure and logic.",
        type: "Technical",
        difficulty: "Easy",
        skill: "React.js"
    },
    {
        question: "What are props in React?",
        answer: "Props are inputs passed from a parent component to a child component. They are used to pass data between components.",
        type: "Technical",
        difficulty: "Easy",
        skill: "React.js"
    },
    {
        question: "What is state in React?",
        answer: "State is data managed inside a React component. When state changes, React can re-render the component.",
        type: "Technical",
        difficulty: "Easy",
        skill: "React.js"
    },
    {
        question: "What is useEffect in React?",
        answer: "useEffect is a React Hook used to perform side effects such as API calls, subscriptions and updating external systems.",
        type: "Technical",
        difficulty: "Hard",
        skill: "React.js"
    },
    {
        question: "What is a REST API?",
        answer: "A REST API is an interface that allows applications to communicate using HTTP methods such as GET, POST, PUT and DELETE.",
        type: "Technical",
        difficulty: "Easy",
        skill: "REST API"
    },
    {
        question: "What is the purpose of Git?",
        answer: "Git is a version control system used to track changes in source code and help developers collaborate on projects.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Git"
    },
    {
        question: "Write JavaScript code to reverse a string.",
        answer: "Example:\\nlet str = 'hello';\\nlet reverse = str.split('').reverse().join('');\\nconsole.log(reverse);",
        type: "Coding",
        difficulty: "Easy",
        skill: "JavaScript"
    },
    {
        question: "Write JavaScript code to find the largest number in an array.",
        answer: "Example:\\nlet arr = [10, 25, 5, 40];\\nlet largest = Math.max(...arr);\\nconsole.log(largest);",
        type: "Coding",
        difficulty: "Easy",
        skill: "JavaScript"
    },
    {
        question: "Write JavaScript code to check whether a number is even or odd.",
        answer: "Example:\\nlet num = 10;\\nif (num % 2 === 0) {\\n    console.log('Even');\\n} else {\\n    console.log('Odd');\\n}",
        type: "Coding",
        difficulty: "Easy",
        skill: "JavaScript"
    },
    {
        question: "Create a simple React component.",
        answer: "Example:\\nfunction Welcome() {\\n    return <h1>Hello World</h1>;\\n}\\n\\nexport default Welcome;",
        type: "Coding",
        difficulty: "Easy",
        skill: "React.js"
    },
    {
        question: "How do you call an API from React?",
        answer: "An API can be called from React using fetch or axios, commonly inside useEffect when data needs to be loaded when a component renders.",
        type: "Coding",
        difficulty: "Hard",
        skill: "REST API"
    },
    {
        question: "Tell me about yourself.",
        answer: "I am a BCA graduate interested in Frontend Development. I have learned HTML, CSS, JavaScript and React.js and I enjoy building responsive and interactive web applications.",
        type: "HR",
        difficulty: "Easy",
        skill: "React.js"
    },
    {
        question: "Why do you want to become a Frontend Developer?",
        answer: "I enjoy creating user interfaces and solving problems using HTML, CSS and JavaScript. Frontend development allows me to combine programming with user experience.",
        type: "HR",
        difficulty: "Easy",
        skill: "JavaScript"
    },
    {
        question: "How do you handle a technical problem in a project?",
        answer: "I first understand the error, check the browser console and logs, reproduce the issue and then try possible solutions. I also refer to official documentation when required.",
        type: "HR",
        difficulty: "Easy",
        skill: "JavaScript"
    }
];

async function seedFrontendData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const frontendCareer = await Career.findOne({
            name: "Frontend Developer"
        });

        if (!frontendCareer) {
            throw new Error("Frontend Developer career not found");
        }

        console.log("Career found:", frontendCareer.name);

        for (const skillData of skillsData) {
            await Skill.findOneAndUpdate(
                { name: skillData.name },
                skillData,
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }
            );
        }

        const skills = await Skill.find();

        const skillMap = {};

        skills.forEach((skill) => {
            skillMap[skill.name.toLowerCase()] = skill._id;
        });

        const finalQuestions = [];

        for (const item of questionsData) {
            const skillId = skillMap[item.skill.toLowerCase()];

            if (!skillId) {
                console.log(`Skill not found: ${item.skill}`);
                continue;
            }

            finalQuestions.push({
                question: item.question,
                answer: item.answer,
                type: item.type,
                difficulty: item.difficulty,
                skill: skillId,
                career: frontendCareer._id
            });
        }

        await Question.insertMany(finalQuestions);

        console.log(
            `${finalQuestions.length} Frontend questions inserted successfully`
        );

        await mongoose.connection.close();

    } catch (error) {
        console.log("Frontend Seed Error:", error.message);
    }
}

seedFrontendData();