var express = require("express");
var router = express.Router();
var articleController = require("../../controllers/articles");
var auth = require("../../modules/auth");

router.post("/", auth.validateJWT, articleController.createArticle);
router.get("/:slug", articleController.getSingleArticle);

module.exports = router;
