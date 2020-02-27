const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var { hash, compare } = require("bcryptjs");

var userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
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
userSchema.pre("save", async function(next) {
	try {
		if (this.password && this.isModified) {
			this.password = await hash(this.password, 10);
			next();
		}
	} catch (error) {
		next(error);
	}
});

userSchema.methods.verifyPassword = async function(password) {
	return await compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
