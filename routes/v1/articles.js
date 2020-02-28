var express = require("express");
var router = express.Router();
var articleController = require("../../controllers/articles");
var auth = require("../../modules/auth");

router.get("/", articleController.listArticles);
router.post("/", auth.validateJWT, articleController.createArticle);
router.get("/:slug", articleController.getSingleArticle);
router.put("/:slug", auth.validateJWT, articleController.updateArticle);
router.delete("/:slug", auth.validateJWT, articleController.deleteArticle);

module.exports = router;
