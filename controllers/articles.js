var Article = require("../models/article");
var format = require("../modules/Format");

exports.createArticle = async (req, res, next) => {
	try {
		req.body.article.author = req.user.userid;
		const createdArticle = await Article.create(req.body.article);
		var token = req.user.token;
		var resArticle = format.articleFormat(createdArticle, token);
		res.json(resArticle);
	} catch (error) {
		next(error);
	}
};
exports.getSingleArticle = async (req, res, next) => {
	try {
		let slug = req.params.slug;
		const singlearticle = await Article.findOne({ slug }).populate(
			"author"
		);
		var resArticle = format.singleArticleFormat(singlearticle);
		res.json(resArticle);
	} catch (error) {
		next(error);
	}
};
exports.updateArticle = async (req, res, next) => {
	try {
		let slug = req.params.slug;
		var articleToUpdate = await Article.findOne({ slug }).populate(
			"author"
		);
		if (req.user.userid == articleToUpdate.author._id) {
			let oldArticle = await Article.findByIdAndUpdate(
				articleToUpdate._id,
				req.body.article
			);
		} else {
			res.json({ error: "Invalid user" });
		}
	} catch (error) {
		next(error);
	}
};
