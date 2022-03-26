const router = require("express").Router();
const User = require("../model/userRegistrationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER route
router.post("/register", async (req, res) => {
  // check if user already exists
  console.log(req.body.email);
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    console.log("user already exists");
    return res.status(400).send("User already exists, please login");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // else we create a new user and store it to database

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.status(200).send({
      user: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      date: user.date,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// LOGIN route
router.post("/login", async (req, res) => {
  // checking if email exists in database
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("invalid credentials");
    return res.status(401).send("Email or password is incorrect");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    console.log("invalid credentials");
    return res.status(401).send("Email or password is incorrect");
  }

  // create and assin a token to the user
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "60s",
    }
  );

  // send token in header and user data in body
  res
    .cookie("auth-token", token, {
      maxAge: "60000",
      sameSite: "none",
      secure: true,
    })
    .send({
      user: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      loginTime: user.date,
    });
});

// AUTHORIZE a token route
router.post("/authorize", (req, res) => {
  const userToken = req.cookies["auth-token"];
  console.log(req.body);

  if (!userToken) {
    res.status(401).json({ isAuthorized: false });
  } else {
    try {
      const verification = jwt.verify(userToken, process.env.JWT_TOKEN_SECRET);
      if (verification) {
        res.status(200).json({
          isAuthorized: {
            user: verification._id,
            name: verification.name,
            email: verification.email,
            role: verification.role,
          },
        });
      } else {
        res.status(401).json({ isAuthorized: false });
      }
    } catch (err) {
      res.status(401).json({ isAuthorized: false });
    }
  }
});

// LOGOUT Route
router.post("/logout", (req, res) => {
  res
    .clearCookie("auth-token", { sameSite: "none", secure: true })
    .send("You have been logged out");
});

module.exports = router;
