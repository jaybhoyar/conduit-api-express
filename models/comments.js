const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentSchema = new Schema(
	{
		body: {
			type: String,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
