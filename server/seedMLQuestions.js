
require("dotenv").config();

const mongoose = require("mongoose");

const Skill = require("./models/Skill");
const Question = require("./models/Question");
const Career = require("./models/Career");

const skillsData = [
    {
        name: "Python",
        category: "Programming",
        level: "Intermediate",
        tools: ["VS Code", "Jupyter Notebook"],
        importance: "High",
        description: "Python is widely used for machine learning and data processing."
    },
    {
        name: "NumPy",
        category: "Data Science",
        level: "Intermediate",
        tools: ["Jupyter Notebook"],
        importance: "High",
        description: "NumPy is used for numerical calculations and array operations."
    },
    {
        name: "Pandas",
        category: "Data Science",
        level: "Intermediate",
        tools: ["Jupyter Notebook", "Google Colab"],
        importance: "High",
        description: "Pandas is used for data cleaning, analysis and manipulation."
    },
    {
        name: "Machine Learning",
        category: "Artificial Intelligence",
        level: "Intermediate",
        tools: ["Scikit-learn", "Google Colab"],
        importance: "High",
        description: "Machine learning allows systems to learn patterns from data."
    },
    {
        name: "Statistics",
        category: "Mathematics",
        level: "Intermediate",
        tools: ["Python", "Excel"],
        importance: "High",
        description: "Statistics helps in understanding data and evaluating ML models."
    },
    {
        name: "Scikit-learn",
        category: "Machine Learning",
        level: "Intermediate",
        tools: ["Python", "Jupyter Notebook"],
        importance: "High",
        description: "Scikit-learn provides tools for building machine learning models."
    }
];

const questionsData = [
    {
        question: "What is Machine Learning?",
        answer: "Machine Learning is a branch of Artificial Intelligence that allows computers to learn patterns from data and make predictions without being explicitly programmed for every task.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Machine Learning"
    },
    {
        question: "What is the difference between supervised and unsupervised learning?",
        answer: "Supervised learning uses labelled data for training. Unsupervised learning uses unlabelled data to find patterns or groups.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Machine Learning"
    },
    {
        question: "What is overfitting?",
        answer: "Overfitting happens when a model performs very well on training data but performs poorly on unseen data because it learns noise instead of general patterns.",
        type: "Technical",
        difficulty: "Hard",
        skill: "Machine Learning"
    },
    {
        question: "What is NumPy used for?",
        answer: "NumPy is used for numerical operations, multidimensional arrays and mathematical calculations in Python.",
        type: "Technical",
        difficulty: "Easy",
        skill: "NumPy"
    },
    {
        question: "What is Pandas used for?",
        answer: "Pandas is a Python library used for data cleaning, data manipulation, data analysis and working with structured data.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Pandas"
    },
    {
        question: "What is the difference between a list and a tuple in Python?",
        answer: "A list is mutable, which means its elements can be changed. A tuple is immutable, which means its elements cannot be changed after creation.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Python"
    },
    {
        question: "What is the purpose of train-test split?",
        answer: "Train-test split divides the dataset into training data for model learning and testing data for evaluating model performance.",
        type: "Technical",
        difficulty: "Hard",
        skill: "Machine Learning"
    },
    {
        question: "What is classification in Machine Learning?",
        answer: "Classification is a supervised learning technique used to predict categories or classes, such as spam or not spam.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Machine Learning"
    },
    {
        question: "What is regression in Machine Learning?",
        answer: "Regression is a supervised learning technique used to predict continuous numerical values, such as house prices.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Machine Learning"
    },
    {
        question: "Write Python code to find the largest number in a list.",
        answer: "Example: numbers = [10, 25, 5, 40]\\nprint(max(numbers))",
        type: "Coding",
        difficulty: "Easy",
        skill: "Python"
    },
    {
        question: "Write Python code to check whether a number is even or odd.",
        answer: "Example:\\nnum = 10\\nif num % 2 == 0:\\n    print('Even')\\nelse:\\n    print('Odd')",
        type: "Coding",
        difficulty: "Easy",
        skill: "Python"
    },
    {
        question: "Write Python code to calculate the average of a list.",
        answer: "Example:\\nnumbers = [10, 20, 30]\\naverage = sum(numbers) / len(numbers)\\nprint(average)",
        type: "Coding",
        difficulty: "Easy",
        skill: "Python"
    },
    {
        question: "Tell me about yourself.",
        answer: "I am a BCA graduate interested in Machine Learning. I am learning Python, data analysis and machine learning concepts. I am a quick learner and I enjoy solving programming problems.",
        type: "HR",
        difficulty: "Easy",
        skill: "Machine Learning"
    },
    {
        question: "Why do you want to work in Machine Learning?",
        answer: "I am interested in solving real-world problems using data and technology. Machine Learning gives me an opportunity to build systems that learn from data and make useful predictions.",
        type: "HR",
        difficulty: "Easy",
        skill: "Machine Learning"
    },
    {
        question: "How do you learn a new technical concept?",
        answer: "I first understand the basic theory, then practise examples and build a small project. I also refer to documentation and revise the concept through practice.",
        type: "HR",
        difficulty: "Easy",
        skill: "Machine Learning"
    }
];

async function seedMLData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const mlCareer = await Career.findOne({
            name: "Machine Learning Engineer"
        });

        if (!mlCareer) {
            throw new Error("Machine Learning Engineer career not found");
        }

        console.log("Career found:", mlCareer.name);

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
                career: mlCareer._id
            });
        }

        await Question.insertMany(finalQuestions);

        console.log(
            `${finalQuestions.length} ML questions inserted successfully`
        );

        await mongoose.connection.close();

    } catch (error) {
        console.log("ML Seed Error:", error.message);
    }
}

seedMLData();