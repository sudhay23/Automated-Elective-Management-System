const router = require("express").Router();
const mongoose = require("mongoose");
const Course = require("../model/courseSchema");
const User = require("../model/userRegistrationSchema");
const RoundOnePrefs = require("../model/roundOnePrefs");
const verifyToken = require("./middleware/verifyToken");
const SystemStatusSchema = require("../model/systemStatusSchema");
const { route } = require("./course");

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

// Get preference list of student
router.get("/preflist/:roundNum/:userId", verifyToken, async (req, res) => {
  const stuId = req.params.userId;
  const roundNum = req.params.roundNum;

  if (roundNum.toString() == "1") {
    const studentPrefs = await RoundOnePrefs.findOne({ userId: stuId });
    try {
      if (studentPrefs) {
        res.json({
          data: studentPrefs,
          flag: 0, //Something has been set in preferences
        });
      } else {
        res.status(500).json({
          data: "Not Frozen for Round 1",
          flag: 1, //Nothing frozen for Round 1 yet
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error Occurred...");
    }
  } else if (roundNum.toString() == "2") {
    // TODO for Round 2
  }
});

// Get current system status
router.get("/systemstatus", verifyToken, async (req, res) => {
  if (req.user.role == "student") {
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

// route to get the elective preference
router.get("/electedpreference/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    console.log(user);
    // get the course name from the course id
    const course = await Course.findById(user.electiveAssigned);
    res.send({
      electivePreference: course.courseName,
    });
  } catch (error) {
    res
      .status(500)
      .send("An error occurred in getting the elective preference");
  }
});

// route to check if user is eligible for round 2
router.get("/roundtwo/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (user.roundTwoStatus == "PENDING") {
      res.send({
        roundTwoAllowed: true,
      });
    } else {
      res.send({
        roundTwoAllowed: false,
      });
    }
  } catch (error) {
    res.status(500).send("An error occurred in getting the round 2 status");
  }
});

module.exports = router;
