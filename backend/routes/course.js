const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const verifyToken = require("./middleware/verifyToken");
const Course = require("../model/courseSchema");

// Get list of course objects according to the list of _id's given
router.post("/fromIds", verifyToken, (req, res) => {
    const idArr = req.body.idArr;
    Course.find({ _id: { $in: idArr } })
        .then((courseArr) => {
            courseArr = courseArr.sort((a, b) => {
                // Sort courses according to frozen preferences
                return (
                    idArr.indexOf(a._id.toString()) -
                    idArr.indexOf(b._id.toString())
                );
            });
            res.send({ courseArr: courseArr });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Server Error Occurred...");
        });
    // console.log(idArr);
});

module.exports = router;
