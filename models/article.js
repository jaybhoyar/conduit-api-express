var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("slug");
// var { hash, compare } = require("bcryptjs");

var articleSchema = new Schema(
	{
		slug: {
			type: String,
			unique: true,
			lowercase: true
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		tagList: [
			{
				type: String,
				lowercase: true
			}
		],
		author: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment"
			}
		],
		favoritedBy: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		]
	},
	{ timestamps: true }
);

articleSchema.pre("save", async function(next) {
	try {
		if (this.title) {
			var sluggedTitle = slug(this.title, { lower: true });
			this.slug = sluggedTitle + "-" + Date.now();
		}
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model("Article", articleSchema);
