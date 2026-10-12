const mongoose = require("mongoose");
require("dotenv").config();

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
    description: "HTML is used to structure web pages and web application content."
  },
  {
    name: "CSS",
    category: "Frontend",
    level: "Intermediate",
    tools: ["VS Code", "Chrome DevTools"],
    importance: "High",
    description: "CSS is used to style responsive and user-friendly web interfaces."
  },
  {
    name: "React.js",
    category: "Frontend",
    level: "Intermediate",
    tools: ["VS Code", "React DevTools"],
    importance: "High",
    description: "React.js is a JavaScript library used to build component-based user interfaces."
  },
  {
    name: "Node.js",
    category: "Backend",
    level: "Intermediate",
    tools: ["VS Code", "Postman"],
    importance: "High",
    description: "Node.js allows JavaScript to run on the server side."
  },
  {
    name: "Express.js",
    category: "Backend",
    level: "Intermediate",
    tools: ["VS Code", "Postman"],
    importance: "High",
    description: "Express.js is a Node.js framework used to build web servers and REST APIs."
  },
  {
    name: "MongoDB",
    category: "Database",
    level: "Intermediate",
    tools: ["MongoDB Atlas", "MongoDB Compass"],
    importance: "High",
    description: "MongoDB is a NoSQL database used to store application data in documents."
  },
  {
    name: "REST API",
    category: "Backend",
    level: "Intermediate",
    tools: ["Postman", "Hoppscotch"],
    importance: "High",
    description: "REST APIs allow frontend and backend applications to communicate using HTTP methods."
  },
  {
    name: "HTTP/HTTPS",
    category: "Web",
    level: "Intermediate",
    tools: ["Chrome DevTools"],
    importance: "High",
    description: "HTTP and HTTPS are protocols used for communication between clients and servers."
  },
  {
    name: "Git",
    category: "Version Control",
    level: "Beginner",
    tools: ["Git Bash", "VS Code"],
    importance: "High",
    description: "Git is used to track code changes and manage different versions of a project."
  },
  {
    name: "GitHub",
    category: "Version Control",
    level: "Beginner",
    tools: ["GitHub", "Git"],
    importance: "High",
    description: "GitHub is used to host repositories and collaborate on software projects."
  },
  {
    name: "Authentication",
    category: "Security",
    level: "Intermediate",
    tools: ["JWT", "bcryptjs"],
    importance: "High",
    description: "Authentication verifies users and controls secure access to applications."
  }
];

