const mongoose = require("mongoose");

const systemStatusSchema = new mongoose.Schema(
    {
        roundOneActive: {
            type: Boolean,
            required: true,
            default: false,
        },
        roundTwoActive: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SystemStatus", systemStatusSchema);
