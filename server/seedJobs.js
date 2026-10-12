const mongoose = require("mongoose");
require("dotenv").config();

const Company = require("./models/Company");
const Job = require("./models/Job");

const testSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const company = await Company.findOneAndUpdate(
      { name: "Infosys" },
      {
        name: "Infosys",
        description: "IT services and consulting company.",
        hiringMonths: ["January", "June", "September"],
        eligibleDegrees: ["BCA", "BSc", "BTech", "MCA"],
        experienceLevel: "Fresher",
        roles: ["Software Engineer", "System Engineer"],
        selectionProcess: [
          "Application",
          "Assessment",
          "Technical Interview",
          "HR Interview"
        ],
        requiredSkills: [
          "JavaScript",
          "Java",
          "SQL",
          "Problem Solving"
        ],
        officialCareerUrl: "https://www.infosys.com/careers/"
      },
      { upsert: true, new: true }
    );

    console.log("Company created:", company.name);

    const job = await Job.create({
      title: "Associate Software Engineer",
      company: company._id,
      location: "Pune",
      employmentType: "Full-time",
      experienceLevel: "Fresher",
      eligibleDegrees: ["BCA", "BSc", "BTech", "MCA"],
      requiredSkills: [
        "JavaScript",
        "SQL",
        "Problem Solving"
      ],
      salary: "₹3 - ₹6 LPA",
      applicationUrl: "https://www.infosys.com/careers/",
      source: "Demo / Seed Data",
      isActive: true
    });

    console.log("Job created:", job.title);

    await mongoose.connection.close();

    console.log("Seed completed successfully");

  } catch (error) {
    console.log("Seed Error:");
    console.log(error);
  }
};

testSeed();