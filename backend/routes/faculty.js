const router = require("express").Router();
const mongoose = require("mongoose");
const Course = require("../model/courseSchema");
const verifyToken = require("./middleware/verifyToken");
const SystemStatusSchema = require("../model/systemStatusSchema");
const roundOnePrefs = require("../model/roundOnePrefs");
const userRegistrationSchema = require("../model/userRegistrationSchema");
const roundTwoPrefs = require("../model/roundTwoPrefs");

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

router.get("/process/roundone", verifyToken, async (req, res) => {
  if (req.user.role == "faculty") {
    const roundOne = await roundOnePrefs.find();
    // sort the preds by timestamp
    roundOne.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    // loop through each element in the array and loop through each coursePreferences
    for (let i = 0; i < roundOne.length; i++) {
      let flag = false;

      if (roundOne[i].coursePreferences.length > 0) {
        for (let j = 0; j < roundOne[i].coursePreferences.length; j++) {
          // for the course, check if filledslots is less than maxCap
          const course = await Course.findById(
            roundOne[i].coursePreferences[j]
          );
          if (course.filledSlots < course.maxCap) {
            // if it is less than maxCap, then add 1 to the filledSlots
            course.filledSlots++;
            // save the course
            await course.save();
            // for the particular user, go to user and find the user by id
            const user = await userRegistrationSchema.findById(
              roundOne[i].userId
            );
            // update roundOneStatus with course id
            user.roundOneStatus = "COMPLETED";
            user.electiveAssigned = course._id;
            // update roundTwoStatus to not available
            user.roundTwoStatus = "NOT-AVAILABLE";
            // save the user
            await user.save();
            flag = true;
            break;
          }
        }
      }
      if (!flag) {
        const user = await userRegistrationSchema.findById(roundOne[i].userId);
        user.roundOneStatus = "COMPLETED";
        await user.save();
      }
    }
    res.send({ message: "Round One Processed" });
  } else {
    res.status(403).send({ message: "You are not authorized to do this" });
  }
});

// route for round two
router.get("/process/roundtwo", verifyToken, async (req, res) => {
  if (req.user.role == "faculty") {
    const roundTwo = await roundTwoPrefs.find();
    // sort the preds by timestamp
    roundTwo.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    // loop through each element in the array and loop through each coursePreferences
    for (let i = 0; i < roundTwo.length; i++) {
      let flag = false;

      if (roundTwo[i].coursePreferences.length > 0) {
        for (let j = 0; j < roundTwo[i].coursePreferences.length; j++) {
          // for the course, check if filledslots is less than maxCap
          const course = await Course.findById(
            roundTwo[i].coursePreferences[j]
          );
          if (course.filledSlots < course.maxCap) {
            // if it is less than maxCap, then add 1 to the filledSlots
            course.filledSlots++;
            // save the course
            await course.save();
            // for the particular user, go to user and find the user by id
            const user = await userRegistrationSchema.findById(
              roundTwo[i].userId
            );
            // update roundOneStatus with course id
            user.roundTwoStatus = "COMPLETED";
            user.electiveAssigned = course._id;
            // update roundTwoStatus to not available
            user.roundTwoStatus = "NOT-AVAILABLE";
            // save the user
            await user.save();
            flag = true;
            break;
          }
        }
      }
      if (!flag) {
        const user = await userRegistrationSchema.findById(roundTwo[i].userId);
        user.roundTwoStatus = "COMPLETED";
        await user.save();
      }
    }
    res.send({ message: "Round Two Processed" });
  } else {
    res.status(403).send({ message: "You are not authorized to do this" });
  }
});

module.exports = router;
