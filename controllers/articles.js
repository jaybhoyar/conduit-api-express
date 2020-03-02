var Article = require("../models/article");
var User = require("../models/user");
var format = require("../modules/Format");
var slugify = require("slug");

exports.listArticles = async (req, res, next) => {
	try {
		let limit = req.query.limit || 20;
		if (req.query.tag) {
			var articles = await Article.find({ tagList: req.query.tag })
				.sort({ updatedAt: 1 })
				.limit(limit)
				.populate("author");
		} else if (req.query.author) {
			var user = await User.findOne({ username: req.query.author })
				.sort({ updatedAt: 1 })
				.limit(limit)
				.populate({
					path: "articles",
					populate: {
						path: "author",
						model: "User"
					}
				});
			var articles = user.articles;
		} else if (req.query.favorited) {
			var user = await User.findOne({ username: req.query.favorited })
				.sort({ updatedAt: 1 })
				.limit(limit)
				.populate({
					path: "favoriteArticles",
					populate: {
						path: "author",
						model: "User"
					}
				});
			var articles = user.favoriteArticles;
		} else if (req.query.limit) {
			var articles = await Article.find();
		} else {
			var articles = await Article.find()
				.sort({ updatedAt: 1 })
				.populate("author");
		}
		arr = articles.map(article => {
			let eachArticle = format.singleArticleFormat(article);
			return eachArticle;
		});
		res.json({ articles: arr, articlesCount: arr.length });
	} catch (error) {
		next(error);
	}
};
exports.feedArticle = async (req, res, next) => {
	try {
		var user = User.findById(req.user.userid);
	} catch (error) {
		next(error);
	}
};
exports.createArticle = async (req, res, next) => {
	try {
		req.body.article.author = req.user.userid;
		const createdArticle = await Article.create(req.body.article);
		var user = await User.findByIdAndUpdate(req.user.userid, {
			$addToSet: { articles: createdArticle.id }
		});

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
		if (req.body.article) {
			let slug = req.params.slug;
			var articleToUpdate = await Article.findOne({ slug }).populate(
				"author"
			);
			if (req.user.userid == articleToUpdate.author._id) {
				if (req.body.article.title) {
					var sluggedTitle = slugify(req.body.article.title, {
						lower: true
					});
					req.body.article.slug = sluggedTitle + "-" + Date.now();
				}
				let newArticle = await Article.findByIdAndUpdate(
					articleToUpdate._id,
					req.body.article,
					{ new: true }
				);
				var resArticle = format.singleArticleFormat(newArticle);
				res.json({ article: resArticle });
			}
		} else {
			res.json({ error: "Invalid user" });
		}
	} catch (error) {
		next(error);
	}
};
exports.deleteArticle = async (req, res, next) => {
	try {
		let slug = req.params.slug;
		var articleToDelete = await Article.findOne({ slug }).populate(
			"author"
		);
		if (req.user.userid == articleToDelete.author._id) {
			let deletedArticle = await Article.findByIdAndDelete(
				articleToDelete._id
			);
			res.json({ Success: "Article deleted successfully" });
		}
	} catch (error) {
		next(error);
	}
};

exports.favoriteArticle = async (req, res, next) => {
	try {
		slug = req.params.slug;
		var article = await Article.findOneAndUpdate(
			{ slug },
			{
				$addToSet: {
					favoritedBy: req.user.userid
				}
			},
			{ new: true }
		).populate("author");
		var user = await User.findByIdAndUpdate(req.user.userid, {
			$addToSet: { favoriteArticles: article.id }
		});
		var resArticle = format.singleArticleFormat(article, req.user.userid);
		res.json({ article: resArticle });
	} catch (error) {
		next(error);
	}
};

exports.unFavoriteArticle = async (req, res, next) => {
	try {
		slug = req.params.slug;
		var article = await Article.findOneAndUpdate(
			{ slug },
			{
				$pull: {
					favoritedBy: req.user.userid
				}
			},
			{ new: true }
		).populate("author");
		var resArticle = format.singleArticleFormat(article, req.user.userid);
		res.json({ article: resArticle });
	} catch (error) {
		next(error);
	}
};
