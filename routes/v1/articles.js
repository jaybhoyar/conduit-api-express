var express = require("express");
var router = express.Router();
var articleController = require("../../controllers/articles");
var commentsController = require("../../controllers/comments");
var auth = require("../../modules/auth");

router.get("/", articleController.listArticles);
router.get("/feed", auth.validateJWT, articleController.feedArticle);
router.post("/", auth.validateJWT, articleController.createArticle);
router.get("/:slug", articleController.getSingleArticle);
router.put("/:slug", auth.validateJWT, articleController.updateArticle);
router.delete("/:slug", auth.validateJWT, articleController.deleteArticle);
router.post(
	"/:slug/favorite",
	auth.validateJWT,
	articleController.favoriteArticle
);
router.delete(
	"/:slug/favorite",
	auth.validateJWT,
	articleController.unFavoriteArticle
);

//  comments
router.post(
	"/:slug/comments",
	auth.validateJWT,
	commentsController.createComment
);
router.get("/:slug/comments", commentsController.getMultipleComment);
router.delete(
	"/:slug/comments/:id",
	auth.validateJWT,
	commentsController.deleteComment
);

module.exports = router;
