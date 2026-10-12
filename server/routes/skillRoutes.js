const express = require("express");
const Skill = require("../models/Skill");

const router = express.Router();

// GET - All Skills
router.get("/", async (req, res) => {
    try {
        const skills = await Skill.find();

        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch skills",
            error: error.message
        });
    }
});

// POST - Create Skill
router.post("/", async (req, res) => {
    try {
        const skill = await Skill.create(req.body);

        res.status(201).json({
            message: "Skill created successfully",
            skill
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create skill",
            error: error.message
        });
    }
});

// GET - Single Skill
router.get("/:id", async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({
            message: "Invalid skill ID",
            error: error.message
        });
    }
});

// PUT - Update Skill
router.put("/:id", async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        res.status(200).json({
            message: "Skill updated successfully",
            skill
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update skill",
            error: error.message
        });
    }
});

// DELETE - Delete Skill
router.delete("/:id", async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        res.status(200).json({
            message: "Skill deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to delete skill",
            error: error.message
        });
    }
});

module.exports = router;