const router = require("express").Router();
const verifyToken = require("./middleware/verifyToken");
const bcrypt = require("bcryptjs");
const User = require("../model/userRegistrationSchema");

router.get("/", verifyToken, async (req, res) => {
  const currentLoggedInUser = await User.findOne({ _id: req.user._id });
  if (!currentLoggedInUser) return res.status(400).send("User does not exist");
  res
    .header("user_id", currentLoggedInUser._id)
    .send("Welcome logged in as " + currentLoggedInUser.name);
});

module.exports = router;
