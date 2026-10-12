const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// GET - All Projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().populate("career");

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message
        });
    }
});

// POST - Create Project
router.post("/", async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            message: "Project created successfully",
            project
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create project",
            error: error.message
        });
    }
});

// GET - Single Project
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("career");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({
            message: "Invalid project ID",
            error: error.message
        });
    }
});

// PUT - Update Project
router.put("/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update project",
            error: error.message
        });
    }
});

// DELETE - Delete Project
router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete project",
            error: error.message
        });
    }
});

module.exports = router;