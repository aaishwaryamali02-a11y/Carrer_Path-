const express = require("express");
const Question = require("../models/Question");

const router = express.Router();


// GET - Questions with Filters and Pagination
router.get("/", async (req, res) => {
    try {

        const {
            type,
            difficulty,
            skill,
            career,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (type) {
            filter.type = type;
        }

        if (difficulty) {
            filter.difficulty = difficulty;
        }

        if (skill) {
            filter.skill = skill;
        }

        if (career) {
            filter.career = career;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const questions = await Question.find(filter)
            .populate("skill")
            .populate("career")
            .skip(skip)
            .limit(Number(limit));

        const totalQuestions = await Question.countDocuments(filter);

        res.status(200).json({
            totalQuestions,
            currentPage: Number(page),
            totalPages: Math.ceil(
                totalQuestions / Number(limit)
            ),
            questions
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch questions",
            error: error.message
        });

    }
});


// POST - Create Question
router.post("/", async (req, res) => {
    try {

        const question = await Question.create(req.body);

        res.status(201).json({
            message: "Question created successfully",
            question
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to create question",
            error: error.message
        });

    }
});


// PUT - Update Question
router.put("/:id", async (req, res) => {
    try {

        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        res.status(200).json({
            message: "Question updated successfully",
            question
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update question",
            error: error.message
        });

    }
});


// DELETE - Delete Question
router.delete("/:id", async (req, res) => {
    try {

        const question = await Question.findByIdAndDelete(
            req.params.id
        );

        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        res.status(200).json({
            message: "Question deleted successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to delete question",
            error: error.message
        });

    }
});


module.exports = router;