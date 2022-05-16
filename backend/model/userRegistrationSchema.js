const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      min: 3,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
    },
    role: {
      type: String,
      required: true,
      min: 1,
    },
    cgpa: {
      type: Number,
      required: true,
      default: 0,
    },
    roundOneStatus: {
      type: String,
      required: true,
      default: "PENDING", //Either one of ["PENDING","NOT-AVAILABLE","FREEZED","COMPLETED"]
    },
    roundTwoStatus: {
      type: String,
      required: true,
      default: "NOT-AVAILABLE", //Either one of ["PENDING","NOT-AVAILABLE","FREEZED","COMPLETED"]
    },
    electiveAssigned: {
      type: String,
      required: true,
      default: "NONE",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
