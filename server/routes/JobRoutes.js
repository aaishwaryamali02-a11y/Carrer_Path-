const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// GET - All Jobs with Filters
router.get("/", async (req, res) => {
    try {
        const {
            search,
            location,
            experienceLevel,
            employmentType,
            skill,
            company
        } = req.query;

        const filter = {};

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        if (location) {
            filter.location = location;
        }

        if (experienceLevel) {
            filter.experienceLevel = experienceLevel;
        }

        if (employmentType) {
            filter.employmentType = employmentType;
        }

        if (skill) {
            filter.requiredSkills = {
                $regex: skill,
                $options: "i"
            };
        }

        if (company) {
            filter.company = company;
        }

        const jobs = await Job.find(filter)
            .populate("company")
            .sort({ postedDate: -1 });

        res.json(jobs);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch jobs",
            error: error.message
        });
    }
});

// POST - Create Job
router.post("/", async (req, res) => {
    try {
        const job = await Job.create(req.body);

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to create job",
            error: error.message
        });
    }
});


// GET - Single Job
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("company");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json(job);

    } catch (error) {
        res.status(400).json({
            message: "Invalid job ID",
            error: error.message
        });
    }
});


// PUT - Update Job
router.put("/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update job",
            error: error.message
        });
    }
});


// DELETE - Delete Job
router.delete("/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to delete job",
            error: error.message
        });
    }
});


module.exports = router;