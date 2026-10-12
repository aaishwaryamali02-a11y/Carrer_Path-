const express = require("express");
const Career = require("../models/Career");

const router = express.Router();

// GET - All Careers
router.get("/", async (req, res) => {
    try {
        const careers = await Career.find();
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch careers",
            error: error.message
        });
    }
});


// POST - Create Career
router.post("/", async (req, res) => {
    try {
        const career = await Career.create(req.body);

        res.status(201).json({
            message: "Career created successfully",
            career
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create career",
            error: error.message
        });
    }
});


// GET - Single Career
router.get("/:id", async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({
                message: "Career not found"
            });
        }

        res.status(200).json(career);
    } catch (error) {
        res.status(400).json({
            message: "Invalid career ID",
            error: error.message
        });
    }
});


// PUT - Update Career
router.put("/:id", async (req, res) => {
    try {
        const career = await Career.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!career) {
            return res.status(404).json({
                message: "Career not found"
            });
        }

        res.status(200).json({
            message: "Career updated successfully",
            career
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update career",
            error: error.message
        });
    }
});


// DELETE - Delete Career
router.delete("/:id", async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);

        if (!career) {
            return res.status(404).json({
                message: "Career not found"
            });
        }

        res.status(200).json({
            message: "Career deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete career",
            error: error.message
        });
    }
});


module.exports = router;