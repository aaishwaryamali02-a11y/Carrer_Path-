require("dotenv").config();

const mongoose = require("mongoose");

const Skill = require("./models/Skill");
const Question = require("./models/Question");
const Career = require("./models/Career");

const skillsData = [
    {
        name: "SQL",
        category: "Data Analytics",
        level: "Intermediate",
        tools: ["MySQL", "PostgreSQL", "SQL Server"],
        importance: "High",
        description: "SQL is used to query, analyze and manage data stored in relational databases."
    },
    {
        name: "Excel",
        category: "Data Analytics",
        level: "Intermediate",
        tools: ["Microsoft Excel"],
        importance: "High",
        description: "Excel is widely used for data cleaning, analysis, formulas, pivot tables and reporting."
    },
    {
        name: "Power BI",
        category: "Data Visualization",
        level: "Intermediate",
        tools: ["Power BI Desktop", "Power Query", "DAX"],
        importance: "High",
        description: "Power BI is used to create interactive dashboards and business reports."
    },
    {
        name: "Statistics",
        category: "Data Analytics",
        level: "Intermediate",
        tools: ["Excel", "Python"],
        importance: "High",
        description: "Statistics helps analysts understand patterns, relationships and distributions in data."
    },
    {
        name: "Python",
        category: "Programming",
        level: "Intermediate",
        tools: ["VS Code", "Jupyter Notebook"],
        importance: "High",
        description: "Python is used for data analysis, automation and data processing."
    },
    {
        name: "Pandas",
        category: "Python Data Analysis",
        level: "Intermediate",
        tools: ["Python", "Jupyter Notebook"],
        importance: "High",
        description: "Pandas is a Python library used for data manipulation and analysis."
    },
    {
        name: "Data Visualization",
        category: "Data Analytics",
        level: "Intermediate",
        tools: ["Power BI", "Excel", "Matplotlib"],
        importance: "High",
        description: "Data visualization represents data using charts, graphs and dashboards."
    }
];

