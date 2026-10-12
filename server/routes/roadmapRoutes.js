const express = require("express");
const Roadmap = require("../models/Roadmap");

const router = express.Router();

// GET - All Roadmaps
router.get("/", async (req, res) => {
    try {
        const { career } = req.query;

        const filter = {};

        if (career) {
            filter.career = career;
        }

        const roadmaps = await Roadmap.find(filter)
            .populate("career")
            .sort({ createdAt: 1 });

        res.json(roadmaps);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch roadmaps",
            error: error.message
        });
    }
});

// POST - Create Roadmap
router.post("/", async (req, res) => {
    try {
        const roadmap = await Roadmap.create(req.body);

        res.status(201).json({
            message: "Roadmap created successfully",
            roadmap
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create roadmap",
            error: error.message
        });
    }
});

// PUT - Update Roadmap
router.put("/:id", async (req, res) => {
    try {
        const roadmap = await Roadmap.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!roadmap) {
            return res.status(404).json({
                message: "Roadmap not found"
            });
        }

        res.status(200).json({
            message: "Roadmap updated successfully",
            roadmap
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update roadmap",
            error: error.message
        });
    }
});

module.exports = router;