const questionsData = [

  // HTML

  {
    question: "What is HTML?",
    answer: "HTML stands for HyperText Markup Language. It is used to structure content on web pages.",
    type: "Technical",
    difficulty: "Easy",
    skill: "HTML"
  },
  {
    question: "What are semantic elements in HTML?",
    answer: "Semantic elements clearly describe their meaning, such as header, nav, main, section, article and footer.",
    type: "Technical",
    difficulty: "Easy",
    skill: "HTML"
  },
  {
    question: "What is the difference between div and span?",
    answer: "div is generally a block-level container, while span is an inline container.",
    type: "Technical",
    difficulty: "Easy",
    skill: "HTML"
  },
  {
    question: "What is the purpose of HTML forms?",
    answer: "HTML forms are used to collect information from users such as name, email and password.",
    type: "Technical",
    difficulty: "Easy",
    skill: "HTML"
  },

  // CSS

  {
    question: "What is CSS?",
    answer: "CSS stands for Cascading Style Sheets. It is used to style and design HTML elements.",
    type: "Technical",
    difficulty: "Easy",
    skill: "CSS"
  },
  {
    question: "What is the CSS box model?",
    answer: "The CSS box model consists of content, padding, border and margin.",
    type: "Technical",
    difficulty: "Easy",
    skill: "CSS"
  },
  {
    question: "What is Flexbox?",
    answer: "Flexbox is a CSS layout system used to arrange and align elements in a flexible way.",
    type: "Technical",
    difficulty: "Medium",
    skill: "CSS"
  },
  {
    question: "What is responsive web design?",
    answer: "Responsive web design allows a website to adapt to different screen sizes such as mobile, tablet and desktop.",
    type: "Technical",
    difficulty: "Easy",
    skill: "CSS"
  },

  // JavaScript

  {
    question: "What is JavaScript?",
    answer: "JavaScript is a programming language used to add logic and interactivity to web applications.",
    type: "Technical",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "What is the difference between var, let and const?",
    answer: "var is function scoped, while let and const are block scoped. const cannot be reassigned.",
    type: "Technical",
    difficulty: "Medium",
    skill: "JavaScript"
  },
  {
    question: "What is the difference between == and ===?",
    answer: "== compares values after type conversion, while === compares both value and data type.",
    type: "Technical",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that remembers variables from its outer scope even after the outer function has finished execution.",
    type: "Technical",
    difficulty: "Medium",
    skill: "JavaScript"
  },
  {
    question: "What is a Promise?",
    answer: "A Promise represents the eventual result of an asynchronous operation.",
    type: "Technical",
    difficulty: "Medium",
    skill: "JavaScript"
  },
  {
    question: "What is async/await?",
    answer: "async/await provides a cleaner way to write and handle asynchronous JavaScript code using Promises.",
    type: "Technical",
    difficulty: "Medium",
    skill: "JavaScript"
  },

  // React

  {
    question: "What is React.js?",
    answer: "React.js is a JavaScript library used to build reusable and component-based user interfaces.",
    type: "Technical",
    difficulty: "Easy",
    skill: "React.js"
  },
  {
    question: "What are props in React?",
    answer: "Props are read-only values passed from a parent component to a child component.",
    type: "Technical",
    difficulty: "Easy",
    skill: "React.js"
  },
  {
    question: "What is state in React?",
    answer: "State is data managed inside a React component that can change over time and trigger re-rendering.",
    type: "Technical",
    difficulty: "Easy",
    skill: "React.js"
  },
  {
    question: "What is useState?",
    answer: "useState is a React Hook used to create and manage state in functional components.",
    type: "Technical",
    difficulty: "Easy",
    skill: "React.js"
  },
  {
    question: "What is useEffect?",
    answer: "useEffect is used to perform side effects such as API calls and subscriptions in React components.",
    type: "Technical",
    difficulty: "Medium",
    skill: "React.js"
  },

  // Node.js

  {
    question: "What is Node.js?",
    answer: "Node.js is a JavaScript runtime that allows JavaScript to run outside the browser, including on servers.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Node.js"
  },
  {
    question: "What is npm?",
    answer: "npm is the Node Package Manager used to install and manage JavaScript packages.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Node.js"
  },
  {
    question: "What is the event loop in Node.js?",
    answer: "The event loop allows Node.js to handle asynchronous operations without blocking the main execution thread.",
    type: "Technical",
    difficulty: "Medium",
    skill: "Node.js"
  },

  // Express

  {
    question: "What is Express.js?",
    answer: "Express.js is a web framework for Node.js used to build servers and REST APIs.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Express.js"
  },
  {
    question: "What is middleware in Express.js?",
    answer: "Middleware functions can access the request, response and next function and are commonly used for authentication, logging and validation.",
    type: "Technical",
    difficulty: "Medium",
    skill: "Express.js"
  },
  {
    question: "What is routing in Express.js?",
    answer: "Routing defines how an application responds to requests for different URLs and HTTP methods.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Express.js"
  },

  // MongoDB

  {
    question: "What is MongoDB?",
    answer: "MongoDB is a NoSQL database that stores data in flexible document-based structures.",
    type: "Technical",
    difficulty: "Easy",
    skill: "MongoDB"
  },
  {
    question: "What is a collection in MongoDB?",
    answer: "A collection is a group of MongoDB documents and is similar to a table in a relational database.",
    type: "Technical",
    difficulty: "Easy",
    skill: "MongoDB"
  },
  {
    question: "What is Mongoose?",
    answer: "Mongoose is an ODM library for MongoDB and Node.js that provides schemas, models and validation.",
    type: "Technical",
    difficulty: "Easy",
    skill: "MongoDB"
  },
  {
    question: "What are CRUD operations?",
    answer: "CRUD stands for Create, Read, Update and Delete.",
    type: "Technical",
    difficulty: "Easy",
    skill: "MongoDB"
  },

  // REST API

  {
    question: "What is a REST API?",
    answer: "A REST API allows applications to communicate using resources and standard HTTP methods.",
    type: "Technical",
    difficulty: "Easy",
    skill: "REST API"
  },
  {
    question: "What are GET, POST, PUT and DELETE?",
    answer: "GET retrieves data, POST creates data, PUT updates data and DELETE removes data.",
    type: "Technical",
    difficulty: "Easy",
    skill: "REST API"
  },
  {
    question: "What is JSON?",
    answer: "JSON stands for JavaScript Object Notation and is commonly used to exchange data between frontend and backend.",
    type: "Technical",
    difficulty: "Easy",
    skill: "REST API"
  },

  // HTTP / HTTPS

  {
    question: "What is HTTP?",
    answer: "HTTP stands for HyperText Transfer Protocol and is used for communication between clients and servers.",
    type: "Technical",
    difficulty: "Easy",
    skill: "HTTP/HTTPS"
  },
  {
    question: "What is HTTPS?",
    answer: "HTTPS is HTTP secured using TLS encryption to protect data transmitted between client and server.",
    type: "Technical",
    difficulty: "Easy",
    skill: "HTTP/HTTPS"
  },
  {
    question: "What is the difference between HTTP and HTTPS?",
    answer: "HTTP does not use TLS to encrypt the connection, while HTTPS uses TLS to help protect data in transit.",
    type: "Technical",
    difficulty: "Easy",
    skill: "HTTP/HTTPS"
  },

  // Git

  {
    question: "What is Git?",
    answer: "Git is a distributed version control system used to track changes in source code.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Git"
  },
  {
    question: "What is git push?",
    answer: "git push sends local commits to a remote repository.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Git"
  },
  {
    question: "What is git pull?",
    answer: "git pull fetches changes from a remote repository and integrates them into the current branch.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Git"
  },

  // GitHub

  {
    question: "What is GitHub?",
    answer: "GitHub is a platform used to host Git repositories and collaborate on software projects.",
    type: "Technical",
    difficulty: "Easy",
    skill: "GitHub"
  },

  // Authentication

  {
    question: "What is authentication?",
    answer: "Authentication verifies the identity of a user.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Authentication"
  },
  {
    question: "What is authorization?",
    answer: "Authorization determines what an authenticated user is allowed to access or perform.",
    type: "Technical",
    difficulty: "Easy",
    skill: "Authentication"
  },
  {
    question: "What is JWT?",
    answer: "JWT stands for JSON Web Token and is commonly used to represent authentication information between client and server.",
    type: "Technical",
    difficulty: "Medium",
    skill: "Authentication"
  },

  // Coding

  {
    question: "Find the largest number in an array.",
    answer: "Initialize the first element as the largest and compare each remaining element with it.",
    type: "Coding",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "Find the smallest number in an array.",
    answer: "Initialize the first element as the smallest and compare every remaining element with it.",
    type: "Coding",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "Find the sum of all elements in an array.",
    answer: "Initialize sum to zero and add every array element to sum using a loop.",
    type: "Coding",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "Check whether a number is a palindrome.",
    answer: "Reverse the number and compare the reversed number with the original number.",
    type: "Coding",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "Check whether a number is prime.",
    answer: "A prime number has exactly two factors: 1 and itself. Check whether the number is divisible by any value from 2 to its square root.",
    type: "Coding",
    difficulty: "Medium",
    skill: "JavaScript"
  },

  // HR

  {
    question: "Tell me about yourself.",
    answer: "I recently completed my BCA and I am interested in full-stack web development. I have learned HTML, CSS, JavaScript, React, Node.js, Express.js and MongoDB. I have also worked on full-stack projects and implemented APIs, database integration and authentication.",
    type: "HR",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "Why do you want to become a full-stack developer?",
    answer: "I enjoy working on both frontend and backend development. Full-stack development allows me to build complete applications from user interface to server and database.",
    type: "HR",
    difficulty: "Easy",
    skill: "JavaScript"
  },
  {
    question: "Explain your StayNest project.",
    answer: "StayNest is a full-stack accommodation booking platform. It uses React, Node.js, Express.js and MongoDB and includes authentication, CRUD operations, reviews, wishlist, image upload and REST APIs.",
    type: "HR",
    difficulty: "Easy",
    skill: "JavaScript"
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
   const mernCareer = await Career.findOne({
    name: "MERN Stack Developer"
});

if (!mernCareer) {
    throw new Error("MERN Stack Developer career not found");
}

console.log("MERN Career found:", mernCareer.name);
    console.log("MongoDB connected");

    // Create missing skills
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

    console.log("Skills created/updated");

    // Get all skills
    const skills = await Skill.find();

    const skillMap = {};

    skills.forEach((skill) => {
      skillMap[skill.name.toLowerCase()] = skill._id;
    });

    // Remove old questions
    await Question.deleteMany({});

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
        career: mernCareer._id
      });
    }

    await Question.insertMany(finalQuestions);

    console.log(
      `${finalQuestions.length} questions inserted successfully`
    );

    await mongoose.connection.close();

  } catch (error) {
    console.log("Seed Error:", error.message);
  }
}

seedData();