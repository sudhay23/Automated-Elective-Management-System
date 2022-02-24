const router = require("express").Router();
const verifyToken = require("./middleware/verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.send("this is sample private dashboard route");
});

module.exports = router;
