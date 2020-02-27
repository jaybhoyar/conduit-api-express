var express = require("express");
var router = express.Router();
var usersRouter = require("./users");
var userController = require("../../controllers/user");

// var userController = require("../../controllers/user");
// var auth = require("../../modules/auth");

router.get("/", (req, res) => {
	res.json({ message: "Welcome to conduit API" });
});

router.post("/users", userController.register);

module.exports = router;
