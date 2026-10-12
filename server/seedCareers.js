const mongoose = require("mongoose");
require("dotenv").config();

const Career = require("./models/Career");

const careers = [
  {
    name: "Frontend Developer",
    description:
      "Design and build responsive, interactive user interfaces for web applications.",
    category: "Frontend Development",
    difficulty: "Intermediate",
    skills: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "React",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Git"
    ]
  },

  {
    name: "Full Stack Developer",
    description:
      "Handle both client-side and server-side development, managing databases and user interfaces.",
    category: "Full Stack Development",
    difficulty: "Advanced",
    skills: [
      "JavaScript",
      "Node.js",
      "React",
      "MongoDB",
      "Express.js",
      "SQL",
      "Docker",
      "AWS"
    ]
  },

  {
    name: "Data Scientist",
    description:
      "Analyze complex data sets to extract insights, build predictive models, and guide business decisions.",
    category: "Data Science & AI",
    difficulty: "Advanced",
    skills: [
      "Python",
      "R",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "SQL",
      "Scikit-Learn",
      "Data Visualization"
    ]
  },

  {
    name: "DevOps Engineer",
    description:
      "Automate and streamline the software delivery process, managing infrastructure and deployments.",
    category: "Infrastructure & Cloud",
    difficulty: "Advanced",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "Linux",
      "Terraform",
      "Bash",
      "Git"
    ]
  },

  {
    name: "Mobile App Developer",
    description:
      "Create native or cross-platform mobile applications for iOS and Android devices.",
    category: "Mobile Development",
    difficulty: "Intermediate",
    skills: [
      "Flutter",
      "React Native",
      "Swift",
      "Kotlin",
      "Dart",
      "Firebase",
      "REST APIs",
      "Git"
    ]
  },

  {
    name: "Cybersecurity Analyst",
    description:
      "Protect an organization's networks, systems, and data from cyber threats and unauthorized access.",
    category: "Cybersecurity",
    difficulty: "Advanced",
    skills: [
      "Network Security",
      "Penetration Testing",
      "Linux",
      "Wireshark",
      "SIEM",
      "Cryptography",
      "Python"
    ]
  },

  {
    name: "UI/UX Designer",
    description:
      "Craft intuitive user experiences and visually appealing interface designs for digital products.",
    category: "Design",
    difficulty: "Beginner",
    skills: [
      "Figma",
      "Adobe XD",
      "Wireframing",
      "Prototyping",
      "User Research",
      "Information Architecture"
    ]
  },

  {
    name: "Cloud Architect",
    description:
      "Design and manage scalable, secure, and robust cloud infrastructure strategies for enterprises.",
    category: "Infrastructure & Cloud",
    difficulty: "Advanced",
    skills: [
      "AWS",
      "Azure",
      "Cloud Security",
      "Enterprise Architecture",
      "Networking",
      "Terraform"
    ]
  },

  {
    name: "QA Automation Engineer",
    description:
      "Write automated test scripts to ensure the quality, reliability, and performance of software systems.",
    category: "Testing & QA",
    difficulty: "Intermediate",
    skills: [
      "Selenium",
      "Python",
      "Java",
      "Cypress",
      "Test Automation",
      "Git",
      "Jira"
    ]
  },

  {
    name: "Data Engineer",
    description:
      "Build and maintain data pipelines, architectures, and data warehouses for big data processing.",
    category: "Data Science & AI",
    difficulty: "Advanced",
    skills: [
      "SQL",
      "Python",
      "Apache Spark",
      "Hadoop",
      "ETL Pipelines",
      "Data Warehousing",
      "Airflow"
    ]
  },

  {
    name: "Machine Learning Engineer",
    description:
      "Design, implement, and deploy production-ready machine learning algorithms and AI models.",
    category: "Data Science & AI",
    difficulty: "Advanced",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Deep Learning",
      "MLOps",
      "SQL",
      "Docker"
    ]
  },

  {
    name: "Embedded Systems Engineer",
    description:
      "Develop low-level software and firmware for hardware devices, microcontrollers, and IoT systems.",
    category: "Hardware & IoT",
    difficulty: "Advanced",
    skills: [
      "C",
      "C++",
      "Microcontrollers",
      "RTOS",
      "Firmware Development",
      "IoT Protocols",
      "Git"
    ]
  },

  {
    name: "Blockchain Developer",
    description:
      "Develop decentralized applications and smart contracts using blockchain technologies.",
    category: "Web3 & Blockchain",
    difficulty: "Advanced",
    skills: [
      "Solidity",
      "Ethereum",
      "Web3.js",
      "Smart Contracts",
      "Cryptography",
      "Go",
      "Rust"
    ]
  },

  {
    name: "Database Administrator (DBA)",
    description:
      "Manage, optimize, and secure relational and non-relational database management systems.",
    category: "Database Management",
    difficulty: "Intermediate",
    skills: [
      "SQL",
      "MySQL",
      "PostgreSQL",
      "Oracle DB",
      "Database Tuning",
      "Backup & Recovery"
    ]
  },

  {
    name: "Systems Administrator",
    description:
      "Maintain, configure, and ensure the reliable operation of computer networks and server systems.",
    category: "Infrastructure & Cloud",
    difficulty: "Intermediate",
    skills: [
      "Linux",
      "Windows Server",
      "Active Directory",
      "Bash Scripting",
      "Networking",
      "Virtualization"
    ]
  },

  {
    name: "Network Engineer",
    description:
      "Design, implement, and support local and wide area networks for organizations.",
    category: "Networking",
    difficulty: "Intermediate",
    skills: [
      "Cisco Routing",
      "Switching",
      "TCP/IP",
      "Firewalls",
      "Network Architecture",
      "VPN"
    ]
  },

  {
    name: "Game Developer",
    description:
      "Code and build interactive 2D and 3D video games for PC, console, and mobile platforms.",
    category: "Game Development",
    difficulty: "Advanced",
    skills: [
      "C#",
      "C++",
      "Unity Engine",
      "Unreal Engine",
      "Game Physics",
      "3D Modeling Integration"
    ]
  },

  {
    name: "Scrum Master",
    description:
      "Facilitate agile methodologies, clear obstacles, and guide development teams toward high productivity.",
    category: "Agile & Project Management",
    difficulty: "Intermediate",
    skills: [
      "Agile Coaching",
      "Scrum Framework",
      "Jira",
      "Sprint Planning",
      "Facilitation",
      "Confluence"
    ]
  },

  {
    name: "IT Project Manager",
    description:
      "Plan, execute, and deliver IT initiatives within budget, scope, and timeline constraints.",
    category: "Agile & Project Management",
    difficulty: "Advanced",
    skills: [
      "Project Planning",
      "Risk Management",
      "Budgeting",
      "Stakeholder Communication",
      "MS Project",
      "PMP"
    ]
  },

  {
    name: "Business Analyst (IT)",
    description:
      "Bridge the gap between business needs and technology solutions by analyzing requirements and workflows.",
    category: "Business & Strategy",
    difficulty: "Intermediate",
    skills: [
      "Requirements Gathering",
      "SQL",
      "Data Analysis",
      "Process Mapping",
      "UML",
      "Jira"
    ]
  },

  {
    name: "Product Manager (Tech)",
    description:
      "Define the product vision, strategy, and roadmap based on market research and user feedback.",
    category: "Product Management",
    difficulty: "Advanced",
    skills: [
      "Product Strategy",
      "Roadmapping",
      "Market Analysis",
      "User Analytics",
      "Agile",
      "A/B Testing"
    ]
  },

  {
    name: "Technical Writer",
    description:
      "Create clear, comprehensive documentation, API guides, and tutorials for software products.",
    category: "Content & Documentation",
    difficulty: "Beginner",
    skills: [
      "Markdown",
      "API Documentation",
      "Git",
      "Technical Communication",
      "Static Site Generators"
    ]
  },

  {
    name: "Salesforce Developer",
    description:
      "Customize and develop applications on the Salesforce cloud platform to support CRM operations.",
    category: "Enterprise Systems",
    difficulty: "Intermediate",
    skills: [
      "Apex",
      "Lightning Web Components",
      "Salesforce CRM",
      "SOQL",
      "Integrations"
    ]
  },

  {
    name: "SAP Consultant",
    description:
      "Configure and optimize SAP enterprise resource planning modules for business operations.",
    category: "Enterprise Systems",
    difficulty: "Advanced",
    skills: [
      "ABAP",
      "SAP ERP",
      "Business Processes",
      "SAP HANA",
      "Configuration",
      "Data Migration"
    ]
  },

  {
    name: "Site Reliability Engineer (SRE)",
    description:
      "Apply software engineering principles to infrastructure and operations problems to build scalable systems.",
    category: "Infrastructure & Cloud",
    difficulty: "Advanced",
    skills: [
      "Python",
      "Go",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "Chaos Engineering",
      "Linux"
    ]
  },

  {
    name: "Solutions Architect",
    description:
      "Translate business requirements into scalable technology architectures and technical designs.",
    category: "Enterprise Architecture",
    difficulty: "Advanced",
    skills: [
      "System Design",
      "Cloud Computing",
      "Microservices",
      "Enterprise Integration",
      "Security Concepts"
    ]
  },

  {
    name: "Computer Vision Engineer",
    description:
      "Develop systems and algorithms that allow computers to extract information from digital images or videos.",
    category: "Data Science & AI",
    difficulty: "Advanced",
    skills: [
      "Python",
      "OpenCV",
      "Deep Learning",
      "PyTorch",
      "Image Processing",
      "CNNs"
    ]
  },

  {
    name: "NLP Engineer",
    description:
      "Build software models that understand, interpret, and manipulate human language.",
    category: "Data Science & AI",
    difficulty: "Advanced",
    skills: [
      "Python",
      "NLP",
      "Transformers",
      "BERT/GPT",
      "NLTK",
      "spaCy",
      "Text Mining"
    ]
  },

  {
    name: "Data Privacy Officer (IT Security)",
    description:
      "Ensure an organization complies with data protection laws and digital security standards.",
    category: "Cybersecurity",
    difficulty: "Intermediate",
    skills: [
      "GDPR",
      "Compliance Auditing",
      "Risk Assessment",
      "Data Governance",
      "Information Security"
    ]
  },

  {
    name: "Help Desk Support Technician",
    description:
      "Provide technical assistance, troubleshooting, and support for hardware, software, and network issues.",
    category: "IT Support & Operations",
    difficulty: "Beginner",
    skills: [
      "Hardware Troubleshooting",
      "Software Troubleshooting",
      "Networking Basics",
      "Windows",
      "Ticketing Systems",
      "Customer Support"
    ]
  }
];

const seedCareers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const careerData of careers) {
      await Career.findOneAndUpdate(
        { name: careerData.name },
        careerData,
        {
          upsert: true,
          new: true
        }
      );

      console.log(`Career added: ${careerData.name}`);
    }

    console.log("Career seeding completed");

    await mongoose.connection.close();

  } catch (error) {
    console.log("Seed Error:", error.message);
  }
};

seedCareers();