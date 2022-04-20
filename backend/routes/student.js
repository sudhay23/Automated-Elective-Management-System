const router = require("express").Router();
const mongoose = require("mongoose");
const Course = require("../model/courseSchema");
const verifyToken = require("./middleware/verifyToken");

// Get List of Courses
router.get("/courses", verifyToken, async (req, res) => {
    if (req.user.role == "student") {
        const allCourses = await Course.find();
        res.send(allCourses);
    } else {
        res.status(403).send("You are not authorized to do this");
    }
});

// Freeze Round One preferences
router.post("/freeze/roundone", verifyToken, async (req, res) => {
    console.log(req.body);
});

module.exports = router;
