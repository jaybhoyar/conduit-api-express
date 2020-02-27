const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
var userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			username: true
		},
		email: {
			type: String,
			required: true,
			match: /@/,
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},
		bio: String,
		image: String
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model("User", userSchema);
