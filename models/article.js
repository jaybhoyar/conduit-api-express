var mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
			type: Number
		}
	},
	{ timestamps: true }
);
// {
//   "article": {
//     "slug": "how-to-train-your-dragon",
//     "title": "How to train your dragon",
//     "description": "Ever wonder how?",
//     "body": "It takes a Jacobian",
//     "tagList": ["dragons", "training"],
//     "createdAt": "2016-02-18T03:22:56.637Z",
//     "updatedAt": "2016-02-18T03:48:35.824Z",
//     "favorited": false,
//     "favoritesCount": 0,
//     "author": {
//       "username": "jake",
//       "bio": "I work at statefarm",
//       "image": "https://i.stack.imgur.com/xHWG8.jpg",
//       "following": false
//     }
//   }
// }
module.exports = mongoose.model("Article", articleSchema);
