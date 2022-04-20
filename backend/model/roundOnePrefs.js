const mongoose = require("mongoose");

const roundOnePrefsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userId:{
        type:String,
        required:true
    },
    coursePreferences: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model("RoundOnePrefs", roundOnePrefsSchema);
