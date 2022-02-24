const router = require("express").Router();
const verifyToken = require("./middleware/verifyToken");
const bcrypt = require("bcryptjs");
const User = require("../model/userRegistrationSchema");

router.get("/", verifyToken, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
