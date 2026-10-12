const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Career = require("./models/Career");
const Question = require("./models/Question");
const Skill = require("./models/Skill");

const seedCybersecurityQuestions = async () => {
    try {
        await connectDB();

        const cyberCareer = await Career.findOne({
            name: "Cybersecurity Analyst"
        });

        if (!cyberCareer) {
            console.log("Cybersecurity Analyst career not found");
            process.exit(1);
        }

        const skillNames = [
            "Cybersecurity Fundamentals",
            "Networking",
            "Linux",
            "OWASP",
            "Ethical Hacking",
            "SIEM",
            "Incident Response",
            "Cryptography",
            "SQL",
            "Git"
        ];

        const skillIds = {};

        for (const name of skillNames) {
            const skill = await Skill.findOneAndUpdate(
                { name },
                {
                    name,
                    category: "Cybersecurity",
                    level: "Beginner",
                    tools: [],
                    importance: "High",
                    description: `${name} skills required for a Cybersecurity Analyst.`
                },
                {
                    upsert: true,
                    new: true
                }
            );

            skillIds[name] = skill._id;
        }

        cyberCareer.skills = skillNames;
        await cyberCareer.save();

        // Delete only old Cybersecurity questions
        await Question.deleteMany({
            career: cyberCareer._id
        });

        const questions = [
            // Cybersecurity Fundamentals
            {
                question: "What is cybersecurity?",
                answer: "Cybersecurity is the practice of protecting systems, networks, applications and data from unauthorized access, attacks and damage.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "What are the CIA triad principles?",
                answer: "CIA stands for Confidentiality, Integrity and Availability. These are the three fundamental goals of information security.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "What is authentication?",
                answer: "Authentication verifies the identity of a user or system before allowing access.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "What is authorization?",
                answer: "Authorization determines what an authenticated user is allowed to access or perform.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "What is the difference between authentication and authorization?",
                answer: "Authentication verifies who the user is, while authorization determines what the user is allowed to access.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "What is malware?",
                answer: "Malware is malicious software designed to damage systems, steal information or perform unauthorized activities.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },

            // Networking
            {
                question: "What is an IP address?",
                answer: "An IP address is a logical address used to identify a device on a network.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Networking"]
            },
            {
                question: "What is the difference between TCP and UDP?",
                answer: "TCP is connection-oriented and provides reliable delivery, while UDP is connectionless and generally provides faster but less reliable communication.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["Networking"]
            },
            {
                question: "What is a firewall?",
                answer: "A firewall monitors and controls network traffic based on predefined security rules.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Networking"]
            },
            {
                question: "What is DNS?",
                answer: "DNS translates domain names such as example.com into IP addresses.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Networking"]
            },
            {
                question: "What is HTTPS?",
                answer: "HTTPS is HTTP protected using TLS encryption, helping provide confidentiality and integrity for data exchanged between client and server.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Networking"]
            },
            {
                question: "What is a VPN?",
                answer: "A VPN creates an encrypted connection between a device and a network or service, helping protect network traffic.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Networking"]
            },

            // Linux
            {
                question: "What is Linux?",
                answer: "Linux is an open-source operating system widely used in servers, cloud environments and cybersecurity.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Linux"]
            },
            {
                question: "What is the purpose of the pwd command?",
                answer: "The pwd command displays the current working directory.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Linux"]
            },
            {
                question: "What is the purpose of the ls command?",
                answer: "The ls command lists files and directories in the current directory.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Linux"]
            },
            {
                question: "What is chmod used for?",
                answer: "chmod is used to change file and directory permissions in Linux.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Linux"]
            },
            {
                question: "What is the difference between a file and a directory in Linux?",
                answer: "A file stores data, while a directory is used to organize files and other directories.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Linux"]
            },

            // OWASP
            {
                question: "What is OWASP?",
                answer: "OWASP is an organization that provides resources and guidance for improving application security.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["OWASP"]
            },
            {
                question: "What is SQL Injection?",
                answer: "SQL Injection is a vulnerability where untrusted input can interfere with SQL queries. Parameterized queries and proper input handling help prevent it.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["OWASP"]
            },
            {
                question: "What is Cross-Site Scripting (XSS)?",
                answer: "XSS is a web security vulnerability where untrusted script content can be executed in a user's browser.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["OWASP"]
            },
            {
                question: "What is CSRF?",
                answer: "CSRF is a vulnerability where a user's authenticated browser is tricked into sending an unwanted request to a web application.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["OWASP"]
            },
            {
                question: "How can SQL Injection be prevented?",
                answer: "Use parameterized queries or prepared statements, validate input and apply proper database access controls.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["OWASP"]
            },

            // Ethical Hacking
            {
                question: "What is ethical hacking?",
                answer: "Ethical hacking is authorized security testing performed to identify and help fix security weaknesses.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Ethical Hacking"]
            },
            {
                question: "What is vulnerability assessment?",
                answer: "Vulnerability assessment is the process of identifying, analyzing and prioritizing security weaknesses in systems.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Ethical Hacking"]
            },
            {
                question: "What is penetration testing?",
                answer: "Penetration testing is an authorized security assessment that evaluates whether identified weaknesses can be exploited.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["Ethical Hacking"]
            },
            {
                question: "What is the difference between vulnerability assessment and penetration testing?",
                answer: "Vulnerability assessment focuses on identifying and prioritizing weaknesses, while penetration testing goes further by safely validating whether weaknesses can be exploited.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["Ethical Hacking"]
            },

            // SIEM
            {
                question: "What is SIEM?",
                answer: "SIEM stands for Security Information and Event Management. It collects and analyzes security logs and events from different sources.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["SIEM"]
            },
            {
                question: "Why is SIEM used?",
                answer: "SIEM helps security teams centralize logs, detect suspicious activity, investigate incidents and generate security alerts.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["SIEM"]
            },
            {
                question: "What is a security alert?",
                answer: "A security alert is a notification generated when a system detects activity that may require investigation.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["SIEM"]
            },
            {
                question: "What is log monitoring?",
                answer: "Log monitoring involves collecting and reviewing system and application logs to identify unusual or security-related events.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["SIEM"]
            },

            // Incident Response
            {
                question: "What is incident response?",
                answer: "Incident response is the organized process of detecting, analyzing, containing and recovering from security incidents.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Incident Response"]
            },
            {
                question: "What is a security incident?",
                answer: "A security incident is an event that may compromise the confidentiality, integrity or availability of systems or data.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Incident Response"]
            },
            {
                question: "What is incident containment?",
                answer: "Containment is the process of limiting the impact and spread of a security incident.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["Incident Response"]
            },
            {
                question: "What should a security analyst do after detecting a suspicious event?",
                answer: "The analyst should validate the alert, gather relevant evidence, assess the impact, follow the incident response process and escalate when required.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["Incident Response"]
            },

            // Cryptography
            {
                question: "What is encryption?",
                answer: "Encryption converts readable data into an encoded form so that unauthorized users cannot easily understand it.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cryptography"]
            },
            {
                question: "What is hashing?",
                answer: "Hashing converts data into a fixed-length value using a hash function. It is commonly used for integrity checks and password storage.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cryptography"]
            },
            {
                question: "What is the difference between encryption and hashing?",
                answer: "Encryption is reversible using the appropriate key, while hashing is designed as a one-way transformation.",
                type: "Technical",
                difficulty: "Medium",
                skill: skillIds["Cryptography"]
            },
            {
                question: "What is symmetric encryption?",
                answer: "Symmetric encryption uses the same secret key for encryption and decryption.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cryptography"]
            },
            {
                question: "What is asymmetric encryption?",
                answer: "Asymmetric encryption uses a pair of keys: a public key and a private key.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Cryptography"]
            },

            // SQL
            {
                question: "Why is SQL useful for a cybersecurity analyst?",
                answer: "SQL helps analysts query security-related data, investigate records and identify suspicious patterns in databases.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["SQL"]
            },
            {
                question: "Write a SQL query to select all records from a users table.",
                answer: "SELECT * FROM users;",
                type: "Coding",
                difficulty: "Easy",
                skill: skillIds["SQL"]
            },
            {
                question: "What is a SQL JOIN?",
                answer: "A JOIN combines related data from two or more tables using a related column.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["SQL"]
            },
            {
                question: "What is the purpose of the WHERE clause in SQL?",
                answer: "The WHERE clause filters records based on a specified condition.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["SQL"]
            },

            // Git
            {
                question: "What is Git?",
                answer: "Git is a distributed version control system used to track changes in source code and collaborate with other developers.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Git"]
            },
            {
                question: "What is git clone?",
                answer: "git clone creates a local copy of a remote Git repository.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Git"]
            },
            {
                question: "What is git pull?",
                answer: "git pull fetches changes from a remote repository and integrates them into the current local branch.",
                type: "Technical",
                difficulty: "Easy",
                skill: skillIds["Git"]
            },

            // HR
            {
                question: "Tell me about yourself.",
                answer: "I recently completed my BCA and I have a strong interest in technology and cybersecurity. I have learned programming, databases, web technologies and security fundamentals. I am looking for an opportunity where I can apply my technical knowledge and continue learning as a Cybersecurity Analyst.",
                type: "HR",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "Why do you want to work in cybersecurity?",
                answer: "I am interested in cybersecurity because it combines technology, problem solving and continuous learning. I want to understand security risks and contribute to protecting systems and data.",
                type: "HR",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "Why should we hire you as a fresher?",
                answer: "As a fresher, I bring a strong willingness to learn, basic technical knowledge and a responsible approach to solving problems. I am ready to learn the organization's security processes and contribute to the team.",
                type: "HR",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "How do you keep yourself updated about cybersecurity?",
                answer: "I follow security documentation, trusted technical resources, security advisories and practical learning platforms. I also revise fundamentals regularly and practice concepts in safe learning environments.",
                type: "HR",
                difficulty: "Easy",
                skill: skillIds["Cybersecurity Fundamentals"]
            },
            {
                question: "What would you do if you received a suspicious security alert?",
                answer: "I would verify the alert, collect relevant information, assess its severity and follow the organization's incident response procedure. I would escalate it when required rather than taking unauthorized actions.",
                type: "HR",
                difficulty: "Medium",
                skill: skillIds["Incident Response"]
            }
        ];

        const finalQuestions = questions.map((item) => ({
            ...item,
            career: cyberCareer._id
        }));

        await Question.insertMany(finalQuestions);

        console.log(
            `${finalQuestions.length} Cybersecurity questions inserted successfully`
        );

        console.log(
            "Cybersecurity Career ID:",
            cyberCareer._id.toString()
        );

        await mongoose.connection.close();

        console.log("Database connection closed");

    } catch (error) {
        console.error(
            "Cybersecurity seed error:",
            error.message
        );

        process.exit(1);
    }
};

seedCybersecurityQuestions();