var auth = require("../modules/auth");
var User = require("../models/user");
var Article = require("../models/article");
var format = require("../modules/Format");

exports.tags = async (req, res, next) => {
	try {
		var tags = await Article.distinct("tagList");
		res.status(200).json({ tags: tags });
	} catch (error) {
		next(error);
	}
};

exports.register = async (req, res, next) => {
	try {
		const user = await User.create(req.body.user);
		const token = await auth.generateJWT(user, next);
		var resUser = await format.userFormat(user, token);
		res.status(200).json(resUser);
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		var { email, password } = req.body.user;
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email and Password required" });
		}
		var user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Invalid Email" });
		var result = await user.verifyPassword(password);
		if (!result) return res.status(400).json({ error: "Invalid Password" });
		var token = await auth.generateJWT(user);
		var resUser = format.userFormat(user, token);
		res.status(200).json(resUser);
	} catch (error) {
		next(error);
	}
};
exports.currentUser = async (req, res, next) => {
	try {
		var currentuser = await User.findById(req.user.userid);
		var resUser = await format.userFormat(currentuser, req.user.token);
		res.status(200).json(resUser);
	} catch (error) {
		next(error);
	}
};
exports.updateUser = async (req, res, next) => {
	try {
		var user = await User.findByIdAndUpdate(
			req.user.userid,
			req.body.user,
			{ new: true }
		);
		var resUser = format.userFormat(user, req.headers["authorization"]);
		res.status(200).json(resUser);
	} catch (error) {
		next(error);
	}
};
