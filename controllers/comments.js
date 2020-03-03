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
		var resComment = format.singleCommentFormat(
			createdComment,
			req.user.userid
		);
		res.status(200).json(resComment);
	} catch (error) {
		next(error);
	}
};
exports.getMultipleComment = async (req, res, next) => {
	try {
		var slug = req.params.slug;
		var article = await (await Article.findOne({ slug }))
			.populate({
				path: "comments",
				populate: {
					path: "author",
					model: "User"
				}
			})
			.execPopulate();

		let arr = article.comments.map(comment => {
			let eachComment = format.singleCommentFormat(
				comment,
				req.user.userid
			);
			return eachComment;
		});

		res.status(200).json({ comments: arr });
	} catch (error) {
		next(error);
	}
};
exports.deleteComment = async (req, res, next) => {
	try {
		var slug = req.params.slug;
		var id = req.params.id;
		var deletedComment = await Comment.findByIdAndDelete(id);
		var updateArticle = await Article.findOneAndUpdate(
			{ slug },
			{ $pull: { comments: deletedComment.id } }
		);
		console.log(deletedComment.id);
		res.status(200).json("Comment Deleted Successfully");
	} catch (error) {
		next(error);
	}
};
