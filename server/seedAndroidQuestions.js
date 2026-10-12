require("dotenv").config();

const mongoose = require("mongoose");

const Skill = require("./models/Skill");
const Question = require("./models/Question");
const Career = require("./models/Career");

const skillsData = [
    {
        name: "Java",
        category: "Android Development",
        level: "Intermediate",
        tools: ["Android Studio", "JDK"],
        importance: "High",
        description: "Java is a programming language commonly used for Android application development."
    },
    {
        name: "Kotlin",
        category: "Android Development",
        level: "Intermediate",
        tools: ["Android Studio"],
        importance: "High",
        description: "Kotlin is a modern programming language officially supported for Android development."
    },
    {
        name: "Android",
        category: "Mobile Development",
        level: "Intermediate",
        tools: ["Android Studio", "Android SDK"],
        importance: "High",
        description: "Android is a mobile operating system and development platform for building mobile applications."
    },
    {
        name: "XML",
        category: "Android Development",
        level: "Intermediate",
        tools: ["Android Studio"],
        importance: "High",
        description: "XML is commonly used to define Android user interface layouts."
    },
    {
        name: "Android Studio",
        category: "Development Tools",
        level: "Beginner",
        tools: ["Android Studio", "Android SDK"],
        importance: "High",
        description: "Android Studio is the official IDE for Android application development."
    },
    {
        name: "REST API",
        category: "Backend Integration",
        level: "Intermediate",
        tools: ["Postman", "Retrofit"],
        importance: "High",
        description: "REST APIs allow Android applications to communicate with backend services."
    },
    {
        name: "Firebase",
        category: "Backend Services",
        level: "Intermediate",
        tools: ["Firebase Console", "Android Studio"],
        importance: "High",
        description: "Firebase provides services such as authentication, database, storage and notifications."
    },
    {
        name: "Git",
        category: "Version Control",
        level: "Beginner",
        tools: ["Git", "GitHub"],
        importance: "High",
        description: "Git is used to track source-code changes and collaborate on Android projects."
    }
];

