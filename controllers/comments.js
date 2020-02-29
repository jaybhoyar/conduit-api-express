var Article = require("../models/article");
var Comment = require("../models/comments");
var format = require("../modules/Format");
var slugify = require("slug");

exports.createComment = async (req, res, next) => {
	try {
		var slug = req.params.slug;
		req.body.comment.author = req.user.userid;
		const createdComment = await (await Comment.create(req.body.comment))
			.populate("author")
			.execPopulate();
		var article = await Article.findOneAndUpdate(
			{ slug },
			{ $push: { comments: createdComment.id } }
		);
		var resComment = format.singleCommentFormat(createdComment);
		res.json(resComment);
	} catch (error) {
		next(error);
	}
};
exports.getMultipleComment = async (req, res, next) => {
	try {
		var slug = req.params.slug;
		var article = await (await Article.findOne({ slug }))
			.populate("comments").populate()
			.execPopulate();
	
		res.json({ comments: commentsArr });
	} catch (error) {
		next(error);
	}
};
