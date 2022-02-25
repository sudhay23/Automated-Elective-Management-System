const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    addedBy: {
        type: String,
        required: true,
    },
    addedOn: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    minCap: {
        type: Number,
        required: true,
        min: 0,
    },
    maxCap: { type: Number, required: true, min: 0 },
    credits: { type: Number, required: true, min: 0 },
    preRequisites: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);
