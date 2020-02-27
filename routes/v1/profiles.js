var express = require("express");
var router = express.Router();
var profilesController = require("../../controllers/profiles");
var auth = require("../../modules/auth");

router.get("/", (req, res) => {
	res.json({ message: "Welcome to conduit API" });
});

router.get("/:username", profilesController.getUser);

module.exports = router;
