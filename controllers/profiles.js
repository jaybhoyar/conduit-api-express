var User = require("../models/user");
var format = require("../modules/Format");

exports.getProfile = async (req, res, next) => {
	try {
		var user = await User.findOne({ username: req.params.username });
		var resProfile = format.profileFormat(user);
		res.json(resProfile);
	} catch (error) {
		next(error);
	}
};
exports.followUser = async (req, res, next) => {
	try {
		var user = await User.findOne({ username: req.params.username });
		var userFollowing = await User.findByIdAndUpdate(
			user.id,
			{
				$addToSet: { followers: req.user.userid }
			},
			{ new: true }
		);
		var userfollower = await User.findByIdAndUpdate(
			req.user.userid,
			{
				$addToSet: { following: userFollowing.id }
			},
			{ new: true }
		);
		var resProfile = format.profileFormat(userFollowing, req.user.userid);
		res.json(resProfile);
	} catch (error) {
		next(error);
	}
};
exports.deletefollowUser = async (req, res, next) => {
	try {
		var user = await User.findOne({ username: req.params.username });
		var userFollowing = await User.findByIdAndUpdate(
			user.id,
			{
				$pull: { followers: req.user.userid }
			},
			{ new: true }
		);
		var userfollower = await User.findByIdAndUpdate(
			req.user.userid,
			{
				$pull: { following: userFollowing.id }
			},
			{ new: true }
		);
		var resProfile = format.profileFormat(user);
		res.json(resProfile);
	} catch (error) {
		next(error);
	}
};
