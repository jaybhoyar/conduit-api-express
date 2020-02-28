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
				type: String
			}
		],
		author: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		favoritesCount: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

articleSchema.pre("save", async function(next) {
	try {
		var sluggedTitle = slug(this.title, { lower: true });
		this.slug = sluggedTitle + "-" + Date.now();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model("Article", articleSchema);
