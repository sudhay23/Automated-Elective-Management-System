const router = require("express").Router();
const User = require("../model/userRegistrationSchema");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  // check if user already exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(400).send("User already exists, please login");

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // else we create a new user and store it to database

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({
      user: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      date: user.date,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
