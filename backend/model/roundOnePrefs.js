const mongoose = require("mongoose");

const roundOnePrefsSchema = new mongoose.Schema(
    {
        studentEmail: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        coursePreferences: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("RoundOnePrefs", roundOnePrefsSchema);
