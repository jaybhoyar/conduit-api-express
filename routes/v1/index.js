var express = require("express");
var router = express.Router();
var userController = require("../../controllers/user");
var auth = require("../../modules/auth");

router.get("/tags", userController.tags);
// Register
router.post("/users", userController.register);
// Login
router.post("/users/login", userController.login);
// current User
router.get("/user", auth.validateJWT, userController.currentUser);
// Update User
router.put("/user", auth.validateJWT, userController.updateUser);

module.exports = router;
