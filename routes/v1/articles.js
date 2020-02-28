var express = require("express");
var router = express.Router();
var userController = require("../../controllers/user");
var auth = require("../../modules/auth");

router.get("/", (req, res) => {
	res.json({ message: "Welcome to conduit API" });
});

module.exports = router;
