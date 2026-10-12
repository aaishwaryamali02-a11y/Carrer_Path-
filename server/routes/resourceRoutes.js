const express = require("express");
const Resource = require("../models/Resource");

const router = express.Router();

// GET - All Resources
router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find().populate("skill");

        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch resources",
            error: error.message
        });
    }
});

// POST - Create Resource
router.post("/", async (req, res) => {
    try {
        const resource = await Resource.create(req.body);

        res.status(201).json({
            message: "Resource created successfully",
            resource
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create resource",
            error: error.message
        });
    }
});

// GET - Single Resource
router.get("/:id", async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)
            .populate("skill");

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({
            message: "Invalid resource ID",
            error: error.message
        });
    }
});

// PUT - Update Resource
router.put("/:id", async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        res.status(200).json({
            message: "Resource updated successfully",
            resource
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update resource",
            error: error.message
        });
    }
});

// DELETE - Delete Resource
router.delete("/:id", async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        res.status(200).json({
            message: "Resource deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete resource",
            error: error.message
        });
    }
});

module.exports = router;
