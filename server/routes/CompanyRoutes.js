const express = require("express");
const Company = require("../models/Company");

const router = express.Router();

// GET - All Companies
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find();

        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch companies",
            error: error.message
        });
    }
});

// POST - Create Company
router.post("/", async (req, res) => {
    try {
        const company = await Company.create(req.body);

        res.status(201).json({
            message: "Company created successfully",
            company
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create company",
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const { search, experienceLevel, role } = req.query;

        const filter = {};

        // Search by company name
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by experience level
        if (experienceLevel) {
            filter.experienceLevel = experienceLevel;
        }

        // Filter by role
        if (role) {
            filter.roles = {
                $regex: role,
                $options: "i"
            };
        }

        const companies = await Company.find(filter);

        res.status(200).json({
            count: companies.length,
            companies
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch companies",
            error: error.message
        });
    }
});

// PUT - Update Company
router.put("/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company updated successfully",
            company
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update company",
            error: error.message
        });
    }
});

// DELETE - Delete Company
router.delete("/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete company",
            error: error.message
        });
    }
});

module.exports = router;