const router = require("express").Router();
const mongoose = require("mongoose");
const Course = require("../model/courseSchema");
const verifyToken = require("./middleware/verifyToken");

// Get List of Courses
router.get("/courses", verifyToken, async (req, res) => {
    const allCourses = await Course.find();
    console.log(allCourses);
});

module.exports = router;
