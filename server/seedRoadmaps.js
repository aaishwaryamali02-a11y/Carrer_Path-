const mongoose = require("mongoose");
require("dotenv").config();

const Career = require("./models/Career");
const Roadmap = require("./models/Roadmap");

const roadmaps = [
  {
    career: "MERN Full Stack development",
    title: "MERN Full Stack Roadmap",
    description: "Complete roadmap for becoming a MERN Full Stack.",
    duration: "6-9 Months",
    steps: [
      {
        stepNumber: 1,
        title: "HTML & CSS",
        topics: [
          "HTML5",
          "Semantic HTML",
          "Forms",
          "CSS3",
          "Flexbox",
          "Grid",
          "Responsive Design",
          "Bootstrap"
        ]
      },
      {
        stepNumber: 2,
        title: "JavaScript",
        topics: [
          "Variables",
          "Data Types",
          "Functions",
          "Arrays",
          "Objects",
          "Loops",
          "DOM",
          "ES6",
          "Promises",
          "Async/Await",
          "Fetch API"
        ]
      },
      {
        stepNumber: 3,
        title: "React.js",
        topics: [
          "Components",
          "JSX",
          "Props",
          "State",
          "Hooks",
          "Events",
          "Forms",
          "React Router",
          "API Integration"
        ]
      },
      {
        stepNumber: 4,
        title: "Node.js & Express.js",
        topics: [
          "Node.js",
          "NPM",
          "Express.js",
          "Routing",
          "Middleware",
          "REST API",
          "Authentication",
          "Error Handling"
        ]
      },
      {
        stepNumber: 5,
        title: "MongoDB",
        topics: [
          "Database Basics",
          "Collections",
          "Documents",
          "CRUD",
          "Queries",
          "Mongoose",
          "Schema",
          "Models"
        ]
      },
      {
        stepNumber: 6,
        title: "Full Stack Projects",
        topics: [
          "Frontend Project",
          "Backend API",
          "Database Integration",
          "Authentication",
          "CRUD",
          "Image Upload",
          "Deployment",
          "GitHub"
        ]
      },
      {
        stepNumber: 7,
        title: "Interview Preparation",
        topics: [
          "HTML Questions",
          "CSS Questions",
          "JavaScript Questions",
          "React Questions",
          "Node.js Questions",
          "MongoDB Questions",
          "REST API",
          "Coding Problems",
          "HR Questions"
        ]
      }
    ]
  },

  {
    career: "Frontend Developer",
    title: "Frontend Developer Roadmap",
    description:
      "Learn how to build modern, responsive and interactive web interfaces.",
    duration: "4-6 Months",
    steps: [
      {
        stepNumber: 1,
        title: "HTML",
        topics: [
          "HTML5",
          "Semantic HTML",
          "Forms",
          "Tables",
          "Accessibility"
        ]
      },
      {
        stepNumber: 2,
        title: "CSS",
        topics: [
          "CSS3",
          "Flexbox",
          "Grid",
          "Responsive Design",
          "Animations",
          "Tailwind CSS"
        ]
      },
      {
        stepNumber: 3,
        title: "JavaScript",
        topics: [
          "Variables",
          "Functions",
          "Arrays",
          "Objects",
          "DOM",
          "ES6",
          "Promises",
          "Async/Await"
        ]
      },
      {
        stepNumber: 4,
        title: "Frontend Framework",
        topics: [
          "React",
          "Components",
          "Props",
          "State",
          "Hooks",
          "React Router",
          "API Integration"
        ]
      },
      {
        stepNumber: 5,
        title: "TypeScript & Tools",
        topics: [
          "TypeScript Basics",
          "Git",
          "GitHub",
          "NPM",
          "Browser DevTools"
        ]
      },
      {
        stepNumber: 6,
        title: "Projects & Portfolio",
        topics: [
          "Responsive Website",
          "React Project",
          "API Based Project",
          "Portfolio Website",
          "GitHub"
        ]
      },
      {
        stepNumber: 7,
        title: "Interview Preparation",
        topics: [
          "HTML Questions",
          "CSS Questions",
          "JavaScript Questions",
          "React Questions",
          "Coding Problems",
          "HR Questions"
        ]
      }
    ]
  },

  {
    career: "Java Developer",
    title: "Java Developer Roadmap",
    description:
      "Learn Java programming and backend development for software engineering roles.",
    duration: "6-9 Months",
    steps: [
      {
        stepNumber: 1,
        title: "Java Basics",
        topics: [
          "Syntax",
          "Variables",
          "Data Types",
          "Operators",
          "Conditions",
          "Loops",
          "Arrays"
        ]
      },
      {
        stepNumber: 2,
        title: "Object Oriented Programming",
        topics: [
          "Classes",
          "Objects",
          "Inheritance",
          "Polymorphism",
          "Encapsulation",
          "Abstraction"
        ]
      },
      {
        stepNumber: 3,
        title: "Advanced Java",
        topics: [
          "Collections",
          "Exception Handling",
          "Generics",
          "Multithreading",
          "File Handling",
          "Java 8 Features"
        ]
      },
      {
        stepNumber: 4,
        title: "SQL & Database",
        topics: [
          "SQL Basics",
          "CRUD",
          "Joins",
          "Group By",
          "Subqueries",
          "MySQL"
        ]
      },
      {
        stepNumber: 5,
        title: "Spring Boot",
        topics: [
          "Spring Basics",
          "Spring Boot",
          "REST API",
          "Controllers",
          "Services",
          "Repositories",
          "JPA"
        ]
      },
      {
        stepNumber: 6,
        title: "Projects",
        topics: [
          "Backend Project",
          "REST API",
          "Database Integration",
          "Authentication",
          "GitHub",
          "Deployment"
        ]
      },
      {
        stepNumber: 7,
        title: "Interview Preparation",
        topics: [
          "Java Questions",
          "OOP Questions",
          "SQL Questions",
          "Spring Boot Questions",
          "Coding Problems",
          "HR Questions"
        ]
      }
    ]
  },

  {
    career: "Python Developer",
    title: "Python Developer Roadmap",
    description:
      "Build backend applications and automation solutions using Python.",
    duration: "5-7 Months",
    steps: [
      {
        stepNumber: 1,
        title: "Python Basics",
        topics: [
          "Variables",
          "Data Types",
          "Conditions",
          "Loops",
          "Functions",
          "Lists",
          "Tuples",
          "Dictionaries"
        ]
      },
      {
        stepNumber: 2,
        title: "Advanced Python",
        topics: [
          "OOP",
          "Exception Handling",
          "Modules",
          "Packages",
          "File Handling",
          "Virtual Environment"
        ]
      },
      {
        stepNumber: 3,
        title: "SQL & Databases",
        topics: [
          "SQL",
          "MySQL",
          "PostgreSQL",
          "CRUD",
          "Joins",
          "Database Design"
        ]
      },
      {
        stepNumber: 4,
        title: "Web Development",
        topics: [
          "Django",
          "Flask",
          "REST API",
          "Routing",
          "Authentication"
        ]
      },
      {
        stepNumber: 5,
        title: "Projects",
        topics: [
          "Web Application",
          "REST API Project",
          "Database Integration",
          "Authentication",
          "GitHub"
        ]
      },
      {
        stepNumber: 6,
        title: "Deployment",
        topics: [
          "Git",
          "GitHub",
          "Environment Variables",
          "Cloud Deployment"
        ]
      },
      {
        stepNumber: 7,
        title: "Interview Preparation",
        topics: [
          "Python Questions",
          "OOP Questions",
          "SQL Questions",
          "Django Questions",
          "Coding Problems",
          "HR Questions"
        ]
      }
    ]
  },

  {
    career: "Data Analyst",
    title: "Data Analyst Roadmap",
    description:
      "Learn data analysis and visualization skills to turn raw data into useful insights.",
    duration: "4-6 Months",
    steps: [
      {
        stepNumber: 1,
        title: "Excel",
        topics: [
          "Excel Basics",
          "Formulas",
          "Functions",
          "Pivot Tables",
          "Charts",
          "Data Cleaning"
        ]
      },
      {
        stepNumber: 2,
        title: "SQL",
        topics: [
          "SELECT",
          "WHERE",
          "GROUP BY",
          "ORDER BY",
          "Joins",
          "Subqueries",
          "Window Functions"
        ]
      },
      {
        stepNumber: 3,
        title: "Statistics",
        topics: [
          "Mean",
          "Median",
          "Mode",
          "Probability",
          "Correlation",
          "Basic Statistics"
        ]
      },
      {
        stepNumber: 4,
        title: "Python for Data Analysis",
        topics: [
          "Python",
          "NumPy",
          "Pandas",
          "Data Cleaning",
          "Data Analysis"
        ]
      },
      {
        stepNumber: 5,
        title: "Data Visualization",
        topics: [
          "Power BI",
          "Dashboards",
          "Charts",
          "Reports",
          "Data Storytelling"
        ]
      },
      {
        stepNumber: 6,
        title: "Projects",
        topics: [
          "Sales Dashboard",
          "Customer Analysis",
          "Business Analysis",
          "Power BI Project",
          "Portfolio"
        ]
      },
      {
        stepNumber: 7,
        title: "Interview Preparation",
        topics: [
          "SQL Questions",
          "Excel Questions",
          "Python Questions",
          "Power BI Questions",
          "Case Studies",
          "HR Questions"
        ]
      }
    ]
  },

  {
    career: "QA / Software Tester",
    title: "QA / Software Tester Roadmap",
    description:
      "Learn software testing fundamentals, API testing and automation testing.",
    duration: "4-6 Months",
    steps: [
      {
        stepNumber: 1,
        title: "Testing Fundamentals",
        topics: [
          "Software Testing",
          "SDLC",
          "STLC",
          "Test Cases",
          "Bug Life Cycle"
        ]
      },
      {
        stepNumber: 2,
        title: "Manual Testing",
        topics: [
          "Functional Testing",
          "Regression Testing",
          "Smoke Testing",
          "Integration Testing",
          "System Testing"
        ]
      },
      {
        stepNumber: 3,
        title: "SQL",
        topics: [
          "SELECT",
          "Joins",
          "CRUD",
          "Database Testing",
          "Queries"
        ]
      },
      {
        stepNumber: 4,
        title: "API Testing",
        topics: [
          "HTTP",
          "REST API",
          "GET",
          "POST",
          "PUT",
          "DELETE",
          "Postman"
        ]
      },
      {
        stepNumber: 5,
        title: "Automation Testing",
        topics: [
          "Selenium",
          "Test Automation",
          "Locators",
          "Test Scripts",
          "Automation Frameworks"
        ]
      },
      {
        stepNumber: 6,
        title: "Tools & Projects",
        topics: [
          "Jira",
          "Git",
          "GitHub",
          "Testing Project",
          "Bug Reports"
        ]
      },
      {
        stepNumber: 7,
        title: "Interview Preparation",
        topics: [
          "Testing Questions",
          "SQL Questions",
          "API Questions",
          "Selenium Questions",
          "Scenario Based Questions",
          "HR Questions"
        ]
      }
    ]
  },

  {
    career: "DevOps Engineer",
    title: "DevOps Engineer Roadmap",
    description:
      "Learn infrastructure, automation, containers and cloud deployment.",
    duration: "6-9 Months",
    steps: [
      {
        stepNumber: 1,
        title: "Linux",
        topics: [
          "Linux Basics",
          "File System",
          "Permissions",
          "Processes",
          "Shell Commands"
        ]
      },
      {
        stepNumber: 2,
        title: "Git & GitHub",
        topics: [
          "Git Basics",
          "Branches",
          "Merge",
          "Pull Requests",
          "GitHub"
        ]
      },
      {
        stepNumber: 3,
        title: "Docker",
        topics: [
          "Containers",
          "Images",
          "Dockerfile",
          "Docker Compose",
          "Container Networking"
        ]
      },
      {
        stepNumber: 4,
        title: "CI/CD",
        topics: [
          "CI/CD Concepts",
          "Jenkins",
          "GitHub Actions",
          "Build Pipelines",
          "Deployment"
        ]
      },
      {
        stepNumber: 5,
        title: "Cloud",
        topics: [
          "AWS",
          "EC2",
          "S3",
          "IAM",
          "Cloud Networking"
        ]
      },
      {
        stepNumber: 6,
        title: "Kubernetes & Infrastructure",
        topics: [
          "Kubernetes",
          "Pods",
          "Services",
          "Deployments",
          "Terraform"
        ]
      },
      {
        stepNumber: 7,
        title: "Interview Preparation",
        topics: [
          "Linux Questions",
          "Git Questions",
          "Docker Questions",
          "AWS Questions",
          "CI/CD Questions",
          "Scenario Based Questions"
        ]
      }
    ]
  }
];

const seedRoadmaps = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const roadmapData of roadmaps) {
      const career = await Career.findOne({
        name: roadmapData.career
      });

      if (!career) {
        console.log(
          `Career not found: ${roadmapData.career}`
        );
        continue;
      }

      await Roadmap.findOneAndUpdate(
        {
          career: career._id,
          title: roadmapData.title
        },
        {
          career: career._id,
          title: roadmapData.title,
          description: roadmapData.description,
          duration: roadmapData.duration,
          steps: roadmapData.steps
        },
        {
          upsert: true,
          new: true
        }
      );

      console.log(
        `Roadmap added: ${roadmapData.career}`
      );
    }

    console.log("Roadmap seeding completed");

    await mongoose.connection.close();

  } catch (error) {
    console.log("Seed Error:", error.message);
  }
};

seedRoadmaps();