const questionsData = [

    // ================= JAVA =================

    {
        question: "What is Java?",
        answer: "Java is an object-oriented programming language widely used for software and Android application development.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "What are the main features of Java?",
        answer: "Important features include object-oriented programming, platform independence, security, robustness, multithreading and automatic memory management.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "What is OOP?",
        answer: "OOP stands for Object-Oriented Programming. It organizes software using objects and classes. Its main concepts include encapsulation, inheritance, polymorphism and abstraction.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "What is the difference between == and equals() in Java?",
        answer: "The == operator generally compares primitive values or object references, while equals() is used to compare object content when the class implements it appropriately.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Java"
    },
    {
        question: "What is inheritance in Java?",
        answer: "Inheritance allows one class to acquire properties and methods of another class using the extends keyword.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "What is an interface in Java?",
        answer: "An interface defines a contract that a class can implement. It is commonly used to achieve abstraction and support multiple type inheritance.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Java"
    },
    {
        question: "Write Java code to check whether a number is even or odd.",
        answer: "Example: int num = 10; if (num % 2 == 0) { System.out.println(\"Even\"); } else { System.out.println(\"Odd\"); }",
        type: "Coding",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "Write Java code to find the largest number in an array.",
        answer: "Example: int[] arr = {10, 25, 5, 40}; int max = arr[0]; for (int i = 1; i < arr.length; i++) { if (arr[i] > max) max = arr[i]; } System.out.println(max);",
        type: "Coding",
        difficulty: "Easy",
        skill: "Java"
    },

    // ================= KOTLIN =================

    {
        question: "What is Kotlin?",
        answer: "Kotlin is a modern, concise programming language officially supported by Google for Android development.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Kotlin"
    },
    {
        question: "Why is Kotlin used for Android development?",
        answer: "Kotlin provides concise syntax, null-safety, extension functions, coroutines and good interoperability with Java.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Kotlin"
    },
    {
        question: "What is the difference between val and var in Kotlin?",
        answer: "val is used for a read-only reference, while var allows reassignment.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Kotlin"
    },
    {
        question: "What is null safety in Kotlin?",
        answer: "Kotlin provides features that help prevent null pointer exceptions by distinguishing nullable and non-nullable types.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Kotlin"
    },

    // ================= ANDROID =================

    {
        question: "What is Android?",
        answer: "Android is a mobile operating system and development platform used to build applications for smartphones, tablets, TVs and other devices.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "What is an Activity in Android?",
        answer: "An Activity represents a single screen or user interaction point in an Android application.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "What is the Android Activity lifecycle?",
        answer: "The main lifecycle methods include onCreate(), onStart(), onResume(), onPause(), onStop() and onDestroy().",
        type: "Technical",
        difficulty: "Medium",
        skill: "Android"
    },
    {
        question: "What is an Intent in Android?",
        answer: "An Intent is a messaging object used to request an action from another Android component, such as starting another Activity or sharing data.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "What is the difference between explicit and implicit Intent?",
        answer: "An explicit Intent identifies a specific component, while an implicit Intent describes an action that another suitable application or component can handle.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Android"
    },
    {
        question: "What is a Fragment?",
        answer: "A Fragment is a reusable portion of a user interface that operates within an Activity.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "What is an APK?",
        answer: "APK stands for Android Package Kit. It is the package file format used to distribute and install Android applications.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "What is AndroidManifest.xml?",
        answer: "AndroidManifest.xml contains important information about the application, including components, permissions, package information and configuration.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android"
    },

    // ================= XML =================

    {
        question: "Why is XML used in Android?",
        answer: "XML is commonly used to define the layout and visual structure of Android user interfaces.",
        type: "Technical",
        difficulty: "Easy",
        skill: "XML"
    },
    {
        question: "What is a LinearLayout?",
        answer: "LinearLayout arranges child views in a single direction, either vertically or horizontally.",
        type: "Technical",
        difficulty: "Easy",
        skill: "XML"
    },
    {
        question: "What is ConstraintLayout?",
        answer: "ConstraintLayout allows developers to create flexible layouts by defining relationships or constraints between views.",
        type: "Technical",
        difficulty: "Medium",
        skill: "XML"
    },
    {
        question: "What is the difference between match_parent and wrap_content?",
        answer: "match_parent makes a view occupy the available space of its parent, while wrap_content makes the view large enough to contain its content.",
        type: "Technical",
        difficulty: "Easy",
        skill: "XML"
    },

    // ================= ANDROID STUDIO =================

    {
        question: "What is Android Studio?",
        answer: "Android Studio is the official Integrated Development Environment used to develop, test and debug Android applications.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android Studio"
    },
    {
        question: "What is Gradle in Android?",
        answer: "Gradle is the build automation system used by Android projects to manage dependencies, compile code and generate application builds.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Android Studio"
    },
    {
        question: "What is an Emulator?",
        answer: "An emulator is a virtual Android device used to run and test applications without requiring a physical device.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Android Studio"
    },

    // ================= API =================

    {
        question: "How does an Android application communicate with a backend?",
        answer: "An Android application can communicate with a backend using HTTP or HTTPS APIs, commonly using libraries such as Retrofit or OkHttp.",
        type: "Technical",
        difficulty: "Easy",
        skill: "REST API"
    },
    {
        question: "What is Retrofit?",
        answer: "Retrofit is a popular Android HTTP client library used to communicate with REST APIs.",
        type: "Technical",
        difficulty: "Easy",
        skill: "REST API"
    },
    {
        question: "What are GET and POST requests?",
        answer: "GET is generally used to retrieve data, while POST is generally used to send or create data on the server.",
        type: "Technical",
        difficulty: "Easy",
        skill: "REST API"
    },

    // ================= FIREBASE =================

    {
        question: "What is Firebase?",
        answer: "Firebase is a Google platform that provides services such as authentication, databases, cloud storage, analytics and notifications.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Firebase"
    },
    {
        question: "What is Firebase Authentication?",
        answer: "Firebase Authentication provides ready-made authentication services such as email/password, Google and other sign-in methods.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Firebase"
    },
    {
        question: "What is Firebase Cloud Messaging?",
        answer: "Firebase Cloud Messaging, or FCM, is used to send notifications and messages to Android devices.",
        type: "Technical",
        difficulty: "Medium",
        skill: "Firebase"
    },

    // ================= GIT =================

    {
        question: "Why is Git used in Android projects?",
        answer: "Git tracks source-code changes, supports collaboration and allows developers to manage different versions of an Android project.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Git"
    },
    {
        question: "What is the difference between git pull and git push?",
        answer: "git push uploads local commits to a remote repository, while git pull downloads and integrates changes from the remote repository.",
        type: "Technical",
        difficulty: "Easy",
        skill: "Git"
    },

    // ================= CODING =================

    {
        question: "Write a program to reverse a string.",
        answer: "Example in Java: String str = \"hello\"; String rev = new StringBuilder(str).reverse().toString(); System.out.println(rev);",
        type: "Coding",
        difficulty: "Easy",
        skill: "Java"
    },
    {
        question: "Write a program to check whether a number is prime.",
        answer: "Example: int num = 7; boolean prime = true; for (int i = 2; i < num; i++) { if (num % i == 0) { prime = false; break; } } System.out.println(prime);",
        type: "Coding",
        difficulty: "Medium",
        skill: "Java"
    },
    {
        question: "Write Kotlin code to print numbers from 1 to 10.",
        answer: "Example: for (i in 1..10) { println(i) }",
        type: "Coding",
        difficulty: "Easy",
        skill: "Kotlin"
    },

    // ================= HR =================

    {
        question: "Tell me about yourself.",
        answer: "I am a BCA graduate interested in Android development. I have been learning programming concepts, mobile application development and API integration. I enjoy building applications and solving technical problems.",
        type: "HR",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "Why do you want to become an Android Developer?",
        answer: "I am interested in mobile applications and enjoy creating applications that users can interact with directly. Android also provides a large ecosystem for application development.",
        type: "HR",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "Why should we hire you as a fresher?",
        answer: "I have a strong willingness to learn, good programming fundamentals and an interest in Android development. I am ready to learn new technologies and contribute to the team.",
        type: "HR",
        difficulty: "Easy",
        skill: "Android"
    },
    {
        question: "How do you debug an Android application?",
        answer: "I first reproduce the issue, check Logcat and error messages, identify the problematic code and then test the fix. I also use the Android Studio debugger when required.",
        type: "HR",
        difficulty: "Medium",
        skill: "Android Studio"
    }
];

async function seedAndroidQuestions() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const androidCareer = await Career.findOne({
            name: "Android Developer"
        });

        if (!androidCareer) {
            throw new Error(
                "Android Developer career not found. Please add Android Developer career first."
            );
        }

        console.log(
            "Career found:",
            androidCareer.name
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
                career: androidCareer._id
            });
        }

        // Delete only old Android questions
        await Question.deleteMany({
            career: androidCareer._id
        });

        // Insert Android questions
        await Question.insertMany(finalQuestions);

        // Update Android career skills
        androidCareer.skills = [
            "Java",
            "Kotlin",
            "Android",
            "XML",
            "Android Studio",
            "REST API",
            "Firebase",
            "Git"
        ];

        await androidCareer.save();

        console.log(
            `${finalQuestions.length} Android questions inserted successfully`
        );

        console.log(
            "Android Career ID:",
            androidCareer._id.toString()
        );

        await mongoose.connection.close();

        console.log("Database connection closed");

    } catch (error) {
        console.log(
            "Android Seed Error:",
            error.message
        );
    }
}

seedAndroidQuestions();