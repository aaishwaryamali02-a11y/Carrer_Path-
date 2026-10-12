const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
    autoIndex: false
});

console.log("Connected DB:", mongoose.connection.name);

await User.collection.dropIndex("username_1");
console.log("Old username index removed");

const indexes = await User.collection.indexes();
console.log("User indexes:", indexes);
        
        
        const email = "admin@careerpath.com";
        const password = "Admin@123456";

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name: "CareerPath Admin",
            email,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully");
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);

        process.exit();

    } catch (error) {
        console.log("Failed to create admin:", error.message);
        process.exit(1);
    }
};

createAdmin();