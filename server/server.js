const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const careerRoutes = require("./routes/careerRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const skillRoutes = require("./routes/skillRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const questionRoutes = require("./routes/questionRoutes");
const companyRoutes = require("./routes/CompanyRoutes");
const jobRoutes = require("./routes/JobRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();


app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/careers", careerRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "CareerPath API is running successfully"
    });
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});