var Article = require("../models/article");
var Comment = require("../models/comments");
var format = require("../modules/Format");
var slugify = require("slug");

exports.createComment = async (req, res, next) => {
	try {
		var slug = req.params.slug;
		req.body.comment.author = req.user.userid;

		const createdComment = await Comment.create(req.body.comment);
		var article = await Article.findOneAndUpdate(
			{ slug },
			{ $set: { comments: createdComment._id } }
		);
		console.log(article);
		var resComment = format.singleCommentFormat(createdComment);
		res.json(resComment);
	} catch (error) {
		next(error);
	}
};
