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
		image: String,
		articles: [
			{
				type: Schema.Types.ObjectId,
				ref: "Article"
			}
		],
		followers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		following: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		favoriteArticles: [
			{
				type: Schema.Types.ObjectId,
				ref: "Article"
			}
		]
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
	try {
		return await compare(password, this.password);
	} catch (error) {
		next(error);
	}
};

module.exports = mongoose.model("User", userSchema);
