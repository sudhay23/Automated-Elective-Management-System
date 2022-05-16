const router = require("express").Router();
const mongoose = require("mongoose");
const Course = require("../model/courseSchema");
const verifyToken = require("./middleware/verifyToken");
const SystemStatusSchema = require("../model/systemStatusSchema");

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
      minCGPA: req.body.minCGPA,
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

// Delete course
router.delete("/course/:id", verifyToken, async (req, res) => {
  if (req.user.role === "faculty") {
    try {
      const deleteStatus = await Course.findByIdAndDelete(req.params.id);
      res.send(`Successfully deleted the course with ID ${deleteStatus._id}`);
    } catch (error) {
      res.status(500).send("An error occurred in deleting the course");
    }
  } else {
    res.status(403).send("You are not authorized to do this");
  }
});

// Update Course
router.put("/course/:id", verifyToken, async (req, res) => {
  if (req.user.role === "faculty") {
    try {
      const updateStatus = await Course.findByIdAndUpdate(
        req.params.id,
        req.body.updatedCourse
      );
      res.send(`Successfully updated the course with ID ${updateStatus._id}`);
    } catch (error) {
      res.status(500).send("An error occurred in updating the course");
    }
  } else {
    res.status(403).send("You are not authorized to do this");
  }
});

//update system status
router.put("/roundone/status", verifyToken, async (req, res) => {
  if (req.user.role === "faculty") {
    try {
      const updateStatus = await SystemStatusSchema.findByIdAndUpdate(
        "628207fb3f68930477de3391",
        {
          roundOneActive: req.body.roundOneActive,
        }
      );
      res.send({ roundOneActive: req.body.roundOneActive });
    } catch (error) {
      res.status(500).send("An error occurred in updating the system status");
    }
  } else {
    res.status(403).send("You are not authorized to do this");
  }
});

// Get current system status
router.get("/systemstatus", verifyToken, async (req, res) => {
  if (req.user.role == "faculty") {
    try {
      const status = await SystemStatusSchema.findById(
        "628207fb3f68930477de3391"
      );
      res.send(status);
    } catch (error) {
      res.status(500).send("An error occurred in getting the system status");
    }
  } else {
    res.status(403).send("You are not authorized to do this");
  }
});

module.exports = router;
