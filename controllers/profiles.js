var auth = require("../modules/auth");
var User = require("../models/user");
var format = require("../modules/Format");

exports.getProfile = async (req, res, next) => {
	try {
		var username = req.params.username;
		var user = await User.findOne({ username });
		var resProfile = format.profileFormat(user);
		res.json(resProfile);
	} catch (error) {
		next(error);
	}
};
exports.followUser = async (req, res, next) => {
	try {
		var username = req.params.username;
		var user = await User.findOne({ username });
		var resProfile = format.profileFormat(user);
		res.json(resProfile);
	} catch (error) {
		next(error);
	}
};
