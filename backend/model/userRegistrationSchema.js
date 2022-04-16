const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);
