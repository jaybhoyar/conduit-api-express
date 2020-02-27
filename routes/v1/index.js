var express = require("express");
var router = express.Router();
var userController = require("../../controllers/user");
var auth = require("../../modules/auth");
router.get("/", (req, res) => {
	res.json({ message: "Welcome to conduit API" });
});
// Register
router.post("/users", userController.register);
// Login
router.post("/users/login", userController.login);
// current User
router.get("/user", auth.validateJWT, userController.currentUser);

module.exports = router;
