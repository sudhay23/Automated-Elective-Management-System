const mongoose = require("mongoose");

const roundTwoPrefsSchema = new mongoose.Schema(
    {
        email: {
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

module.exports = mongoose.model("RoundTwoPrefs", roundTwoPrefsSchema);
