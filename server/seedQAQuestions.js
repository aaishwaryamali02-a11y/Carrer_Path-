require("dotenv").config();

const mongoose = require("mongoose");

const Skill = require("./models/Skill");
const Question = require("./models/Question");
const Career = require("./models/Career");

const skillsData = [
    {
        name: "Manual Testing",
        category: "Software Testing",
        level: "Beginner",
        tools: ["Jira", "Test Management Tools"],
        importance: "High",
        description: "Manual testing is the process of testing software manually without automation scripts."
    },
    {
        name: "Selenium",
        category: "Automation Testing",
        level: "Intermediate",
        tools: ["Selenium WebDriver", "ChromeDriver"],
        importance: "High",
        description: "Selenium is an automation framework used for testing web applications."
    },
    {
        name: "Java",
        category: "Programming",
        level: "Intermediate",
        tools: ["IntelliJ IDEA", "Eclipse"],
        importance: "High",
        description: "Java is commonly used with Selenium for automation testing."
    },
    {
        name: "API Testing",
        category: "Software Testing",
        level: "Intermediate",
        tools: ["Postman", "REST Assured"],
        importance: "High",
        description: "API testing verifies the functionality, reliability and performance of APIs."
    },
    {
        name: "Postman",
        category: "API Testing",
        level: "Beginner",
        tools: ["Postman"],
        importance: "High",
        description: "Postman is a tool used to test and debug APIs."
    },
    {
        name: "SQL",
        category: "Database Testing",
        level: "Intermediate",
        tools: ["MySQL", "PostgreSQL"],
        importance: "High",
        description: "SQL is used to validate and verify data stored in databases."
    },
    {
        name: "Git",
        category: "Version Control",
        level: "Beginner",
        tools: ["Git", "GitHub"],
        importance: "High",
        description: "Git is used to manage source code and automation test scripts."
    }
];

