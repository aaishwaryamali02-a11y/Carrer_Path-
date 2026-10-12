const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// POST - Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});

// POST - Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
});

// PUT - Select Career
router.put("/select-career", protect, async (req, res) => {
    try {
        const { careerId } = req.body;

        if (!careerId) {
            return res.status(400).json({
                message: "Career ID is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                selectedCareer: careerId
            },
            {
                new: true
            }
        ).populate("selectedCareer");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Career selected successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                selectedCareer: user.selectedCareer
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to select career",
            error: error.message
        });
    }
});

// PUT - Update Progress
router.put("/progress", protect, async (req, res) => {
    try {
        const {
            skills,
            interview,
            resources,
            projects
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (skills !== undefined) {
            user.progress.skills = skills;
        }

        if (interview !== undefined) {
            user.progress.interview = interview;
        }

        if (resources !== undefined) {
            user.progress.resources = resources;
        }

        if (projects !== undefined) {
            user.progress.projects = projects;
        }

        await user.save();

        res.status(200).json({
            message: "Progress updated successfully",
            progress: user.progress
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update progress",
            error: error.message
        });
    }
});

// PUT - Mark Question Complete / Incomplete
router.put(
    "/questions/:questionId",
    protect,
    async (req, res) => {
        try {
            const { questionId } = req.params;

            const user = await User.findById(
                req.user.id
            );

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const questionExists =
                user.completedQuestions.includes(
                    questionId
                );

            if (questionExists) {
                // Remove question
                user.completedQuestions =
                    user.completedQuestions.filter(
                        (id) =>
                            id.toString() !==
                            questionId
                    );
            } else {
                // Add question
                user.completedQuestions.push(
                    questionId
                );
            }

            await user.save();

            res.status(200).json({
                message:
                    "Question progress updated",
                completedQuestions:
                    user.completedQuestions
            });

        } catch (error) {
            res.status(500).json({
                message:
                    "Failed to update question progress",
                error: error.message
            });
        }
    }
);


// GET - Protected Profile
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Protected profile accessed successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile",
            error: error.message
        });
    }
});

router.get("/admin-test", protect, adminOnly, (req, res) => {
    res.status(200).json({
        message: "Welcome Admin! You have admin access."
    });
});

module.exports = router;