const questionsData = [

    // ================= SQL =================

    {
        question: "What is SQL?",
        answer: "SQL stands for Structured Query Language. It is used to store, retrieve, manipulate and analyze data in relational databases.",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What is the difference between WHERE and HAVING?",
        answer: "WHERE filters rows before grouping, while HAVING filters groups after GROUP BY is applied.",
        type: "Technical",
        difficulty: "Medium",
        skill: "SQL"
    },
    {
        question: "What is GROUP BY in SQL?",
        answer: "GROUP BY is used to group rows having the same values and perform aggregate calculations such as SUM, COUNT, AVG, MIN and MAX.",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What are aggregate functions in SQL?",
        answer: "Aggregate functions perform calculations on multiple rows. Common examples are COUNT(), SUM(), AVG(), MIN() and MAX().",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What is a JOIN in SQL?",
        answer: "JOIN is used to combine data from two or more tables using a related column.",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What is the difference between INNER JOIN and LEFT JOIN?",
        answer: "INNER JOIN returns only matching records from both tables. LEFT JOIN returns all records from the left table and matching records from the right table.",
        type: "Technical",
        difficulty: "Medium",
        skill: "SQL"
    },
    {
        question: "What is a Primary Key?",
        answer: "A primary key uniquely identifies each record in a table. It cannot contain duplicate or NULL values.",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What is a Foreign Key?",
        answer: "A foreign key is a column that creates a relationship between two tables by referring to the primary key of another table.",
        type: "Technical",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What is the difference between DELETE, DROP and TRUNCATE?",
        answer: "DELETE removes selected rows, TRUNCATE removes all rows from a table, and DROP removes the complete table structure.",
        type: "Technical",
        difficulty: "Medium",
        skill: "SQL"
    },
    {
        question: "What is a subquery?",
        answer: "A subquery is a query written inside another SQL query.",
        type: "Technical",
        difficulty: "Medium",
        skill: "SQL"
    },
    {
        question: "What is normalization?",
        answer: "Normalization is the process of organizing database tables to reduce data duplication and improve data consistency.",
        type: "Technical",
        difficulty: "Medium",
        skill: "SQL"
    },
    {
        question: "Write a SQL query to find the second highest salary.",
        answer: "Example: SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
        type: "Coding",
        difficulty: "Medium",
        skill: "SQL"
    },
    {
        question: "Write a SQL query to find the total number of employees.",
        answer: "Example: SELECT COUNT(*) FROM employees;",
        type: "Coding",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "Write a SQL query to find the average salary.",
        answer: "Example: SELECT AVG(salary) FROM employees;",
        type: "Coding",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "Write a SQL query to find duplicate records.",
        answer: "Example: SELECT name, COUNT(*) FROM employees GROUP BY name HAVING COUNT(*) > 1;",
        type: "Coding",
        difficulty: "Medium",
        skill: "SQL"
    },

    // ================= EXCEL =================

    {
        question: "Why is Excel used in data analysis?",
        answer: "Excel is used for data cleaning, calculations, formulas, pivot tables, charts and reporting.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Excel"
    },
    {
        question: "What is a Pivot Table?",
        answer: "A Pivot Table is used to summarize and analyze large amounts of data by grouping and aggregating information.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Excel"
    },
    {
        question: "What is VLOOKUP?",
        answer: "VLOOKUP searches for a value in the first column of a table and returns a related value from another column.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Excel"
    },
    {
        question: "What is the difference between VLOOKUP and XLOOKUP?",
        answer: "XLOOKUP is more flexible than VLOOKUP because it can search in different directions and provides better handling of missing values.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Excel"
    },
    {
        question: "What is conditional formatting?",
        answer: "Conditional formatting automatically changes the appearance of cells based on specified conditions.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Excel"
    },
    {
        question: "How do you remove duplicate data in Excel?",
        answer: "Select the data, go to Data, choose Remove Duplicates and select the columns to check.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Excel"
    },
    {
        question: "What is the use of IF function in Excel?",
        answer: "The IF function checks a condition and returns one value if the condition is true and another value if it is false.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Excel"
    },

    // ================= POWER BI =================

    {
        question: "What is Power BI?",
        answer: "Power BI is a Microsoft business intelligence tool used to connect, transform, analyze and visualize data.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Power BI"
    },
    {
        question: "What is Power Query?",
        answer: "Power Query is used to import, clean and transform data before loading it into Power BI.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Power BI"
    },
    {
        question: "What is DAX?",
        answer: "DAX stands for Data Analysis Expressions. It is a formula language used in Power BI to create calculated columns and measures.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Power BI"
    },
    {
        question: "What is the difference between a calculated column and a measure?",
        answer: "A calculated column calculates a value for each row, while a measure calculates values dynamically based on the filter context.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Power BI"
    },
    {
        question: "What is a dashboard in Power BI?",
        answer: "A dashboard is a visual representation of important business information using charts, graphs, cards and other visuals.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Power BI"
    },
    {
        question: "What is a slicer in Power BI?",
        answer: "A slicer is a visual filter that allows users to interactively filter the data displayed in a report.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Power BI"
    },

    // ================= STATISTICS =================

    {
        question: "What is mean?",
        answer: "Mean is the average of a set of numbers. It is calculated by dividing the sum of values by the number of values.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Statistics"
    },
    {
        question: "What is median?",
        answer: "Median is the middle value of an ordered dataset. If there are two middle values, their average is the median.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Statistics"
    },
    {
        question: "What is mode?",
        answer: "Mode is the value that occurs most frequently in a dataset.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Statistics"
    },
    {
        question: "What is standard deviation?",
        answer: "Standard deviation measures how much values differ or spread from the mean.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Statistics"
    },
    {
        question: "What is correlation?",
        answer: "Correlation measures the strength and direction of the relationship between two variables.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Statistics"
    },
    {
        question: "What is an outlier?",
        answer: "An outlier is a data value that is significantly different from the other values in a dataset.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Statistics"
    },

    // ================= PYTHON =================

    {
        question: "Why is Python used in data analysis?",
        answer: "Python is easy to learn and provides powerful libraries such as Pandas, NumPy and Matplotlib for data analysis and visualization.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Python"
    },
    {
        question: "What is the difference between a list and a tuple in Python?",
        answer: "A list is mutable, meaning its values can be changed. A tuple is immutable, meaning its values cannot be changed after creation.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Python"
    },
    {
        question: "Write Python code to find the largest number in a list.",
        answer: "Example: numbers = [10, 25, 5, 40]; print(max(numbers))",
        type: "Coding",
        difficulty: "Easy",
        skill: "Python"
    },
    {
        question: "Write Python code to calculate the average of a list.",
        answer: "Example: numbers = [10, 20, 30]; average = sum(numbers) / len(numbers); print(average)",
        type: "Coding",
        difficulty: "Easy",
        skill: "Python"
    },

    // ================= PANDAS =================

    {
        question: "What is Pandas?",
        answer: "Pandas is a Python library used for data manipulation, data cleaning and data analysis.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Pandas"
    },
    {
        question: "What is a DataFrame?",
        answer: "A DataFrame is a two-dimensional table-like data structure in Pandas containing rows and columns.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Pandas"
    },
    {
        question: "How do you read a CSV file using Pandas?",
        answer: "Example: import pandas as pd; df = pd.read_csv('data.csv')",
        type: "Coding",
        difficulty: "Easy",
        skill: "Pandas"
    },
    {
        question: "How do you check missing values in Pandas?",
        answer: "We can use df.isnull().sum() to count missing values in each column.",
        type: "Coding",
        difficulty: "Easy",
        skill: "Pandas"
    },
    {
        question: "How do you remove duplicate rows using Pandas?",
        answer: "We can use df.drop_duplicates() to remove duplicate rows from a DataFrame.",
        type: "Coding",
        difficulty: "Easy",
        skill: "Pandas"
    },
    {
        question: "How do you filter data in Pandas?",
        answer: "We can use Boolean conditions. Example: df[df['salary'] > 50000]",
        type: "Coding",
        difficulty: "Medium",
        skill: "Pandas"
    },

    // ================= DATA VISUALIZATION =================

    {
        question: "What is data visualization?",
        answer: "Data visualization is the graphical representation of data using charts, graphs and dashboards to make information easier to understand.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Data Visualization"
    },
    {
        question: "Which chart is useful for comparing categories?",
        answer: "Bar charts and column charts are commonly used to compare values across different categories.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Data Visualization"
    },
    {
        question: "Which chart is useful for showing trends over time?",
        answer: "A line chart is commonly used to show trends and changes over time.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Data Visualization"
    },
    {
        question: "What makes a good dashboard?",
        answer: "A good dashboard should be simple, clear, interactive and focused on important business metrics. It should avoid unnecessary visuals.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Data Visualization"
    },

    // ================= DATA ANALYST PROCESS =================

    {
        question: "What is data cleaning?",
        answer: "Data cleaning is the process of fixing or removing incorrect, duplicate, missing and inconsistent data.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Data Visualization"
    },
    {
        question: "What are the main steps in data analysis?",
        answer: "Common steps are collecting data, cleaning data, exploring data, analyzing data, visualizing results and communicating insights.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Statistics"
    },
    {
        question: "How do you handle missing values?",
        answer: "Depending on the situation, missing values can be removed, replaced with mean/median/mode, or filled using another suitable method.",
        type: "Technical",
        difficulty: "Hard",
        skill: "Statistics"
    },
    {
        question: "What is Exploratory Data Analysis?",
        answer: "Exploratory Data Analysis, or EDA, is the process of examining and understanding data using statistics, visualizations and patterns before deeper analysis.",
        type: "Technical",
        difficulty: "Hard",
        skill: "Statistics"
    },

    // ================= HR =================

    {
        question: "Tell me about yourself.",
        answer: "I am a BCA graduate interested in Data Analytics. I have been learning SQL, Excel, Power BI, Python and data analysis concepts. I enjoy working with data, finding patterns and converting data into useful insights.",
        type: "HR",
        difficulty: "Easy",
        skill: "Statistics"
    },
    {
        question: "Why do you want to become a Data Analyst?",
        answer: "I am interested in working with data and solving problems. Data Analytics allows me to use technical skills along with logical thinking to find useful insights from data.",
        type: "HR",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "Why should we hire you as a fresher Data Analyst?",
        answer: "As a fresher, I am willing to learn and improve continuously. I have built my foundation in SQL, Excel, Power BI and Python, and I am ready to apply these skills to real-world problems.",
        type: "HR",
        difficulty: "Easy",
        skill: "SQL"
    },
    {
        question: "What will you do if the data given to you is incomplete?",
        answer: "First I would identify the missing data and understand why it is missing. Then I would choose an appropriate method such as removing records or filling values based on the situation.",
        type: "HR",
        difficulty: "Medium",
        skill: "Statistics"
    },
    {
        question: "How do you explain technical analysis to a non-technical person?",
        answer: "I would avoid unnecessary technical terms and explain the important findings using simple language, examples, charts and business impact.",
        type: "HR",
        difficulty: "Easy",
        skill: "Data Visualization"
    }
];

async function seedDataAnalystQuestions() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const dataAnalystCareer = await Career.findOne({
            name: "Data Analyst"
        });

        if (!dataAnalystCareer) {
            throw new Error(
                "Data Analyst career not found. Please add Data Analyst career first."
            );
        }

        console.log(
            "Career found:",
            dataAnalystCareer.name
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
                career: dataAnalystCareer._id
            });
        }

        // Delete only old Data Analyst questions
        await Question.deleteMany({
            career: dataAnalystCareer._id
        });

        // Insert new Data Analyst questions
        await Question.insertMany(finalQuestions);

        // Update career skills
        dataAnalystCareer.skills = [
            "SQL",
            "Excel",
            "Power BI",
            "Statistics",
            "Python",
            "Pandas",
            "Data Visualization"
        ];

        await dataAnalystCareer.save();

        console.log(
            `${finalQuestions.length} Data Analyst questions inserted successfully`
        );

        console.log(
            "Data Analyst Career ID:",
            dataAnalystCareer._id.toString()
        );

        await mongoose.connection.close();

        console.log("Database connection closed");

    } catch (error) {
        console.log(
            "Data Analyst Seed Error:",
            error.message
        );
    }
}

seedDataAnalystQuestions();