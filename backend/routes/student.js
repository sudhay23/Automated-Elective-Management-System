const router = require("express").Router();
const mongoose = require("mongoose");
const Course = require("../model/courseSchema");
const User = require("../model/userRegistrationSchema");
const RoundOnePrefs = require("../model/roundOnePrefs");
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

router.get("/status/roundone/:userId", verifyToken, async (req, res) => {
    const userId = req.params.userId;

    //Check if this user already freezed or is done with Round 1
    User.findById(userId)
        .then((data) => {
            if (data.roundOneStatus !== "PENDING") {
                res.status(403).json({ roundOneAllowed: false });
            } else {
                res.json({ roundOneAllowed: true });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Server Error Occurred");
        });
});

// Freeze Round One preferences
router.post("/freeze/roundone", verifyToken, async (req, res) => {
    const freezeData = req.body;

    // Save user preferences
    const newRoundOnePrefs = new RoundOnePrefs({
        studentEmail: freezeData.studentObj.email,
        userId: freezeData.studentObj.user,
        coursePreferences: freezeData.coursePrefIds,
    });

    newRoundOnePrefs
        .save()
        .then((roundOneFreezeData) => {
            // Update user object for RoundOneStatus
            return User.findByIdAndUpdate(roundOneFreezeData.userId, {
                roundOneStatus: "FREEZED",
            });
        })
        .then((freezeUpdate) => {
            // Return success message
            res.send("Successfully freezed choices for Round 1");
        })
        .catch((err) => {
            console.error(error);
            res.status(500).send("Server Error Occurred");
        });
});

module.exports = router;
