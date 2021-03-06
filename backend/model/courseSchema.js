const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
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
        },
        minCap: {
            type: Number,
            required: true,
            min: 0,
        },
        maxCap: { type: Number, required: true, min: 0 },
        credits: { type: Number, required: true, min: 0 },
        minCGPA: { type: Number, required: true },
        filledSlots: {
            type: Number,
            required: true,
            default: 0,
        },
        preRequisites: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
