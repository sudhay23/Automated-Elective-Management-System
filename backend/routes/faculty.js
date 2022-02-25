const router = require("express").Router();
const mongoose = require("mongoose");
const Course = require("../model/courseSchema");
const verifyToken = require("./middleware/verifyToken");

// Get List of Courses
router.get("/courses", verifyToken, async (req, res) => {
    if (req.user.role == "faculty") {
        const allCourses = await Course.find();
        res.send(allCourses);
    } else {
        res.status(403).send("You are not authorized to do this");
    }
});

// Add Course
router.post("/courses", verifyToken, async (req, res) => {
    if (req.user.role == "faculty") {
        const newCourse = new Course({
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            department: req.body.department,
            addedBy: req.body.addedBy,
            addedOn: req.body.addedOn,
            minCap: req.body.minCap,
            maxCap: req.body.maxCap,
            credits: req.body.credits,
            preRequisites: req.body.preRequisites,
        });

        try {
            const savedCourse = await newCourse.save();
            res.send(savedCourse);
        } catch (error) {
            res.status(400).send("Error Occurred");
        }
    } else {
        res.status(403).send("You are not authorized to do this");
    }
});

module.exports = router;
