var auth = require("../modules/auth");
var Article = require("../models/article");
var format = require("../modules/Format");

exports.createArticle = async (req, res, next) => {
	try {
		// let article = {
		// 	title: req.body.title,
		// 	description: req.body.title,
		// 	body: req.body.title,
		// 	tagList: req.body.tagList,
		// 	author: req.user.userid
		// };
		const createdArticle = await Article.create(req.body.article);
		var token = req.user.token;
		var resArticle = format.articleFormat(createdArticle, token);
		res.json(resArticle);
	} catch (error) {
		next(error);
	}
};