const questionsData = [

    // ================= MANUAL TESTING =================

    {
        question: "What is software testing?",
        answer: "Software testing is the process of checking software to identify defects and verify that it meets the required requirements.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is the difference between verification and validation?",
        answer: "Verification checks whether the product is being built correctly according to requirements. Validation checks whether the right product is being built according to user needs.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Manual Testing"
    },
    {
        question: "What is a test case?",
        answer: "A test case is a set of conditions, inputs, steps and expected results used to verify a particular functionality.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is a test scenario?",
        answer: "A test scenario is a high-level situation or functionality that needs to be tested.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is the difference between test case and test scenario?",
        answer: "A test scenario describes what functionality should be tested, while a test case provides detailed steps, data and expected results for testing it.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Manual Testing"
    },
    {
        question: "What is regression testing?",
        answer: "Regression testing verifies that new changes or fixes have not negatively affected existing functionality.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is smoke testing?",
        answer: "Smoke testing is a basic test performed on a new build to verify that the major functionalities are working and the build is stable enough for further testing.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is sanity testing?",
        answer: "Sanity testing is focused testing performed after a small change or bug fix to verify that the specific functionality works correctly.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Manual Testing"
    },
    {
        question: "What is functional testing?",
        answer: "Functional testing verifies whether the software functions according to specified requirements.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is non-functional testing?",
        answer: "Non-functional testing checks aspects such as performance, security, usability, reliability and scalability.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },

    // ================= SDLC / STLC =================

    {
        question: "What is SDLC?",
        answer: "SDLC stands for Software Development Life Cycle. It includes phases such as requirement analysis, design, development, testing, deployment and maintenance.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is STLC?",
        answer: "STLC stands for Software Testing Life Cycle. It includes requirement analysis, test planning, test case development, environment setup, test execution and test closure.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is the difference between SDLC and STLC?",
        answer: "SDLC covers the complete software development process, while STLC focuses specifically on the testing activities within software development.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Manual Testing"
    },

    // ================= BUGS =================

    {
        question: "What is a software bug?",
        answer: "A bug is an error or defect in software that causes the application to behave differently from the expected behavior.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What is severity and priority?",
        answer: "Severity describes the impact of a defect on the application. Priority describes how urgently the defect should be fixed.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Manual Testing"
    },
    {
        question: "What is a bug life cycle?",
        answer: "A typical bug lifecycle includes New, Assigned, Open, Fixed, Retest, Verified and Closed. Depending on the result, a bug can also be Reopened or Rejected.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Manual Testing"
    },

    // ================= SELENIUM =================

    {
        question: "What is Selenium?",
        answer: "Selenium is an open-source automation framework used to automate web applications across different browsers.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Selenium"
    },
    {
        question: "What is Selenium WebDriver?",
        answer: "Selenium WebDriver is an API that allows automation scripts to control web browsers and interact with web elements.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Selenium"
    },
    {
        question: "What are different Selenium components?",
        answer: "The Selenium suite includes Selenium WebDriver, Selenium IDE and Selenium Grid.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Selenium"
    },
    {
        question: "What are locators in Selenium?",
        answer: "Locators are used to identify elements on a web page. Common locators include ID, Name, Class Name, Tag Name, Link Text, CSS Selector and XPath.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Selenium"
    },
    {
        question: "What is XPath?",
        answer: "XPath is a language used to locate elements in an HTML or XML document. It is useful when other locators are not suitable.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Selenium"
    },
    {
        question: "What is the difference between absolute XPath and relative XPath?",
        answer: "Absolute XPath starts from the root of the HTML document, while relative XPath starts from a specific element and is generally more flexible.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Selenium"
    },
    {
        question: "What is an implicit wait?",
        answer: "Implicit wait tells Selenium to wait for a specified amount of time when trying to find an element before throwing an exception.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Selenium"
    },
    {
        question: "What is an explicit wait?",
        answer: "Explicit wait waits for a specific condition to occur before continuing execution.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Selenium"
    },
    {
        question: "What is the difference between findElement and findElements?",
        answer: "findElement returns a single matching element, while findElements returns a collection of matching elements.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Selenium"
    },
    {
        question: "How do you handle dropdowns in Selenium?",
        answer: "For standard HTML select elements, Selenium provides the Select class with methods such as selectByVisibleText, selectByValue and selectByIndex.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Selenium"
    },

    // ================= JAVA =================

    {
        question: "Why is Java commonly used with Selenium?",
        answer: "Java provides strong object-oriented programming features, a large testing ecosystem and good support for Selenium automation frameworks.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "What is OOP?",
        answer: "OOP stands for Object-Oriented Programming. Its main concepts include encapsulation, inheritance, polymorphism and abstraction.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "What is inheritance in Java?",
        answer: "Inheritance allows a class to acquire properties and methods from another class using the extends keyword.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "What is method overloading?",
        answer: "Method overloading means defining multiple methods with the same name but different parameters in the same class.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Java"
    },
    {
        question: "Write Java code to reverse a string.",
        answer: "Example: String str = \"hello\"; String rev = new StringBuilder(str).reverse().toString(); System.out.println(rev);",
        type: "Coding",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "Write Java code to check whether a number is even or odd.",
        answer: "Example: int num = 10; if (num % 2 == 0) System.out.println(\"Even\"); else System.out.println(\"Odd\");",
        type: "Coding",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "Write Java code to find the largest number in an array.",
        answer: "Example: int[] arr = {10, 20, 5, 40}; int max = arr[0]; for(int i=1;i<arr.length;i++){ if(arr[i] > max) max = arr[i]; } System.out.println(max);",
        type: "Coding",
        difficulty: "Easy",
        skill: "Java"
    },

    // ================= API TESTING =================

    {
        question: "What is API testing?",
        answer: "API testing verifies the functionality, reliability, performance and security of application programming interfaces.",
        type: "Technical",
        difficulty: "Easy",
        skill: "API Testing"
    },
    {
        question: "What are common HTTP methods used in API testing?",
        answer: "Common methods are GET, POST, PUT, PATCH and DELETE.",
        type: "Technical",
        difficulty: "Easy",
        skill: "API Testing"
    },
    {
        question: "What is the difference between GET and POST?",
        answer: "GET is generally used to retrieve data, while POST is generally used to send or create data.",
        type: "Technical",
        difficulty: "Easy",
        skill: "API Testing"
    },
    {
        question: "What is a status code 200?",
        answer: "HTTP 200 means the request was successfully processed.",
        type: "Technical",
        difficulty: "Easy",
        skill: "API Testing"
    },
    {
        question: "What does status code 404 mean?",
        answer: "HTTP 404 means the requested resource was not found.",
        type: "Technical",
        difficulty: "Easy",
        skill: "API Testing"
    },
    {
        question: "What does status code 500 mean?",
        answer: "HTTP 500 indicates an internal server error.",
        type: "Technical",
        difficulty: "Easy",
        skill: "API Testing"
    },

    // ================= POSTMAN =================

    {
        question: "What is Postman?",
        answer: "Postman is a tool used to send API requests and inspect responses during API testing and development.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Postman"
    },
    {
        question: "How do you test an API using Postman?",
        answer: "Select the HTTP method, enter the API URL, add required headers or body data, send the request and verify the response status, body and response time.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Postman"
    },
    {
        question: "What is a collection in Postman?",
        answer: "A collection is a group of API requests organized together for easier testing and management.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Postman"
    },

    // ================= SQL =================

    {
        question: "Why is SQL useful for testers?",
        answer: "SQL allows testers to verify whether data is correctly stored, updated and retrieved from the database.",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "Write a SQL query to find all employees with salary greater than 50000.",
        answer: "Example: SELECT * FROM employees WHERE salary > 50000;",
        type: "Coding",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "Write a SQL query to count records in a table.",
        answer: "Example: SELECT COUNT(*) FROM employees;",
        type: "Coding",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What is a JOIN in SQL?",
        answer: "A JOIN combines data from two or more tables using related columns.",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },

    // ================= GIT =================

    {
        question: "Why is Git used in automation testing?",
        answer: "Git is used to track changes in automation scripts, collaborate with team members and maintain different versions of the test framework.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Git"
    },
    {
        question: "What is git clone?",
        answer: "git clone creates a local copy of a remote Git repository.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Git"
    },
    {
        question: "What is git pull?",
        answer: "git pull downloads changes from a remote repository and integrates them into the current local branch.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Git"
    },

    // ================= HR =================

    {
        question: "Tell me about yourself.",
        answer: "I am a BCA graduate interested in software testing and automation. I have been learning manual testing, Selenium, Java, API testing, SQL and Git. I enjoy finding issues and improving software quality.",
        type: "HR",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "Why do you want to become a QA Automation Engineer?",
        answer: "I enjoy problem solving and finding defects. Automation testing also allows me to combine testing concepts with programming and build reusable test scripts.",
        type: "HR",
        difficulty: "Easy",
        skill: "Selenium"
    },
    {
        question: "Why should we hire you as a fresher?",
        answer: "I have a strong willingness to learn, good programming fundamentals and a foundation in testing concepts. I am ready to learn the company's tools and processes.",
        type: "HR",
        difficulty: "Easy",
        skill: "Manual Testing"
    },
    {
        question: "What will you do if a developer says your reported bug is not a bug?",
        answer: "I would reproduce the issue, provide clear steps, test data, screenshots or logs and compare the behavior with the requirements. I would discuss it professionally with the developer and team.",
        type: "HR",
        difficulty: "Medium",
        skill: "Manual Testing"
    },
    {
        question: "How do you decide which test cases should be automated?",
        answer: "I would consider repetitive tests, stable functionality, regression tests, high-risk scenarios and tests that need to run frequently.",
        type: "HR",
        difficulty: "Medium",
        skill: "Selenium"
    }
];

async function seedQAQuestions() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const qaCareer = await Career.findOne({
            name: "QA Automation Engineer"
        });

        if (!qaCareer) {
            throw new Error(
                "QA Automation Engineer career not found. Please add this career first."
            );
        }

        console.log(
            "Career found:",
            qaCareer.name
        );

        // Create / update skills
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

            const skillId =
                skillMap[item.skill.toLowerCase()];

            if (!skillId) {
                console.log(
                    `Skill not found: ${item.skill}`
                );
                continue;
            }

            finalQuestions.push({
                question: item.question,
                answer: item.answer,
                type: item.type,
                difficulty: item.difficulty,
                skill: skillId,
                career: qaCareer._id
            });
        }

        // Delete only old QA questions
        await Question.deleteMany({
            career: qaCareer._id
        });

        // Insert new QA questions
        await Question.insertMany(finalQuestions);

        qaCareer.skills = [
            "Manual Testing",
            "Selenium",
            "Java",
            "API Testing",
            "Postman",
            "SQL",
            "Git"
        ];

        await qaCareer.save();

        console.log(
            `${finalQuestions.length} QA Automation questions inserted successfully`
        );

        console.log(
            "QA Career ID:",
            qaCareer._id.toString()
        );

        await mongoose.connection.close();

        console.log("Database connection closed");

    } catch (error) {
        console.log(
            "QA Seed Error:",
            error.message
        );
    }
}

seedQAQuestions();