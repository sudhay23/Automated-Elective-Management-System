const router = require("express").Router();
const User = require("../model/userRegistrationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER route
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

// LOGIN route
router.post("/login", async (req, res) => {
  // checking if email exists in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is incorrect");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Email or password is incorrect");

  // create and assin a token to the user
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "60s",
    }
  );

  // send token in header and user data in body
  res.header("auth-token", token).send({
    user: user._id,
    name: user.name,
    email: user.email,
    loginTime: user.date,
  });
});

module.exports = router;
